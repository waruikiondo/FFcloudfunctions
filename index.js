const app = require('express')();
const admin = require('firebase-admin');
const functions = require('firebase-functions');
// To avoid deployment errors, do not call admin.initializeApp() in your code

app.get("/", async (req, res) => {
  // example - https://myapp.page.link?apn=com.company.app&ibi=com.company.app&link="
  const dynamicLink = "https://[PACKAGE DOMAIN]?apn=[PACKAGE]&ibi=[PACKAGE]&link=";
  // example - https://myapp.page.link/resetPass
  const targetUrl = "[PACKAGE DOMAIN]/[PAGE]";
  const newUrl = new URL(targetUrl);

  // Get the parameters from the URL
  const params = req.query;

  // DEBUG: Create a new document in the 'spotify' collection
  // const docRef = admin.firestore().collection('spotify').doc();

  // Add code as query parameters
  newUrl.searchParams.append("code", req.query.code);

  // Create the final dynamic link with the encoded URL
  const finalDynamicLink = dynamicLink + encodeURIComponent(newUrl.toString());

  // DEBUG: Add the parameters to the document
  // await docRef.set({ params: params, 'url': finalDynamicLink });

  res.redirect(finalDynamicLink);
});

exports.spotifyauth = functions.https.onRequest(app);
