// jshint ignore: start
/* eslint-disable */
'use strict';
var windowWidth = isNaN(window.innerWidth)
  ? window.clientWidth
  : window.innerWidth;
var windowHeight = isNaN(window.innerHeight)
  ? window.clientHeight
  : window.innerHeight;
var touchInterval = void 0;
var introFlag = !0;
var lightboxWidth = 0.8;

var isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
isTouch = 'ontouchstart' in window || 0 < navigator.msMaxTouchPoints;
isTouch
  ? (console.log('touch'),
    document.body.classList.add('touch-device'),
    (lightboxWidth = 1))
  : document.body.classList.add('not-touch-device');

var viewHeight = 0.01 * window.innerHeight;

document.documentElement.style.setProperty('--vh', viewHeight + 'px'),
  window.addEventListener('resize', function () {
    (viewHeight = 0.01 * window.innerHeight),
      document.documentElement.style.setProperty('--vh', viewHeight + 'px');
  });

var userAgent = window.navigator.userAgent;
var iOS = !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i);
var webkit = !!userAgent.match(/WebKit/i);
var iOSSafari = iOS && webkit && !userAgent.match(/CriOS/i);

function showIntro() {
  introFlag == 1
    ? (document.querySelector('.intro') &&
        (setTimeout(function () {
          document.body.classList.add('showing-intro'),
            document.body.classList.remove('show-intro');
        }, 2e3),
        setTimeout(function () {
          document.body.classList.remove('showing-intro');
        }, 1e3)),
      (introFlag = !1))
    : document.body.classList.remove('show-intro');
}

function handlePosts(baseElement) {
  var categories = baseElement.querySelector('.categories'); // var n
  var categoriesTitle = baseElement.querySelector('.categories-title'); // var t
  var post = Array.from(baseElement.querySelectorAll('.post'));
  categoriesTitle &&
    categoriesTitle.addEventListener('click', () => {
      categoriesTitle.parentElement.parentElement.classList.toggle(
        'active-filters'
      ),
        categoriesTitle.parentElement.parentElement.classList.contains(
          'active-filters'
        ) || categoriesTitle.nextElementSibling.children[0].children[0].click();
    }),
    document.fonts.load('1rem "Surt Semi Bold"').then(function () {
      post.forEach(function (baseElement, _categoriesTitle) {
        baseElement.children[0].children[0].offsetWidth >=
          baseElement.children[0].offsetWidth &&
          baseElement.classList.add('long-title');
      });
    }),
    categories &&
      post &&
      (Array.from(categories.querySelectorAll('.category-button')).forEach(
        function (baseElement) {
          baseElement.addEventListener('click', function () {
            categories
              .querySelector('.category-li.active')
              .classList.remove('active'),
              baseElement.parentElement.classList.add('active');
            var categoriesTitle = baseElement.dataset.slug;
            post.forEach(function (baseElement) {
              baseElement.dataset.categories
                .split(' ')
                .filter(function (baseElement) {
                  return baseElement != '';
                })
                .some(function (baseElement) {
                  return categoriesTitle == baseElement;
                })
                ? baseElement.classList.remove('hide')
                : (baseElement.classList.add('hide'),
                  baseElement.classList.remove('toggle'),
                  baseElement.removeAttribute('style'));
            });
          });
        }
      ),
      post.forEach(function (item, baseElement) {
        var openSvg = item.querySelector('svg');
        var o = item.querySelector('video');
        item.children[0].addEventListener('mouseenter', function (baseElement) {
          item.children[0].children[2] &&
            !item.classList.contains('toggle') &&
            ((item.children[0].children[2].style.left =
              baseElement.clientX + 'px'),
            (item.children[0].children[2].style.top =
              baseElement.clientY + 'px'));
        }),
          item.children[0].addEventListener('mouseleave', function (
            _baseElement
          ) {
            item.children[0].children[2] &&
              item.children[0].children[2].removeAttribute('style');
          }),
          item.children[0].addEventListener('click', function () {
            if (
              !item.classList.contains('toggle') 
            ) {
              document.body.classList.add('post-toggled');
              openSvg.classList.add('toggle');
              var categoriesTitle = post.find(function (baseElement) {
                return baseElement.classList.contains('toggle');
              });
              if (categoriesTitle) {
                categoriesTitle.classList.remove('toggle'),
                  categoriesTitle.removeAttribute('style');
                  categoriesTitle.firstElementChild.lastChild.previousElementSibling.classList.remove('toggle');
                var categories = categoriesTitle.querySelector('video');
                categories &&
                  (categories.pause(), (categories.currentTime = 0));
              }
              (item.dataset.height = item.children[1].offsetHeight + 50 + 'px'),
                item.classList.add('toggle'),
                (item.style.height = item.dataset.height);
            } else item.classList.remove('toggle'), openSvg.classList.remove('toggle'), item.removeAttribute('style'), document.body.classList.remove('post-toggled'), o && (o.pause(), (o.currentTime = 0));
            setTimeout(function () {
              item.children[0].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
              });
            }, 500);
          });
        var categoriesTitle = item.querySelector('.slider img.active');
        if (
          (categoriesTitle &&
            categoriesTitle.addEventListener('load', function () {
              item.classList.add('first-img-loaded');
            }),
          o)
        ) {
          var categories = o.getAttribute('poster');
          var a = new Image();
          a.addEventListener('load', function () {
            item.classList.add('video-loaded');
          }),
            (a.src = categories);
        }
      }));
}

