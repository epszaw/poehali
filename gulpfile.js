const gulp = require('gulp')
const requireDir = require('require-dir')
const runSequence = require('run-sequence')
const browserSync = require('browser-sync')
const path = require('path')
const watch = require('gulp-watch')
const bs = browserSync.create()

requireDir('task')

gulp.task('build', ['move-assets', 'js', 'pug', 'css'])

gulp.task('watch', () => {
  watch('src/**/*.pug', e => runSequence('pug', bs.reload))
  watch('src/**/*.css', e => runSequence('css', bs.reload))
  watch('src/**/*.js', e => runSequence('js', bs.reload))
  watch(['src/assets/images/**/*', 'src/assets/fonts/**/*'], e =>
    runSequence('move-assets', bs.reload)
  )
})

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: path.resolve(__dirname, 'dist/')
    },
    port: 3000,
    open: false
  })
})

gulp.task('default', ['browserSync', 'build', 'watch'])
