const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const autoprefixers = require('gulp-autoprefixer');
const htmlMin = require('gulp-htmlmin');
const gulpsass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-image');
const imagewebp = require('gulp-webp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const clean = () => {
  return del(['dist'])
}

const htmlMinify = () => {
  return src('src/**/*.html')
    .pipe(htmlMin({
        collapseWhitespace: true
    }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const sass = () => {
  return src('src/**/*style.scss')
    .pipe(gulpsass({
        collapseWhitespace: true
    }))
    .pipe(dest('src'))
    .pipe(browserSync.stream())
}

const styles = () => {
  return src('src/css/**/style.css')
    .pipe(sourcemaps.init())
    .pipe(concat('css/style.css'))
    .pipe(autoprefixers({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const normalize = () => {
  return src('src/css/**/normalize.css')
    .pipe(dest('dist/css'))
}

const fonts = () => {
  return src('src/fonts/**')
    .pipe(dest('dist/fonts'))
}

const scripts = () => {
  return src([
    'src/js/**/*.js',
  ])
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify({
    toplevel: true
  }
  ).on('error', notify.onError))
  .pipe(sourcemaps.write())
  .pipe(dest('dist/js'))
  .pipe(browserSync.stream())
}

const img = () => {
  return src([
    'src/img/*.jpg',
    'src/img/*.png',
    'src/img/*.svg',
    'src/img/*.jpeg'
  ])
  .pipe(image())
  .pipe(dest('dist/img'))
}

const webpImages = () => {
  return src([
    'src/img/webp/**/*.{jpg,png}'
  ])
  .pipe(imagewebp())
  .pipe(dest('dist/img'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

watch('src/**/*.html', htmlMinify)
watch('src/css/**/*.scss', sass)
watch('src/css/style.css', styles)
watch('src/js/**/*.js', scripts)

exports.htmlMinify = htmlMinify
exports.sass = sass
exports.styles = styles
exports.scripts = scripts
exports.build = series(clean, htmlMinify, sass, styles, normalize, fonts, scripts, img, webpImages)
exports.dev = series(watchFiles)