
let inverted = localStorage.getItem('inverted')
const invertedToggle = document.querySelector('#circle')
const slider = document.querySelector('.sliderToggle')

const css = `
    html {
        --pointer - move - line - color: #03f;
    }
    html.inverted {
        --pointer - move - line - color: #f3a;

      /*--background-color: #101214;
      --foreground-color-rgb: 250,255,240;*/

      /*--background-color: #131310;
      --foreground-color-rgb: 210,230,255;*/

      /*--background-color: #111;
      --foreground-color-rgb: 255,255,255;*/

      --background-color: #111;
      --foreground-color-rgb: 255,254,245;
      --background-color-dark: #000;

      --foreground-color-a: 0.8;
      --base-grid-color1: rgba(240,155,255, 0.1);
      --base-grid-color2: rgba(240,155,255, 0.05);
    }
    html.size-mode-relative {
      --fontSize: calc(100vw / 80);
      --hrThickness: 0.17rem;
    }
    .settings c:nth-child(2n+2) {
        font - feature - settings:'ss02' 1;
      user-select:none;
    }
    .baselineBeacon {
        height: var(--baseline);
      overflow: hidden;
      display: none;
      position: absolute;
    }
    .pointerMoveLine {
        height: 1px;
      pointer-events: none;
      visibility: hidden;
      position: absolute;
      left:0; top:0; right:0;
      background: var(--pointer-move-line-color);
      transform: translate3d(0,0,0);
      opacity:0.4;
    }
    .pointerMoveLine.active {visibility:visible; }
    .pointerMoveLine.pressed {
        opacity:0.8;
      box-shadow:
        0 1px 0 0 var(--pointer-move-line-color),
        0 -1px 0 0 var(--pointer-move-line-color);
    }
    `.trim()
const style = document.createElement('style')
style.appendChild(document.createTextNode(css))
document.head.appendChild(style)
const link = document.createElement('link')
link.rel = 'stylesheet'
document.head.appendChild(link)

function setLabel (id, value) {
  const label = document.getElementById(id)
  label && (label.innerText = value)
}

const enableInverted = () => {
  document.documentElement.classList.add('inverted')
  invertedToggle.classList.add('darkmodeSlide')
  slider.classList.add('sliderToggleActive')
  localStorage.setItem('inverted', 'enabled')
}

const disableInverted = () => {
  document.documentElement.classList.remove('inverted')
  localStorage.setItem('inverted', null)
}

if (inverted === 'enabled') {
  enableInverted()
}

invertedToggle.addEventListener('click', () => {
  invertedToggle.classList.toggle('darkmodeSlide')
  slider.classList.toggle('sliderToggleActive')
  inverted = localStorage.getItem('inverted')

  if (inverted !== 'enabled') {
    enableInverted()
    updateInvertedLabel()
  } else {
    disableInverted()
    updateInvertedLabel()
  }
})

const tapevent = 'PointerEvent' in window ? 'pointerdown' : 'click'

function bindTapableOption (msgname, fn) {
  const label = document.getElementById(msgname + '-msg')
  label && label.parentElement.addEventListener(tapevent, fn)
}

function updateInvertedLabel () {
  const on = document.documentElement.classList.contains('inverted')
  setLabel('inverted-msg', on ? 'NNNCorp™' : 'FFFCorp™')
}
function toggleInvertedMode () {
  invertedToggle.classList.toggle('darkmodeSlide')
  slider.classList.toggle('sliderToggleActive')
  inverted = localStorage.getItem('inverted')

  if (inverted !== 'enabled') {
    enableInverted()
    updateInvertedLabel()
  } else {
    disableInverted()
    updateInvertedLabel()
  }
}

bindTapableOption('inverted', toggleInvertedMode)

// function handleKeyPress (key) {
//   switch (key) {
//     case 'i':
//     case 'I':
//       toggleInvertedMode()
//       return true
//   }
//   return false
// }

// document.addEventListener(
//   'keypress',
//   (ev) => {
//     if (!ev.metaKey && !ev.ctrlKey && !ev.altKey && handleKeyPress(ev.key)) {
//       ev.preventDefault()
//       ev.stopPropagation()
//     }
//   },
//   { passive: false, capture: true }
// )

updateInvertedLabel()

// var $filterMenu = $('.categories-mobile')
// var $filterMenuContent = $('.categories-pills-mobile')

// $filterMenu.click(function () {
//   $filterMenuContent.slideToggle('medium', function () {
//     if ($filterMenuContent.is(':visible')) {
//       $filterMenuContent.css('display', 'flex')
//     } else { $filterMenuContent.css('display', 'none') }
//   })
// })

var $window = $(window)
var $mobileNav = $('#mobile-nav')
var $bugerMenu = $('#burger')

$bugerMenu.click(function () {
  $bugerMenu.toggleClass('open')
  $mobileNav.slideToggle('medium', function () {
    if ($mobileNav.is(':visible')) {
      $mobileNav.css('display', 'block')
    } else { $mobileNav.css('display', 'none') }
  })
})

