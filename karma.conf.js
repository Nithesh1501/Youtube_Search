// Karma configuration
<<<<<<< HEAD
// Generated on Wed May 11 2022 11:10:21 GMT+0530 (India Standard Time)
=======
// Generated on Sat May 07 2022 17:37:23 GMT+0530 (India Standard Time)
>>>>>>> bc76988382b77509b7edc666f0542fb3896a81cd

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
<<<<<<< HEAD
    files: ['tests/test.js'],
=======
    files: [
      'tests/test.js',
    ],
>>>>>>> bc76988382b77509b7edc666f0542fb3896a81cd


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser instances should be started simultaneously
<<<<<<< HEAD
    concurrency: Infinity
=======
    concurrency: Infinity,
>>>>>>> bc76988382b77509b7edc666f0542fb3896a81cd
  })
}
