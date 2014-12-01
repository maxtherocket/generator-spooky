var generators = require('yeoman-generator');

module.exports = generators.Base.extend({

    prompting: function() {
        var done = this.async();
 
        // have Yeoman greet the user
        console.log(this.yeoman);
 
        var prompts = [
        {
            name: 'uiName',
            message: 'Name your UI element:'
        },
        // {
        //     type: 'confirm',
        //     name: 'addDemoSection',
        //     message: 'Would you like to generate a demo section ?',
        //     default: true
        // }
        ];
 
        this.prompt(prompts, function (props) {
            this.uiName = this._.classify(props.uiName);
            
            console.log('Creating UI Element: ', this.uiName);
   
            done();
        }.bind(this));
    },

    writing: function(){
        var className = this._.classify(this.uiName);
        var dashedName = this._.dasherize(this.uiName);
        dashedName = this._.trim(dashedName, '-');

        vars = {dashedName: dashedName, className:className};

        this.template('UIElement.hbs', 'src/js/templates/ui/'+className+'.hbs', vars);
        this.template('UIElement.less', 'src/less/ui/'+className+'.less', vars);
        this.template('UIElement.js', 'src/js/ui/'+className+'.js', vars);
    }

});