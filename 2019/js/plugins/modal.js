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
