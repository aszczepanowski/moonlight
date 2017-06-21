var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    minify = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

gulp.task('sass', function() {
  return gulp.src('app/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minify()))
    .pipe(gulp.dest('dist'));
});

gulp.task('imagemin', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
    interlaced: true,
    progressive: true,
    optimizationLevel: 5,
    svgoPlugins: [{removeViewBox: true}]
  }))
  .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