function handlePostCloseButton(e) {
  Array.from(e.querySelectorAll('.close-post')).forEach(function (e) {
    e.addEventListener('click', function () {
      e.parentNode.parentNode.children[0].click();
    });
  });
}

function handleSliders(e) {
  var t = Array.from(e.querySelectorAll('.slider'));
  t.length > 0 &&
    t.forEach(function (n) {
      var e = n.nextElementSibling;
      if (e) {
        var t = e.children[0];
        var i = e.children[1];
        var o = n.nextElementSibling.nextElementSibling;
        t.addEventListener('click', function () {
          var e = n.querySelector('.active');
          e.previousElementSibling
            ? e.previousElementSibling.classList.add('active')
            : n.lastElementChild.classList.add('active'),
            e.classList.remove('active');
          var t = o.querySelector('.active');
          t.previousElementSibling
            ? t.previousElementSibling.classList.add('active')
            : o.lastElementChild.classList.add('active'),
            t.classList.remove('active');
        }),
          i.addEventListener('click', function () {
            var e = n.querySelector('.active');
            e.nextElementSibling
              ? e.nextElementSibling.classList.add('active')
              : n.children[0].classList.add('active'),
              e.classList.remove('active');
            var t = o.querySelector('.active');
            t.nextElementSibling
              ? t.nextElementSibling.classList.add('active')
              : o.children[0].classList.add('active'),
              t.classList.remove('active');
          }),
          isTouch &&
            swipedetect(n, function (e) {
              e == 'right' ? t.click() : e == 'left' && i.click();
            });
      }
    });
}

