$(document).ready(function() {
  'use strict';
  //loader
  setTimeout(function() {
    $('#loader').fadeOut();
  }, 1000);
  setTimeout(function() {
    $('#loader').remove();
  }, 2000);
  //Remove Splash on devices
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    /*GENERAL*/
    $('#splash').remove();
    $('#container').removeClass('blur');
  }
  //Sun
  $('#sun').click(function() {
    $('body').toggleClass('sun-active');
  });

  $('#burger').click(function () {
    $(this).toggleClass('open')
    $('#mobile-nav').slideToggle('medium', function () {
      if ($(this).is(':visible'))
        $(this).css('display', 'block')
        $('body').css('overflow', 'hidden')
    })
  })
});



let ua = navigator.userAgent;
if (ua.indexOf('Chrome/') != -1) {
  document.documentElement.classList.add('chrome');
} else if (ua.indexOf('Firefox/') != -1) {
  document.documentElement.classList.add('firefox');
}

let css = `
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
    `.trim();
let style = document.createElement('style');
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
let link = document.createElement('link');
link.rel = 'stylesheet';
document.head.appendChild(link);

let baselineBeacon = document.createElement('div');
baselineBeacon.className = 'baselineBeacon';
baselineBeacon.innerText = 'x';
document.body.appendChild(baselineBeacon);

function fmtnum(n) {
  let s = n.toFixed(2);
  if (s.substr(-3) == '.00') {
    s = s.substr(0, s.length - 3);
  }
  return s;
}

function setLabel(id, value) {
  let label = document.getElementById(id);
  label && (label.innerText = value);
}

let tapevent = 'PointerEvent' in window ? 'pointerdown' : 'click';

function bindTapableOption(msgname, fn) {
  let label = document.getElementById(msgname + '-msg');
  label && label.parentElement.addEventListener(tapevent, fn);
}

let baseline = 0;

function updateInvertedLabel() {
  let on = document.documentElement.classList.contains('inverted');
  setLabel('inverted-msg', on ? 'NNN' : 'FFF');
}

function toggleInvertedMode() {
  document.documentElement.classList.toggle('inverted');
  updateInvertedLabel();
}

function toggleSizeMode() {
  document.documentElement.classList.toggle('size-mode-relative');
  updateSizeModeLabel();
  updateComputedValueLabels();
  setTimeout(updateComputedValueLabels, 10);
}

let pointerMoveLine = null;

function togglePointerLine(on) {
  document.removeEventListener('mousemove', movePointerLine);
  document.removeEventListener('mousedown', pointerLineMouseDown);
  document.removeEventListener('mouseup', pointerLineMouseUp);
  if (on) {
    if (!pointerMoveLine) {
      pointerMoveLine = document.createElement('div');
      pointerMoveLine.className = 'pointerMoveLine';
      document.body.appendChild(pointerMoveLine);
    }
    document.addEventListener('mousemove', movePointerLine);
    document.addEventListener('mousedown', pointerLineMouseDown);
    document.addEventListener('mouseup', pointerLineMouseUp);
    pointerMoveLine.classList.add('active');
  } else if (pointerMoveLine) {
    pointerMoveLine.classList.remove('active');
  }
}

function pointerLineMouseDown() {
  pointerMoveLine.classList.add('pressed');
}

function pointerLineMouseUp() {
  pointerMoveLine.classList.remove('pressed');
}

function movePointerLine(ev) {
  let y = ev.pageY + baseline / 4;
  y = y - (y % (baseline / 2));
  pointerMoveLine.style.transform = `translate3d(0,${y - 0.5}px,0)`;
}

bindTapableOption('inverted', toggleInvertedMode);
bindTapableOption('size-mode', toggleSizeMode);

function handleKeyPress(key) {
  switch (key) {
    case 'i':
    case 'I':
      toggleInvertedMode();
      return true;
    case 's':
    case 'S':
      toggleSizeMode();
      return true;
  }
  return false;
}

document.addEventListener(
  'keypress',
  (ev) => {
    if (!ev.metaKey && !ev.ctrlKey && !ev.altKey && handleKeyPress(ev.key)) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  },
  { passive: false, capture: true }
);

let resizeTimer = null;
window.addEventListener('resize', (ev) => {
  if (resizeTimer === null) {
    resizeTimer = setTimeout(() => {
      resizeTimer = null;
      updateComputedValueLabels();
    }, 100);
  }
});

// main

updateInvertedLabel();
updateSizeModeLabel();

updateComputedValueLabels();


