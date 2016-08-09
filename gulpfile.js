//dependencies
var gulp = require('gulp');
var util = require('gulp-util');
var SystemBuilder = require('systemjs-builder');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var tsConfig = require('./tsconfig.json');
var connect = require('gulp-connect');
var rimraf = require('gulp-rimraf');
var htmlreplace = require('gulp-html-replace');

//Typescript Config;
var tsProject = ts.createProject(tsConfig.compilerOptions);

function getBuilder(configPath) {
    var builder = new SystemBuilder();
    return builder.loadConfig(configPath)
      .then(function () {
          return builder;
      });
}

gulp.task('build:app', function () {   
    return getBuilder('./system.config.js')
      .then(function (builder) {
          return builder.buildStatic('app', 'dist/bundledapp.js', { minify: false });
      });
});

//uncomment bundledapp.js
gulp.task('build:prod', function() {
  gulp.src('dist/index.html')
    .pipe(htmlreplace({
        'prod': 'bundledapp.js'
    }))
    .pipe(gulp.dest('dist/'));
});


//copy dependencies to dist folder
gulp.task('copy:deps', function(){
  return gulp.src([
    'node_modules/es6-shim/es6-shim.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/http.js',
    'node_modules/angular2/bundles/router.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/systemjs/dist/system.js',
  ]).pipe(gulp.dest('dist/vendor'));
});

//copy html/css/js files
gulp.task('copy:src', function(){
  return gulp.src([
    'src/bootstrap.js',
    'src/index.html',
    'src/**/*.html',
    'src/**/*.css'
  ])
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
});

//clean the dist folder
gulp.task('clean', function(cb){
  rimraf('./dist', cb);
})

//compile app typescript files
gulp.task('compile:app', function(){
  return gulp.src(['src/**/*.ts', 'typings/browser/**/*.d.ts'])
    .pipe(ts(tsProject))
    .pipe(gulp.dest('./src'));
});

//live reload server
gulp.task('server', ['copy:deps', 'copy:src','compile:app', 'build:app', 'build:prod'], function() {
  connect.server({
    root: 'dist',
    livereload: true,
    fallback: 'dist/index.html'
  });
});


//default task
gulp.task('default', ['server'], function(){
  gulp.watch(['src/**/*.ts'], ['compile:app']);
  gulp.watch(['src/**/.js', 'src/**/*.html'], ['copy:src']);
});
