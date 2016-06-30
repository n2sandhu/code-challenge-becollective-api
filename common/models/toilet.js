

module.exports = function(Toilet) {

    var publicConfig = {
        key: 'AIzaSyC8FW0KGjAiDEP_8ds-YlATX164P-tigFc',
        stagger_time:       1000, // for elevationPath
        encode_polylines:   false,
        secure:             true // use https
    };
    
    Toilet.fetchToiletData = function(viewportRange, cb){
        
        Toilet.find(function(err, response){
           if(err){
               cb(err, null);
           }
            else{
               var toiletsInRange = [];
               response.forEach(function(toilet){
                   if(toilet.toiletObj.Latitude < viewportRange[0] && toilet.toiletObj.Latitude > viewportRange[2] && toilet.toiletObj.Longitude > viewportRange[1] && toilet.toiletObj.Longitude < viewportRange[3])
                   {
                       toiletsInRange.push(toilet.toiletObj);
                   }
               });
               cb(null, toiletsInRange);
           }
        });
    };

    Toilet.remoteMethod(
        'fetchToiletData',
        {
            description: "Fetches toilets within the viewport range",
            accepts: [{arg: 'viewportRange', type: 'object', required: true}],
            returns: {arg: 'toilets', type: 'array', root: true},
            http: {path:'/fetchToiletData', verb: 'get'}
        }
    );
};
