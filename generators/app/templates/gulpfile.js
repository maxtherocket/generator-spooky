var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var del = require('del');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var hbsfy = require('hbsfy');
var watchify = require('watchify');
var notify = require('gulp-notify');
var minify = require('gulp-minify');
var bulkSass = require('gulp-sass-glob-import');
var runSequence = require('run-sequence');
var envify = require('envify/custom');
var GulpSSH = require('gulp-ssh');
var rsync = require('rsyncwrapper').rsync;
var urlAdjuster = require('gulp-css-url-adjuster');

var SRC = "./src";
var TMP = "./.tmp";
var BUILD = "./dist";

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded',
  includePaths: ['./src']
};
gulp.task('styles', function() {
    gulp.src('./src/sass/main.scss')
        .pipe(bulkSass())
        .pipe(sourcemaps.init())
            .pipe(sass(sassOptions).on('error', sass.logError))
            .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./.tmp/'))
});

gulp.task('connect', function() {
  connect.server({
    root: ['./src', './.tmp'],
    port: 9002
  });
});

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch, dest, debug, env) {

  dest = dest || TMP;
  debug = (debug !== false);
  env = env || 'development';

  var props = {
    entries: [SRC+'/js/' + file],
    debug : debug,
    transform: [
      babelify.configure({
        presets: ["es2015"]
      }),
      hbsfy,
      envify({
        NODE_ENV: env
      })
    ],
    cache: {},
    packageCache: {},
    fullPaths: true
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest(dest));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundling...');
  });
  bundler.on('log', function(msg) {
    gutil.log('Rebundle status: '+msg);
  });

  // run it once the first time buildScript is called
  return rebundle();
}

// SSH
function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
var sshConfig = {
  host: '0.0.0.0',
  port: 22,
  username: 'max',
  //privateKey: require('fs').readFileSync(getUserHome() + '/.ssh/...')
}
var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: sshConfig
});

gulp.task('push-staging', function () {
  return gulp
    .src([BUILD + '/**'])
    .pipe(gulpSSH.dest('/var/www/html'))
})

// run once
gulp.task('script', function() {
  return buildScript('main.js', false);
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['script', 'styles', 'connect', 'watch'], function() {
  return buildScript('main.js', true);
});

//Watch task
gulp.task('watch', function() {
  gulp.watch([SRC+'/js/**/*.scss', SRC+'/sass/**/*.scss'],['styles']);
});

gulp.task('clean', function () {
  return gulp.del([BUILD]);
});

// Copy
gulp.task('copy', function() {
  gulp.src(SRC+'/images/**')
    .pipe(gulp.dest(BUILD+'/images'));
  gulp.src(SRC+'/webfonts/**')
    .pipe(gulp.dest(BUILD+'/webfonts'));
  gulp.src(SRC+'/data/**')
    .pipe(gulp.dest(BUILD+'/data'));
  gulp.src(SRC+'/*.html')
    .pipe(gulp.dest(BUILD));
  gulp.src(SRC+'/favicons/**')
    .pipe(gulp.dest(BUILD));
});

gulp.task('rsync', function() {
  rsync({
    ssh: true,
    src: BUILD+'/',
    dest: 'max@0.0.0.0:/var/www/html',
    privateKey: '$HOME/.ssh/...',
    recursive: true,
    syncDest: true,
    args: ['--verbose']
  }, function(error, stdout, stderr, cmd) {
      if (error){
        gutil.log(error);
      }
      if (stderr){
        gutil.log(stderr);
      }
      gutil.log(stdout);
      gutil.log(cmd);
    }
  );
});

// BUILD
gulp.task('buildScript', function() {
  return buildScript('main.js', false, BUILD, false, 'staging');
});
gulp.task('buildStyles', function() {
  var opts = {
    errLogToConsole: true,
    outputStyle: 'compressed'
  };
  return gulp.src('./src/sass/main.scss')
      .pipe(bulkSass())
      .pipe(sass(opts)
      .on('error', sass.logError))
      .pipe(gulp.dest(BUILD));
});
gulp.task('minifyScript', function() {
  return gulp.src(BUILD + '/main.js')
      .pipe(uglify())
      .pipe(gulp.dest(BUILD));
});
gulp.task('cssPaths', function() {
  gulp.src(BUILD+'/main.css').
    pipe(urlAdjuster({
      prependRelative: 'temp/',
    }))
    .pipe(gulp.dest(BUILD));
});
gulp.task('build', function(cb){
  runSequence('clean', ['copy', 'buildScript', 'buildStyles'], 'minifyScript', cb);
});
gulp.task('build-push', function(cb){
  runSequence('build', 'rsync', cb);
});
