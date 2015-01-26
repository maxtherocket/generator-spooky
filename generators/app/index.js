var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        // Next, add your custom code
        //this.option('coffee'); // This method adds support for a `--coffee` flag
    },

    prompting: function () {
        var done = this.async();
        this.prompt({
          type    : 'input',
          name    : 'name',
          message : 'Your project name',
          default : this.appname // Default to current folder name
        }, function (answers) {
          this.appname = answers.name;
          this.appname = this._.classify(this.appname);
          done();
        }.bind(this));
    },

    writing: {
        html: function(){
            this.template('index.html', 'src/index.html');
        },
        js: function(){
            this.template('main.js', 'src/js/main.js');
        },
        router: function(){
            this.template('router-main.js', 'src/js/router-main.js');
        },
        models: function(){
            this.template('models/site.js', 'src/js/models/site.js');
        },
        gitignore: function(){
            this.copy('_gitignore', '.gitignore');
        },
        sections: function(){
            this.template('sections/Home.es6', 'src/js/sections/Home.es6');
        },
        templates: function(){
            this.template('templates/sections/Home.hbs', 'src/js/templates/sections/Home.hbs');
        },
        bower: function(){
            this.template('_bowerrc', '.bowerrc', {name:this.appname});
            this.template('_bower.json', 'bower.json', {name:this.appname});
        },
        package: function(){
            this.template('_package.json', 'package.json', {name:this.appname});
        },
        gruntfile: function(){
            this.copy('Gruntfile.js', 'Gruntfile.js');
        },
        less: function(){
          this.copy('less/main.less', 'src/less/main.less');
          this.directory('less/imports', 'src/less/imports');
          this.directory('less/sections', 'src/less/sections');
          this.directory('less/ui', 'src/less/ui');
        },
        fonts: function(){
          this.directory('fonts', 'src/fonts');
        }
    },

    install: function(){
        this.installDependencies({
            bower: false,
            npm: true,
            skipInstall: false
        });
    }

});