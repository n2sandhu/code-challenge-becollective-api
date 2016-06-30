
var path = require('path');
var app = require(path.resolve(__dirname, '../server'));
var fs = require('fs');
var dataSource = app.dataSources.db;

var toiletJson = JSON.parse(fs.readFileSync(__dirname + '/toiletData.json', 'utf8'));


dataSource.automigrate('toilet', function(err) {
    if (err) throw err;
    var toiletModel = app.models.toilet;
    var count = toiletJson.toilets.length;
    toiletJson.toilets.forEach(function(toiletObj) {
        var toilet = {};
        toilet.toiletObj = toiletObj;
        toiletModel.create(toilet, function(err, record) {
            if (err) return console.log(err);
            count--;
            if (count === 0) {
                console.log('done toilets');
            }
        });
    });
});

