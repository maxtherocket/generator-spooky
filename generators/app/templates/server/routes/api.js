const express   = require('express');
const router    = express.Router();
const ENV       = process.env.ENV || 'development';
const PORT      = process.env.SERVER_PORT || process.env.PORT || 8002;
const HOST      = process.env.HOST || '127.0.0.1';
const assetUrl  = process.env.ASSET_URL || 'http://127.0.01:8001';
const nodeSes   = require('node-ses');
const awsConfig = require('../package.json').awsConfig || {};

// Function to parse escaped fragments
const parseEscapedFragment = (request) => {
  // Split into array and filter fragments.
  // Remove empty strings from resulting array and strings that contain '=='
  return request.split('/').filter((fragment) => {
    fragment != false && !fragment.includes('==')
  });
}

const client = nodeSes.createClient({
  key: awsConfig.accessKeyId,
  secret: awsConfig.secretAccessKey
});

router.post('/contact', (req, res, next) => {
  let name    = req.body['name'];
  let email   = req.body['email'];
  let message = req.body['message'];

  let date          = new Date();
  let formattedDate = date.toDateString();

  let testObj = {
    name : name,
    email : email,
    message : message,
    date : formattedDate
  }
  console.log(JSON.stringify(req.body, null, 2));
  console.log(JSON.stringify(testObj, null, 2));
  res.status(200).send({ok:true});

  // Give SES the details and let it construct the message for you.
//   client.sendEmail({
//     to: 'automated-method',
//     from: `automated-method`,
//     // cc: '',
//     //bcc: ``,
//     subject: `Web Inquiry - ${formattedDate}`,
//     message: `
//       Name: ${name} <br>
//       Email: ${email} <br>
//       Message: ${message} <br>
//       Date: ${formattedDate}
//     `,
//     altText: 'plain text'
//   }, ((err, data) => {
//     if (err){
//       console.log(JSON.stringify(err, null, 2));
//       res.status(500).send({ok:false, message:JSON.stringify(err)});
//       return;
//     }
//     res.status(200).send({ok:true});
//   }));
})


module.exports = router;
