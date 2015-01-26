var generators = require('yeoman-generator');
var chalk = require('chalk');
var utils = require('../utils');
var _ = require('lodash');

module.exports = generators.Base.extend({

    prompting: function() {
        var done = this.async();
 
        // have Yeoman greet the user
        this.log(this.yeoman);
 
        // This makes `appname` a required argument.
        // this.argument('platform', { type: String, required: false });

        var prompts = [
        {
            name: 'uiName',
            message: 'Name your UI element (including any sub folders):'
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

            this.uiDir = 'ui/';

            this.platform = props.platform;

            // Append any ui directories
            var uiNameSplit = props.uiName.split('/');

            // Grab the last portion of the uiNameSplit
            this.uiName = this._.classify( uiNameSplit[uiNameSplit.length-1] );

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

            this.log('');
            this.log('Creating UI Element:', chalk.bold.yellow(this.uiName), 'in this directory:', chalk.bold.yellow(this.uiDir) );
            this.log('');

            done();
        }.bind(this));
    },

    writing: function(){
        var className = this._.classify(this.uiName);
        var dashedName = this._.dasherize(this.uiName);
        dashedName = this._.trim(dashedName, '-');

        var vars = {dashedName: dashedName, className:className, depthPath:this.depthPath};

        var templatePath = utils.addPlatform(this.platform, 'templates')+'/' + this.uiDir + className + '.hbs';

        this.template('UIElement.hbs', 'src/js/' + templatePath, vars);
        this.template('UIElement.less', 'src/'+ utils.addPlatform(this.platform, 'less')+'/' + this.uiDir + className + '.less', vars);
        this.template('UIElement.js', 'src/js/' + utils.addPlatform(this.platform, this.uiDir) + className + '.es6', _.assign(vars, {templatePath:templatePath}) );
    }

});