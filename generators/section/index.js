var generators = require('yeoman-generator');
var chalk = require('chalk');
var utils = require('../utils');

module.exports = generators.Base.extend({

    prompting: function() {
        var done = this.async();
 
        // have Yeoman greet the user
        console.log(this.yeoman);
 
        var prompts = [
        {
            name: 'uiName',
            message: 'Name your section (including any sub folders):'
        },
        {
            name: 'platform',
            message: 'Which platform? (leave blank for desktop):'
        }
        // {
        //     type: 'confirm',
        //     name: 'addDemoSection',
        //     message: 'Would you like to generate a demo section ?',
        //     default: true
        // }
        ];
 
        this.prompt(prompts, function (props) {

            this.uiDir = 'sections/';

            this.platform = props.platform;

            // Append any ui directories
            var uiNameSplit = props.uiName.split('/');

            this.uiName = this._.classify(uiNameSplit[uiNameSplit.length-1]);

            if (uiNameSplit.length > 1){
                uiNameSplit.splice(-1,1);
                this.uiDir += uiNameSplit.join('/') + '/';
            }

            // Generate a depth sting for requiring templates
            this.depthPath = '';
            var depth = this._(this.uiDir).count('/');
            for (var i = 0, len = depth; i < len; i += 1) {
                this.depthPath += '../';
            }
            
            console.log('');
            console.log('Creating section:', chalk.bold.yellow(this.uiName), 'in this directory:', chalk.bold.yellow(this.uiDir) );
            console.log('');

            done();
        }.bind(this));
    },

    writing: function(){
        var className = this._.classify(this.uiName);
        var dashedName = this._.dasherize(this.uiName);
        dashedName = this._.trim(dashedName, '-');

        vars = {dashedName: dashedName, className:className, dir:this.uiDir, depthPath:this.depthPath};

        this.template('Section.hbs', 'src/js/' + utils.addPlatform(this.platform, 'templates') + '/' + this.uiDir + className + '.hbs', vars);
        this.template('Section.less', 'src/' + utils.addPlatform(this.platform, 'less') + '/' + this.uiDir + className + '.less', vars);
        this.template('Section.js', 'src/js/' + utils.addPlatform(this.platform, this.uiDir) + className + '.es6', vars);
    }

});