'use strict';

module.exports = function(config) {
  config.set({
    frameworks : [
      'browserify',
      'mocha'
    ],
    files : [
      'test/*.js'
    ],
    plugins : [
      'karma-browserify',
      'karma-mocha',
      'karma-chrome-launcher'
    ],
    preprocessors : {
      'test/*.js' : 'browserify'
    },
    browserify : {
      transform : ['babelify']
    },
    browsers  : ['Chrome'],
    autoWatch : false,
    reporters : ['dots'],
    logLevel  : config.LOG_DEBUG
  });
};
