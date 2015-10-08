'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

gulp.task('styles', ['wiredep'],  function () {
  return gulp.src('src/{app,components,styles}/**/*.scss')
    .pipe($.sass({outputStyle: 'compact'}))
    .on('error', handleError)
    .pipe($.autoprefixer('last 2 versions'))
    .pipe(gulp.dest('.tmp'))
    .pipe($.size());
});

gulp.task('scripts', function () {
  return gulp.src(['src/app/**/*.js'])
    .pipe($.jshint('.jshintrc'))
    .pipe($.jshint.reporter('jshint-stylish'))
    //.pipe($.jscs({configPath: '.jscsrc'}));
});

gulp.task('html', ['styles', 'scripts'], function () {
  var htmlFilter = $.filter('**/*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src('src/*.html')
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    //.pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.inlineSource())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src('src/assets/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/assets/images'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  return gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest('dist/assets/fonts'))
    .pipe($.size());
});

gulp.task('misc', function () {
  return gulp.src('src/**/*.ico')
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('clean', function (done) {
  $.del(['.tmp', 'war', 'dist'], done);
});

// gulp.task('build', ['html', 'images', 'fonts', 'misc']);
// Added dummy task for use of retrieve dummy data
// Todo:remove task dummy
gulp.task('build', ['html', 'images', 'fonts', 'misc']);
