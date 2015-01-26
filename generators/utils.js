module.exports = {

    addPlatform: function(platform, string){
        if (platform){
            if (string.lastIndexOf('/') == string.length-1){
                return string.substring(0, string.length - 1) + '_' + platform + '/';
            }
            return string + '_' + platform;
        }
        return string
    }

}