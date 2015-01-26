module.exports = {

    addPlatform: function(platform, string){
        if (platform){
            if (string.indexOf('/') > 0){
                // replace the first insance of /
                return string.replace(/\//, '_' + platform + '/');
            }
            return string + '_' + platform;
        }
        return string
    }

}