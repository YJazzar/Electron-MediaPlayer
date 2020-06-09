const { series } = require('gulp');
const gulp = require('gulp');
const babel = require('gulp-babel');
const cleanCSS = require('gulp-clean-css');

const buildPath = "build/";


// Copy the index.html as is
function html() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest(buildPath));
}

// Compile CSS file and move them to the app folder
function css() {
    return gulp.src('src/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildPath));
}


// Compile JS files and move them to the app folder
function js() { 
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(buildPath));
}


// Export the "start" task.
exports.start = series(html, css, js);
