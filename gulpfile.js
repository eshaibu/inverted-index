const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const run = require('gulp-run');

const reload = browserSync.reload;

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './src',
            index: 'index.html'
        },
        port: process.env.PORT || 9000,
        ui: false,
        ghostMode: false
    });
});

gulp.task('watch', ['browser-sync'], () => {
    gulp.watch(['src/js/*.js', 'src/css/*.css', 'src/*.html'], reload);
});

// default task
gulp.task('default', [
    'browser-sync', 'watch'
]);

gulp.task('browserify', () =>
    browserify('./spec/inverted-index-test.js')
        .bundle()
        .pipe(source('test-spec.js'))
        .pipe(gulp.dest('./spec/tests'))
);

gulp.task('test', ['browserify'], (done) => {
    run('node node_modules/karma/bin/karma start karma.conf.js --single-run').exec();
});
