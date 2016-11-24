var moment = require('moment');
var arg = process.argv[2];
console.log(moment().utcOffset(arg*60).format('YYYY-MM-DD HH:mm'));