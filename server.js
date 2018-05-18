const morgan = require('morgan');
const app = require('./app');
const config = require('./config');

var port = config.PORT;

// log requests to console using morgan
app.use(morgan('dev'));

var server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});