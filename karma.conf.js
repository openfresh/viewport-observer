'use strict';

const fs = require('fs');
const babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));
babelConfig.plugins.push('istanbul');

module.exports = function(config) {
  config.set({
    frameworks : [
      'browserify',
      'mocha'
    ],
    files : [
      'src/*.js',
      'test/*.js'
    ],
    plugins : [
      'karma-coverage',
      'karma-browserify',
      'karma-mocha',
      'karma-chrome-launcher'
    ],
    preprocessors : {
      'src/*.js'  : ['browserify', 'coverage'],
      'test/*.js' : ['browserify']
    },
    browserify : {
      transform : [
        ['babelify', babelConfig]
      ]
    },
    browsers  : ['Chrome'],
    autoWatch : false,
    reporters : [
      'dots',
      'coverage'
    ],
    coverageReporter : {
      reporters : [
        { type : 'lcovonly' }
      ]
    },
    logLevel : config.LOG_DEBUG
  });
};
