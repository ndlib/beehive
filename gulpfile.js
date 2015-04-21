var gulp = require('gulp');
var jest = require('jest-cli');
var watch = require('gulp-watch');

var jestConfig = {
    rootDir: './app/assets/javascripts/components',
    scriptPreprocessor: '<rootDir>/__tests__/preprocessor.js',
      moduleFileExtensions: [
        'js',
        'jsx',
      ],
      unmockedModulePathPatterns: [
        'react',
        'jquery',
      ],
      testFileExtensions: [
        'js',
        'jsx',
      ],
      testPathIgnorePatterns: [
        'preprocessor.js'
      ],
  };

gulp.task('test', function(done) {
    jest.runCLI({ config : jestConfig }, '.', function() {
        done();
    });
});

gulp.task('watch', function(done) {
    gulp.watch([ jestConfig.rootDir + '/**/*.jsx' ], [ 'test' ]);
});

gulp.task('default', ['test', 'watch']);

