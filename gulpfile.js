const gulp = require('gulp')
const browserSync = require('browser-sync')

const bs = browserSync.create()

const { serve } = require('./task/serve')
const { js } = require('./task/js')
const { pug } = require('./task/pug')
const { css } = require('./task/css')
const { svg } = require('./task/svg')
const { fonts, images } = require('./task/assets')

// Common tasks
gulp.task('js', js)
gulp.task('pug', pug)
gulp.task('css', css)
gulp.task('svg', svg)
gulp.task('fonts', fonts)
gulp.task('images', images)
gulp.task('serve', serve)

// Watch tasks
gulp.task('watch:js', () =>
  gulp.watch('src/**/*.js', gulp.series(js, bs.reload)),
)
gulp.task('watch:pug', () =>
  gulp.watch('src/**/*.pug', gulp.series(pug, bs.reload)),
)
gulp.task('watch:css', () =>
  gulp.watch('src/**/*.css', gulp.series(css, bs.reload)),
)
gulp.task('watch:svg', () =>
  gulp.watch('src/**/*.svg', gulp.series(svg, bs.reload)),
)
gulp.task('watch:assets', () =>
  gulp.watch('src/assets/**/*', gulp.series(fonts, images, bs.reload)),
)

// Core tasks
gulp.task(
  'watch',
  gulp.parallel(
    'watch:js',
    'watch:pug',
    'watch:css',
    'watch:svg',
    'watch:assets',
  ),
)
gulp.task('build', gulp.series('fonts', 'images', 'js', 'pug', 'css', 'svg'))
gulp.task('default', gulp.series('build', gulp.parallel('serve', 'watch')))