$window.resize(function () {
  if ($window.width() > 1050) { $mobileNav.slideUp('medium') }
})

$window.resize(function () {
  if ($window.width() > 1050) { $bugerMenu.removeClass('open') }
})



// jshint ignore: start
/* eslint-disable */

// Modal 

!(function (o) {
  typeof module == 'object' && typeof module.exports == 'object'
    ? o(require('jquery'), window, document)
    : o(jQuery, window, document)
})(function (o, e, l, t) {
  var s = [];
    var getCurrent = () => (s.length ? s[s.length - 1] : null);
    var selectCurrent = () => {
      var o;
        var e = !1
      for (o = s.length - 1; o >= 0; o--)
        {s[o].$blocker &&
          (s[o].$blocker.toggleClass('current', !e).toggleClass('behind', e),
          (e = !0))
}
    };
  (o.modal = function (e, l) {
    var t
    if (
      ((this.$parent = o('body')),
      (this.$container = o('.modal-wrapper')),
      (this.options = o.extend({}, o.modal.defaults, l)),
      (this.$blocker = null),
      this.options.closeExisting)
    )
      {for (; o.modal.isActive(); ) o.modal.close()}
    if (e.is('a')) {
      if (
        ((t = e.attr('href')),
        (this.anchor = e),
        (this.$elm = o(t)),
        this.$elm.length !== 1)
      )
        {return null}
      this.$elm.css('--duration', this.options.duration + 'ms'), this.open()
    } else (this.$elm = e), (this.anchor = e)
    this.options.show &&
      (this.$elm.css('--duration', this.options.duration + 'ms'), this.open())
  }),
  (o.modal.prototype = {
    constructor: o.modal,
    open () {
      s.push(this)
      const e = this
      e.block(),
      e.anchor.blur(),
      e.show(),
      o(l)
        .off('keydown.modal')
        .on('keydown.modal', function (o) {
          const e = getCurrent()
          o.which === 27 && e.options.escapeClose && e.close()
        }),
      e.options.clickClose &&
            e.$blocker.click(function (e) {
              e.target === this && o.modal.close()
            })
    },
    close () {
      s.pop(),
      this.unblock(),
      this.hide(),
      o.modal.isActive() || o(l).off('keydown.modal')
    },
    block () {
      const e = this
      e.$parent.addClass('modal-show'),
      (e.$blocker = o(
        '<div class="' + e.options.blockerClass + ' current"></div>'
      )
        .appendTo(e.$parent)
        .css('--duration', e.options.durationOverlay + 'ms')),
      setTimeout(function () {
        e.$blocker.addClass('show'), selectCurrent()
      })
    },
    unblock (e) {
      this.$blocker.children().appendTo(this.$parent),
      this.$blocker.remove(),
      (this.$blocker = null),
      selectCurrent(),
      o.modal.isActive() || this.$parent.removeClass('modal-show')
    },
    show () {
      const o = this
      o.$elm.addClass(o.options.modalClass).appendTo(o.$blocker),
      setTimeout(function () {
        o.$elm.addClass('show'), o.$elm.trigger('modal:open', [o.$elm])
      }, o.options.durationOverlay)
    },
    hide () {
      const o = this
      o.$elm.removeClass('show'),
      o.$elm.trigger('modal:before:close', [o.$elm]),
      setTimeout(function () {
        o.$elm.appendTo(o.$container),
        o.$elm.trigger('modal:close', [o.$elm])
      }, o.options.duration)
    },
    _ctx () {
      return {
        elm: this.$elm,
        $elm: this.$elm,
        $blocker: this.$blocker,
        options: this.options
      }
    }
  }),
  (o.modal.close = function (e) {
    if (o.modal.isActive()) {
      e && e.preventDefault()
      var l = getCurrent()
      return l.close(), l.$elm
    }
  }),
  (o.modal.isActive = function () {
    return s.length > 0
  }),
  (o.modal.getCurrent = getCurrent),
  (o.modal.defaults = {
    closeExisting: !1,
    escapeClose: !0,
    clickClose: !0,
    modalClass: 'modal',
    blockerClass: 'overlay',
    show: !1,
    duration: 200,
    durationOverlay: 100
  }),
  (o.fn.modal = function (e) {
    return this.length === 1 && new o.modal(this, e), this
  }),
  o(l).on('click.modal', 'a[rel~="modal:close"]', o.modal.close),
  o(l).on('click.modal', 'a[rel~="modal:open"]', function (e) {
    e.preventDefault(), o(this).modal()
  })
})

// Page Work 

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
      categoriesTitle.classList.toggle(
        'active-filters'
      ),
      categoriesTitle.nextElementSibling.classList.toggle(
        'active-filters'
      ),
      categoriesTitle.children[1].classList.toggle(
        'active-filters'
      ),
        categoriesTitle.nextElementSibling.classList.contains(
          'active-filters'
        ) || categoriesTitle.nextElementSibling.children[0].children[0].click();
    }),
    document.fonts.load('1rem "neue-haas-unica"').then(function () {
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
