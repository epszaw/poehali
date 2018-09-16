const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const cond = require('gulp-if')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync')
const stream = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')

const ENV = process.env.NODE_ENV || 'dev'
const bundler = browserify({
  entries: ['src/app.js'],
  debug: ENV === 'dev'
})

gulp.task('js', () => {
  return bundle()
    .pipe(cond(ENV === 'dev', uglify()))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.stream())
})

function bundle() {
  return bundler
    .transform('babelify', {
      presets: ['@babel/env']
    })
    .bundle()
    .pipe(stream('app.js'))
    .pipe(buffer())
    .pipe(
      cond(
        ENV === 'dev',
        sourcemaps.init({
          loadMaps: true
        })
      )
    )
    .pipe(cond(ENV === 'dev', sourcemaps.write()))
}
