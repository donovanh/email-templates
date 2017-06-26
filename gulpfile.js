var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  inlineCss = require('gulp-inline-css'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  clean = require('gulp-clean')

gulp.dest(function (file) {
  return path.join(build_dir, path.dirname(file.path))
})

gulp.task('clean', function () {
  return gulp.src('./public', {read: false})
    .pipe(clean())
})

gulp.task('html', function () {
  return gulp.src(['./src/*.html', './src/**/*.html'])
    .pipe(inlineCss())
    .pipe(gulp.dest('public/'))
})

gulp.task('css', function () {
  return gulp.src('src/**/*.css')
      .pipe(postcss([
        require('autoprefixer'),
        require('postcss-nested'),
        require('precss'),
        require('postcss-partial-import')(),
        require('postcss-css-variables')
      ]))
      .pipe(gulp.dest('public/'))
})

gulp.task('browser-sync', ['html', 'css'], function () {
  browserSync({
    server: {
      baseDir: './public/',
      injectChanges: true,
      files: ['./public/**/*']
    }
  })
})

gulp.task('watch', function () {
  // Watch .html files
  gulp.watch('src/*.html', ['html', browserSync.reload])
  gulp.watch('src/**/*.html', ['html', browserSync.reload])
  gulp.watch('src/**/*.css', ['css', browserSync.reload])
})

gulp.task('default', ['html', 'css', 'browser-sync', 'watch'])
