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

router.get('*', (req, res, next) => {

  // Escaped fragment; URL path.
  let p = req.path;

  // Parse the escaped fragment(s).
  // Split into array and filter fragments.
  let escapedFragments = p.split('/').filter((fragment) => {
    // Remove empty strings from resulting array and strings that contain '=='
    fragment != false && !fragment.includes('==')
  });

  // Remove duplicate values from array
  escapedFragments = escapedFragments.reduce((a,b) => {
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
  },[]);

  // Check request is coming from a human
  if (req.device.type != 'bot') {

    // Render index page with spooky container mark-up
    res.render('index-spooky', {
      title: 'Home',
      assetUrl: assetUrl
    });
    return;

  // Otherwise request is coming from bot.
  } else if (p) {

    // If request is for homepage
    if (p.length >= 1 && escapedFragments.length == 0) {
      console.log(`bot | p: ${p} | fragment: ${escapedFragments} && length: ${escapedFragments.length}`)
      res.render('index', {
        title: 'Home',
        assetUrl: assetUrl
      })
      return;
    } else if (escapedFragments.length = 1) {

      switch (escapedFragments[0]) {
        case 'about':
          res.render('about', {
            title: 'About',
            assetUrl: assetUrl
          });
          break;
        default:
          res.render('index', {
            title: 'Home',
            assetUrl: assetUrl
          });
      }
    }
  }
});

module.exports = router;
