const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const reload = browserSync.reload;

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './UI',
            index: 'index.html'
        },
        port: process.env.PORT || 9000,
        ui: false,
        ghostMode: false
    });
});

gulp.task('watch', ['browser-sync'], () => {
    gulp.watch(['UI/js/*.js', 'UI/css/*.css', 'UI/*.html'], reload);
});

// default task
gulp.task('default', [
    'browser-sync', 'watch'
]);
