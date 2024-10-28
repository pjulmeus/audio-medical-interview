const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.getFile = functions.https.onRequest((req, res) => {
    const bucket = admin.storage().bucket();
    const file = bucket.file("path/to/medical-info.txt");

    file.download().then((data) => {
        const content = data[0];
        res.set("Access-Control-Allow-Origin", "*"); // Adjust this to your specific domain in production
        res.send(content.toString());
    }).catch((error) => {
        res.status(500).send(error);
    });
});