
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

// $('#circle').on('click', function() {
//   document.documentElement.classList.toggle('inverted')
//   $('#circle').toggleClass('special');
//   $('.slider').toggleClass('sliderActive');
//   updateInvertedLabel();
// });

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
