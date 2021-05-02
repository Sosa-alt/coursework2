const MongoClient = require('mongodb').MongoClient;

// List the databases in the cluster
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();
    console.log('Databases: ')
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

// Create our main function
async function main() {
    const uri = "mongodb+srv://coursework:NodeExpress2@coursework-2.ulibq.mongodb.net/coursework?retryWrites=true&w=majority";
    // Connect to database
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        await listDatabases(client);

        return client;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

module.exports = main().catch(console.error);