var sys = require('sys'),
    path = require('path');

require.paths.push(path.join(__dirname, "lib"));
var jasmine = require('jasmine')

for(var key in jasmine) {
  global[key] = jasmine[key];
}

var isVerbose = false;
var showColors = true;
process.argv.forEach(function(arg){
  switch(arg) {
  case '--color': showColors = true; break;
  case '--noColor': showColors = false; break;
  case '--verbose': isVerbose = true; break;
  }
});

var specPath = process.ARGV[2] || (__dirname + "/spec")
require(process.ARGV[2].replace(/\.js$/, ""))

jasmine.executeSpecs(specPath, function(runner, log){
  // This is to workaround a node.js bug (http://github.com/ry/node/issues/#issue/138)
  setTimeout(function() {
    process.exit(runner.results().failedCount);
  }, 100)
}, isVerbose, showColors);
