'use strict';

var gulp = require('gulp'),
    changed = require('gulp-changed'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reactify = require('reactify'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    p = {
      jsx: './scripts/app.jsx',
      scss: 'styles/**/*.scss',
      includes: 'styles/includes/*.scss',
      bundle: 'app.js',
      buildJs: 'build/js',
      distJs: 'dist/js',
      distCss: 'dist/css',
      distFonts: 'dist/fonts',
      distImages: 'dist/images'
    };

var config = {
    nodeDir: './node_modules',
    bowerDir: './bower_components',
    staticDir: './static'
};

gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    host: "0.0.0.0",
    // App assumes that dev is served from port 3000
    port: "3000"
  })
});

gulp.task('watchify', function() {
  var bundler = watchify(browserify(p.jsx, {debug:true}));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', notify.onError())
      .pipe(source(p.bundle))
      .pipe(gulp.dest(p.distJs))
      .pipe(reload({stream: true}));
  }

  bundler.transform(reactify)
  .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', function() {
  browserify(p.jsx)
    .transform(reactify)
    .bundle()
    .pipe(source(p.bundle))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(p.distJs));
});

gulp.task('icons', function() {
  return gulp.src(config.nodeDir + '/font-awesome/fonts/**.*')
    .pipe(gulp.dest(p.distFonts));
});

gulp.task('images', function() {
  return gulp.src(config.staticDir + '/images/**.*')
    .pipe(gulp.dest(p.distImages));
});


gulp.task('styles', function() {
  return gulp.src('styles/main.scss')
    .pipe(changed(p.distCss))
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      }))
    .on('error', notify.onError())
    .pipe(autoprefixer('last 1 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(p.distCss))
    .pipe(reload({stream: true}));
});

// TODO - concat all script files into one
gulp.task('scripts', function() {
  gulp.src(['./dist/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(p.buildJs))
});

gulp.task('watchTask', function() {
  gulp.watch(p.scss, ['styles']);
});

gulp.task('watch', ['clean'], function() {
  gulp.start([
    'browserSync',
    'watchTask',
    'watchify',
    'styles',
    'icons',
    'images'
  ]);
});

gulp.task('build', ['clean'], function() {
  process.env.NODE_ENV = 'production';
  gulp.start([
    'browserify',
    'styles',
    'icons',
    'images'
  ]);
});

gulp.task('default', function() {
  console.log('Run "gulp watch or gulp build"');
});
