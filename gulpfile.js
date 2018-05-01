'use strict'

const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const rtlcss = require('gulp-rtlcss')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const ts = require('gulp-typescript')

const scripts_src = ['./assets/scripts/**/*.ts']
const scripts_dest = './dist/scripts'
const styles_src = ['./assets/styles/**/*.scss']
const styles_dest = './dist/styles'

gulp.task('scripts', () =>
    gulp.src(scripts_src)
        .pipe(sourcemaps.init())
        .pipe(ts({
            "module": "commonjs",
            "target": "es5",
            "noImplicitAny": true,
            "noImplicitUseStrict": true,
            "noImplicitThis": true,
            "strictNullChecks": true,
            "strictFunctionTypes": true
        }))
        .pipe(uglify())
        .pipe(rename({'suffix' : '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(scripts_dest))
)

gulp.task('styles', () =>
    gulp.src(styles_src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(cleanCSS({format: 'beautify'}))
        // .pipe(gulp.dest(styles_dest))
        .pipe(cleanCSS())
        .pipe(rename({'suffix' : '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(styles_dest))
        .pipe(rtlcss())
        .pipe(rename((path) =>
            path.basename = path.basename.replace('.min', '-rtl.min')
        ))
        .pipe(gulp.dest(styles_dest))
)

gulp.task('watch', () => {
    gulp.watch(scripts_src, ['scripts'])
    gulp.watch(styles_src, ['styles'])
})

gulp.task('default', [
    'scripts',
    'styles',
    'watch'
])
