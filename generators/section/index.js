var generators = require('yeoman-generator');
var chalk = require('chalk');

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
        // {
        //     type: 'confirm',
        //     name: 'addDemoSection',
        //     message: 'Would you like to generate a demo section ?',
        //     default: true
        // }
        ];
 
        this.prompt(prompts, function (props) {

            this.uiDir = 'sections/';

            // Append any ui directories
            var uiNameSplit = props.uiName.split('/');

            this.uiName = this._.classify(uiNameSplit[uiNameSplit.length-1]);

            if (uiNameSplit.length > 1){
                uiNameSplit.splice(-1,1);
                this.uiDir += uiNameSplit.join('/') + '/';
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

        vars = {dashedName: dashedName, className:className, dir:this.uiDir};

        this.template('Section.hbs', 'src/js/templates/' + this.uiDir + className + '.hbs', vars);
        this.template('Section.less', 'src/less/' + this.uiDir + className + '.less', vars);
        this.template('Section.js', 'src/js/' + this.uiDir + className + '.js', vars);
    }

});