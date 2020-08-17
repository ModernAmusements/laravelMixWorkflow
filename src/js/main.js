
let inverted = localStorage.getItem('inverted')
const invertedToggle = document.querySelector('#circle')
const slider = document.querySelector('.sliderToggle')

const userAgent = navigator.userAgent
if (userAgent.indexOf('Chrome/') != -1) {
  document.documentElement.classList.add('chrome')
} else if (userAgent.indexOf('Firefox/') != -1) {
  document.documentElement.classList.add('firefox')
}

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

function handleKeyPress (key) {
  switch (key) {
    case 'i':
    case 'I':
      toggleInvertedMode()
      return true
  }
  return false
}

document.addEventListener(
  'keypress',
  (ev) => {
    if (!ev.metaKey && !ev.ctrlKey && !ev.altKey && handleKeyPress(ev.key)) {
      ev.preventDefault()
      ev.stopPropagation()
    }
  },
  { passive: false, capture: true }
)

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
