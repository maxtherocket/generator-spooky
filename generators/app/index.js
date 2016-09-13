'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require('glob');
var underscore = require('underscore.string');

module.exports = yeoman.Base.extend({

    prompting: function () {
      return this.prompt([{
        type    : 'input',
        name    : 'name',
        message : 'Your project name',
        default : this.appname // Default to current folder name
      }]).then(function (answers) {
        this.log('app name', answers.name);
        this.props = answers;
      }.bind(this));
    },

    writing: {
        // html: function(){
        //     this.template('index.html', 'src/index.html');
        // },
        // js: function(){
        //     this.template('main.js', 'src/js/main.js');
        // },
        // router: function(){
        //     this.template('router-main.js', 'src/js/router-main.js');
        // },
        // models: function(){
        //     this.template('models/site.js', 'src/js/models/site.js');
        // },
        // gitignore: function(){
        //     this.copy('_gitignore', '.gitignore');
        // },
        // sections: function(){
        //     this.template('sections/Home/Home.es6', 'src/js/sections/Home/Home.js');
        // },
        // sectionsStyle: function(){
        //     this.template('sections/Home/Home.scss', 'src/js/sections/Home/Home.scss');
        // },
        // templates: function(){
        //     this.template('sections/Home/Home.hbs', 'src/js/sections/Home/Home.hbs');
        // },
        // bower: function(){
        //     this.template('_bowerrc', '.bowerrc', {name:this.appname});
        //     this.template('_bower.json', 'bower.json', {name:this.appname});
        // },
        // package: function(){
        //     this.template('_package.json', 'package.json', {name:this.appname});
        // },
        // gruntfile: function(){
        //     this.copy('Gruntfile.js', 'Gruntfile.js');
        // },
        // gulpfile: function(){
        //     this.copy('gulpfile.js', 'gulpfile.js');
        // },
        // editorconfig: function(){
        //     this.copy('_editorconfig', '.editorconfig');
        // },
        // less: function(){
        //   this.copy('sass/main.scss', 'src/sass/main.scss');
        //   this.directory('sass/partials', 'src/sass/partials');
        // },
        // fonts: function(){
        //   this.directory('fonts', 'src/fonts');
        // }
        root: function(){
          this.fs.copyTpl(
            glob.sync(this.templatePath('*'), {dot: true, ignore:['.DS_Store', this.templatePath('_gitignore')]}),
            this.destinationPath('./'),
            { name: underscore.dasherize(this.props.name.toLowerCase()) }
          );
        },
        gitignore: function(){
          this.fs.copyTpl(
            this.templatePath('_gitignore'),
            this.destinationPath('.gitignore'),
            { name: this.props.name }
          );
        }
    },

    install: function(){
      this.installDependencies({
        bower: true,
        npm: true,
        skipInstall: false
      });
    }

});
