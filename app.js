const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Define the endpoint for the POST request
app.post('/transform', (req, res) => {
  // Extract the payload and reference data from the request body
  const { payload, referenceData } = req.body;

  // Define a regular expression to match reference keys in the payload
  const regex = /\{REF_(\w+)\}/g;

  // Replace all instances of reference keys in the payload with their corresponding values from referenceData
  const transformedPayload = JSON.parse(JSON.stringify(payload).replace(regex, (match, key) => referenceData[key]));

  // Send the transformed payload back in the response
  res.json(transformedPayload);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
This implementation assumes that the request body contains a JSON object with two properties: payload and referenceData. The payload property is the JSON object to be transformed, and the referenceData property is a JSON object containing the reference data to be used in the transformation.

The implementation uses a regular expression to match reference keys in the payload, which are identified by the prefix REF_. It then replaces each instance of a reference key with its corresponding value from the referenceData object using the replace function.

Finally, the transformed payload is sent back to the client in the response as a JSON object.





