var generators = require('yeoman-generator');
var chalk = require('chalk');
var utils = require('../utils');
var _ = require('lodash');
var underscore = require('underscore.string');

module.exports = generators.Base.extend({

    prompting: function() {

        // have Yeoman greet the user
        //this.log(this.yeoman);

        // This makes `appname` a required argument.
        this.argument('esVersion', { type: String, required: false });

        var prompts = [
        {
            name: 'uiName',
            message: 'Name your UI element (including any sub folders):'
        },
        // {
        //     name: 'platform',
        //     message: 'Which platform? (leave blank for desktop):'
        // }
        // {
        //     type: 'confirm',
        //     name: 'addDemoSection',
        //     message: 'Would you like to generate a demo section ?',
        //     default: true
        // }
        ];

        return this.prompt(prompts).then( function (props) {

          this.props = props;

        }.bind(this));
    },

    writing: function(){

      this.uiDir = '';

      this.platform = this.props.platform;

      // Append any ui directories
      var uiNameSplit = this.props.uiName.split('/');

      // Grab the last portion of the uiNameSplit
      this.uiName = underscore.classify( uiNameSplit[uiNameSplit.length-1] );

      if (uiNameSplit.length > 1){
          uiNameSplit.splice(-1,1);
          this.uiDir += uiNameSplit.join('/') + '/';
      }

      this.uiDir = this.uiDir + this.uiName + '/';

      // Generate a depth string for requiring templates
      this.depthPath = '';
      var depth = underscore.count(this.uiDir, '/');
      for (var i = 0, len = depth; i < len; i += 1) {
          this.depthPath += '../';
      }

      this.log('');
      this.log('Creating UI Element:', chalk.bold.yellow(this.uiName), 'in this directory:', chalk.bold.yellow(this.uiDir) );
      this.log('');

      var className = underscore.classify(this.uiName);
      var dashedName = underscore.dasherize(this.uiName);
      dashedName = underscore.trim(dashedName, '-');

      var vars = {dashedName: dashedName, className:className, depthPath:this.depthPath};

      this.template('UIElement.scss', '' + this.uiDir + className + '.scss', vars);

      this.template('UIElement.jsx', '' +  this.uiDir + className + '.jsx', vars);

    }

});
