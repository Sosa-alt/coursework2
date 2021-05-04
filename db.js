const MongoClient = require("mongodb").MongoClient;

const dbConnectionUrl = "mongodb+srv://Coursework:NodeExpress2@cluster0.j3of5.mongodb.net/coursework?retryWrites=true&w=majority";

function initialize(
    dbCollectionName,
    successCallback,
    failureCallback,
    dbName = 'coursework'
) {
    MongoClient.connect(dbConnectionUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");

            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize
};