function handlePageVideos(e) {
  document.createElement('video').canPlayType &&
    Array.from(e.querySelectorAll('.post-video')).forEach(function (t) {
      var n = t.querySelector('.vid-playpause');
      var i = t.querySelector('.vid-mute');
      var e = t.querySelector('.vid-fullscreen');
      var o = t.querySelector('.intro-play');
      var a = t.querySelector('.vid-progress-wrap');
      var r = t.querySelector('.vid-progress-bar');
      var s = t.querySelector('video');
      !(
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled ||
        document.webkitSupportsFullscreen ||
        document.webkitFullscreenEnabled ||
        document.createElement('video').webkitRequestFullScreen
      ) && (e.style.display = 'none');

      function c(e) {
        t.setAttribute(
          'data-fullscreen',
          e ? 'cancel-fullscreen' : 'go-fullscreen'
        );
      }

      function l() {
        document.fullScreen ||
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        document.msFullscreenElement ||
        document.fullscreenElement
          ? (document.exitFullscreen
              ? document.exitFullscreen()
              : document.mozCancelFullScreen
              ? document.mozCancelFullScreen()
              : document.webkitCancelFullScreen
              ? document.webkitCancelFullScreen()
              : document.msExitFullscreen && document.msExitFullscreen(),
            c(!1))
          : (t.requestFullscreen
              ? t.requestFullscreen()
              : t.mozRequestFullScreen
              ? t.mozRequestFullScreen()
              : t.webkitRequestFullScreen
              ? s.webkitRequestFullScreen()
              : t.msRequestFullscreen && t.msRequestFullscreen(),
            c(!0));
      }
      e &&
        e.addEventListener('click', function (_e) {
          l();
        });

      function d(e) {
        e == 'playpause'
          ? s.paused || s.ended
            ? (n.innerHTML = 'Play')
            : (n.innerHTML = 'Pause')
          : e == 'mute' &&
            i.setAttribute('data-state', s.muted ? 'unmute' : 'mute');
      }
      n &&
        (s.addEventListener(
          'play',
          function () {
            d('playpause');
          },
          !1
        ),
        s.addEventListener(
          'pause',
          function () {
            d('playpause');
          },
          !1
        ),
        s.addEventListener(
          'ended',
          function () {
            s.currentTime = 0;
          },
          !1
        ),
        n.addEventListener('click', function (_e) {
          s.paused || s.ended ? s.play() : s.pause();
        })),
        i &&
          i.addEventListener('click', function (_e) {
            (s.muted = !s.muted), d('mute');
          }),
        o.addEventListener(
          'click',
          function () {
            (t.dataset.state = 'initialized'),
              s.play(),
              isTouch && s.setAttribute('controls', !0);
          },
          !1
        ),
        a &&
          (s.addEventListener('loadedmetadata', function () {
            a.setAttribute('max', s.duration);
          }),
          s.addEventListener('timeupdate', function () {
            a.getAttribute('max') || a.setAttribute('max', s.duration),
              (a.value = s.currentTime),
              (r.style.width =
                Math.floor((s.currentTime / s.duration) * 100) + '%');
          }),
          a.addEventListener('click', function (e) {
            var t =
              (e.pageX -
                (this.offsetLeft +
                  this.parentElement.parentElement.offsetLeft)) /
              this.offsetWidth;
            s.currentTime = t * s.duration;
          })),
        document.addEventListener('fullscreenchange', function (_e) {
          c(!(!document.fullScreen && !document.fullscreenElement));
        }),
        document.addEventListener('webkitfullscreenchange', function () {
          c(!!document.webkitIsFullScreen);
        }),
        document.addEventListener('mozfullscreenchange', function () {
          c(!!document.mozFullScreen);
        }),
        document.addEventListener('msfullscreenchange', function () {
          c(!!document.msFullscreenElement);
        });
    });
}

iOSSafari && document.body.classList.add('ios-safari'), showIntro();
var Landingview = Barba.BaseView.extend({
  namespace: 'landing-page',
  onEnterCompleted: function () {
    document.body.insertAdjacentHTML(
      'afterbegin',
      '\n  \t\t<style type="text/css">\n\t\t\t  html, body {margin:0;height:100%;overflow:hidden}\n\t\t\t\tbody {position:fixed;-webkit-overflow-scrolling:touch;overflow-y:scroll;width:100%;}\n\t\t\t</style>\n  \t\t'
    );
  },
  onLeave: function () {
    document.body.removeChild(document.body.children[0]);
  },
  onLeaveCompleted: function () {
    clearInterval(touchInterval);
  },
});

Landingview.init();
var Indexview = Barba.BaseView.extend({
  namespace: 'index-page',
  onEnter: function () {
    var e = this.container;
    if (!isTouch) {
      var t = {
        maxImgSize: lightboxWidth,
      };
      new Lightbox().load(t);
    }
    handlePosts(e),
      handlePageVideos(e),
      handleSliders(e),
      handlePostCloseButton(e);
  },
  onEnterCompleted: function () {},
  onLeave: function () {},
  onLeaveCompleted: function () {},
});

Indexview.init(),
  Barba.Pjax.init(),
  Barba.Prefetch.init(),
  (Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck),
  (Barba.Pjax.preventCheck = function (e, t) {
    return (
      !!Barba.Pjax.originalPreventCheck(e, t) &&
      !/.pdf/.test(t.href.toLowerCase())
    );
  });
