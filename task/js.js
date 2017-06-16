const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const cond = require('gulp-cond')
const browserSync = require('browser-sync')
const stream = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const browserify = require('browserify')

const env = process.env.NODE_ENV
const bundler = browserify({
  entries: ['src/app.js'],
  debug: env === 'dev'
});

gulp.task('js', () => {
  return bundle()
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.stream())
})

function bundle () {
  return bundler
    .transform('babelify', {
      presets: ['es2015']
    })
    .bundle()
    .pipe(stream('app.js'))
    .pipe(buffer())
    .pipe(cond(env === 'dev'), sourcemaps.init({
      loadMaps: true
    }))
    .pipe(cond(env === 'dev'), sourcemaps.write())
}
