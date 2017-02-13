'use strict';

module.exports = function() {
    $.gulp.task('gulp:spritesmith', function () {
        var spriteData = $.gulp.src('./source/images/*.png').pipe($.spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }));
        return spriteData.pipe($.gulp.dest('./build/assets/img/'));
    });

  $.gulp.task('sprite:svg', function() {
    return $.gulp.src('./source/sprite/*.svg')
      .pipe($.gp.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.gp.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe($.gp.replace('&gt;', '>'))
      .pipe($.gp.svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg"
          }
        }
      }))
      .pipe($.gulp.dest($.config.root + '/assets/img'))
  })


};
