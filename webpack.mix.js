
// jshint ignore: start
/* eslint-disable */

let mix = require('laravel-mix');

mix.autoload({
    jquery: ['$', 'jQuery', 'window.jQuery'],
   });
   


mix.js([
    'src/js/swiper.min.js',
    'src/js/main.js',
    'src/js/page-handler.js',
    'src/js/plugins.js',
    'src/js/current-device.min.js',
], 'dist/main.js')


mix.sass('src/scss/index.scss', 'dist/')
    