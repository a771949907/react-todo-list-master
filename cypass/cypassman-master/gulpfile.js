const gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    webpackDevServer = require('webpack-dev-server'),
    webpackConfig = require('./webpack.config.js'),
    exec = require('child_process').exec,
    os = require('os');

gulp.task('default', ['webpack:build-dev', 'webpack-dev-server']);

let devConfig = Object.create(webpackConfig);

const devCompiler = webpack(devConfig);

gulp.task('resize-images', () => {
    const iconSizes = [ 16, 19, 48, 128 ];

    switch(os.platform()){
        case "darwin":
            iconSizes.forEach(t => {
                gutil.log(`task[resize-images] running rescale for ${t}`);
                exec(`sips -Z ${t} src/resources/images/logo.png --out build/icons/icon-${t}.png`, (err, stdout, strerr) => {
                    if(err)
                    {
                        gutil.log(err, stdout, strerr);
                    }
                });
            });
            break;
        default:
            break;
    }
});

gulp.task('webpack:build-dev', ['resize-images'] , callback => {
    devCompiler.run((err, stats) => {
        if (err) throw new gutil.PluginError('webpack:build-dev', err);

        gutil.log('[webpack:build-dev]', stats.toString({colors: true}));
        callback();
    });
});

gulp.task('webpack-dev-server', callback => {
    new webpackDevServer(devCompiler, {
        stats:{
            colors:true
        }
    }).listen(8080, 'localhost', err => {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);

        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    });
});