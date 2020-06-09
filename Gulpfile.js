const { series } = require('gulp');
const gulp = require('gulp');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');
const cleanFile = require('gulp-clean');


const buildPath = "build/";


// Copy all html as is
function html() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest(buildPath));
}

// Compile CSS file and move them to the app folder
function css() {
    return gulp.src('src/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildPath));
}


// Compile JS files and move them to the builPath folder
function js() { 
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(buildPath));
}


function clean() {
    return gulp.src(buildPath, { read: false })
        .pipe(cleanFile());
}

// Export the "start" task.
exports.build = series(html, css, js);
exports.clean = clean;
