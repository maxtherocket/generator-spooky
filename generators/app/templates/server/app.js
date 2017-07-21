require('dotenv').config();

const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const expressDevice = require('express-device'); // Package for figuring out if bot
const ENV           = process.env.ENV || 'development';
const PORT          = process.env.SERVER_PORT || process.env.PORT || 8002;
const HOST          = process.env.HOST;
const index         = require('./routes/index');
const api           = require('./routes/api');
const app           = express();

// If using multiple view engines, npm package 'consolidate' required.
// Set which view engines to use
// app.engine('pug', engines.pug);
// app.engine('ejs', engines.ejs);

// Set default view engine.
// Files that are not the default engine must have their file extension specified when rendering.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressDevice.capture());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', api);
// * will capture all routes.
app.use('*', index);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {

  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = ENV == 'development' ? err : {};

  // Log error to the console.
  console.log(JSON.stringify(err, null, 2));

  // Render the error page
  res.status(err.status || 500);
  res.render('error');

});

app.listen(PORT, () => console.log(`Node Express Server running host: ${HOST}, listening on port: ${PORT}!`));

module.exports = app;
