'use strict';
//List of the required dependency required to run the project
var gulp = require('gulp');
var war = require('gulp-war');
var zip = require('gulp-zip');
require('require-dir')('./gulp');
//Default task for gulp i.e. use the 'gulp' command to run this task
gulp.task('default', ['clean','sass'], function() {
  gulp.start('build');
});

gulp.task('war', function () {
    gulp.src(['dist/**/*'])
        .pipe(war({
            welcome: 'index.html',
            displayName: 'Gulp WAR',
        }))
        .pipe(zip('by.war'))
        .pipe(gulp.dest('war'));
});