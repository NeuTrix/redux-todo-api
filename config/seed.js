let testdb = require('./dbseed')
let _ = require('lodash')

testdb.Clear();
testdb.Seed(5);
// testdb.Close();
