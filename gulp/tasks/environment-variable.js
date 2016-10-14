module.exports = (function(){

    var prod = false,
        livereload = false;

    return {
        setEnv: function(newEnv){
            
            prod = newEnv;
        },
        getEnv: function(){

            return prod;
        },
        setLive: function(){

            livereload = true;
        },
        getLive: function(){

            return livereload;
        }
    };
}());
