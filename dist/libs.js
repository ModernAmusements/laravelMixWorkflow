/**
 * Barba js
 * The MIT License (MIT)
 * Copyright (c) 2016 Luigi De Rosa
 * APi 1.0
 */
! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("Barba", [], e) : "object" == typeof exports ? exports.Barba = e() : t.Barba = e()
}(this, function () {
    return function (t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var i = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.p = "http://localhost:8080/dist", e(0)
    }([function (t, e, n) {
        "function" != typeof Promise && (window.Promise = n(1));
        var r = {
            version: "1.0.0",
            BaseTransition: n(4),
            BaseView: n(6),
            BaseCache: n(8),
            Dispatcher: n(7),
            HistoryManager: n(9),
            Pjax: n(10),
            Prefetch: n(13),
            Utils: n(5)
        };
        t.exports = r
    }, function (t, e, n) {
        (function (e) {
            ! function (n) {
                function r() {}

                function i(t, e) {
                    return function () {
                        t.apply(e, arguments)
                    }
                }

                function o(t) {
                    if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
                    if ("function" != typeof t) throw new TypeError("not a function");
                    this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], h(t, this)
                }

                function s(t, e) {
                    for (; 3 === t._state;) t = t._value;
                    return 0 === t._state ? void t._deferreds.push(e) : (t._handled = !0, void l(function () {
                        var n = 1 === t._state ? e.onFulfilled : e.onRejected;
                        if (null === n) return void(1 === t._state ? a : c)(e.promise, t._value);
                        var r;
                        try {
                            r = n(t._value)
                        } catch (t) {
                            return void c(e.promise, t)
                        }
                        a(e.promise, r)
                    }))
                }

                function a(t, e) {
                    try {
                        if (e === t) throw new TypeError("A promise cannot be resolved with itself.");
                        if (e && ("object" == typeof e || "function" == typeof e)) {
                            var n = e.then;
                            if (e instanceof o) return t._state = 3, t._value = e, void u(t);
                            if ("function" == typeof n) return void h(i(n, e), t)
                        }
                        t._state = 1, t._value = e, u(t)
                    } catch (e) {
                        c(t, e)
                    }
                }

                function c(t, e) {
                    t._state = 2, t._value = e, u(t)
                }

                function u(t) {
                    2 === t._state && 0 === t._deferreds.length && l(function () {
                        t._handled || p(t._value)
                    });
                    for (var e = 0, n = t._deferreds.length; e < n; e++) s(t, t._deferreds[e]);
                    t._deferreds = null
                }

                function f(t, e, n) {
                    this.onFulfilled = "function" == typeof t ? t : null, this.onRejected = "function" == typeof e ? e : null, this.promise = n
                }

                function h(t, e) {
                    var n = !1;
                    try {
                        t(function (t) {
                            n || (n = !0, a(e, t))
                        }, function (t) {
                            n || (n = !0, c(e, t))
                        })
                    } catch (t) {
                        if (n) return;
                        n = !0, c(e, t)
                    }
                }
                var d = setTimeout,
                    l = "function" == typeof e && e || function (t) {
                        d(t, 0)
                    },
                    p = function (t) {
                        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", t)
                    };
                o.prototype.catch = function (t) {
                    return this.then(null, t)
                }, o.prototype.then = function (t, e) {
                    var n = new this.constructor(r);
                    return s(this, new f(t, e, n)), n
                }, o.all = function (t) {
                    var e = Array.prototype.slice.call(t);
                    return new o(function (t, n) {
                        function r(o, s) {
                            try {
                                if (s && ("object" == typeof s || "function" == typeof s)) {
                                    var a = s.then;
                                    if ("function" == typeof a) return void a.call(s, function (t) {
                                        r(o, t)
                                    }, n)
                                }
                                e[o] = s, 0 === --i && t(e)
                            } catch (t) {
                                n(t)
                            }
                        }
                        if (0 === e.length) return t([]);
                        for (var i = e.length, o = 0; o < e.length; o++) r(o, e[o])
                    })
                }, o.resolve = function (t) {
                    return t && "object" == typeof t && t.constructor === o ? t : new o(function (e) {
                        e(t)
                    })
                }, o.reject = function (t) {
                    return new o(function (e, n) {
                        n(t)
                    })
                }, o.race = function (t) {
                    return new o(function (e, n) {
                        for (var r = 0, i = t.length; r < i; r++) t[r].then(e, n)
                    })
                }, o._setImmediateFn = function (t) {
                    l = t
                }, o._setUnhandledRejectionFn = function (t) {
                    p = t
                }, "undefined" != typeof t && t.exports ? t.exports = o : n.Promise || (n.Promise = o)
            }(this)
        }).call(e, n(2).setImmediate)
    }, function (t, e, n) {
        (function (t, r) {
            function i(t, e) {
                this._id = t, this._clearFn = e
            }
            var o = n(3).nextTick,
                s = Function.prototype.apply,
                a = Array.prototype.slice,
                c = {},
                u = 0;
            e.setTimeout = function () {
                return new i(s.call(setTimeout, window, arguments), clearTimeout)
            }, e.setInterval = function () {
                return new i(s.call(setInterval, window, arguments), clearInterval)
            }, e.clearTimeout = e.clearInterval = function (t) {
                t.close()
            }, i.prototype.unref = i.prototype.ref = function () {}, i.prototype.close = function () {
                this._clearFn.call(window, this._id)
            }, e.enroll = function (t, e) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = e
            }, e.unenroll = function (t) {
                clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
            }, e._unrefActive = e.active = function (t) {
                clearTimeout(t._idleTimeoutId);
                var e = t._idleTimeout;
                e >= 0 && (t._idleTimeoutId = setTimeout(function () {
                    t._onTimeout && t._onTimeout()
                }, e))
            }, e.setImmediate = "function" == typeof t ? t : function (t) {
                var n = u++,
                    r = !(arguments.length < 2) && a.call(arguments, 1);
                return c[n] = !0, o(function () {
                    c[n] && (r ? t.apply(null, r) : t.call(null), e.clearImmediate(n))
                }), n
            }, e.clearImmediate = "function" == typeof r ? r : function (t) {
                delete c[t]
            }
        }).call(e, n(2).setImmediate, n(2).clearImmediate)
    }, function (t, e) {
        function n() {
            h && u && (h = !1, u.length ? f = u.concat(f) : d = -1, f.length && r())
        }

        function r() {
            if (!h) {
                var t = s(n);
                h = !0;
                for (var e = f.length; e;) {
                    for (u = f, f = []; ++d < e;) u && u[d].run();
                    d = -1, e = f.length
                }
                u = null, h = !1, a(t)
            }
        }

        function i(t, e) {
            this.fun = t, this.array = e
        }

        function o() {}
        var s, a, c = t.exports = {};
        ! function () {
            try {
                s = setTimeout
            } catch (t) {
                s = function () {
                    throw new Error("setTimeout is not defined")
                }
            }
            try {
                a = clearTimeout
            } catch (t) {
                a = function () {
                    throw new Error("clearTimeout is not defined")
                }
            }
        }();
        var u, f = [],
            h = !1,
            d = -1;
        c.nextTick = function (t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
            f.push(new i(t, e)), 1 !== f.length || h || s(r, 0)
        }, i.prototype.run = function () {
            this.fun.apply(null, this.array)
        }, c.title = "browser", c.browser = !0, c.env = {}, c.argv = [], c.version = "", c.versions = {}, c.on = o, c.addListener = o, c.once = o, c.off = o, c.removeListener = o, c.removeAllListeners = o, c.emit = o, c.binding = function (t) {
            throw new Error("process.binding is not supported")
        }, c.cwd = function () {
            return "/"
        }, c.chdir = function (t) {
            throw new Error("process.chdir is not supported")
        }, c.umask = function () {
            return 0
        }
    }, function (t, e, n) {
        var r = n(5),
            i = {
                oldContainer: void 0,
                newContainer: void 0,
                newContainerLoading: void 0,
                extend: function (t) {
                    return r.extend(this, t)
                },
                init: function (t, e) {
                    var n = this;
                    return this.oldContainer = t, this._newContainerPromise = e, this.deferred = r.deferred(), this.newContainerReady = r.deferred(), this.newContainerLoading = this.newContainerReady.promise, this.start(), this._newContainerPromise.then(function (t) {
                        n.newContainer = t, n.newContainerReady.resolve()
                    }), this.deferred.promise
                },
                done: function () {
                    this.oldContainer.parentNode.removeChild(this.oldContainer), this.newContainer.style.visibility = "visible", this.deferred.resolve()
                },
                start: function () {}
            };
        t.exports = i
    }, function (t, e) {
        var n = {
            getCurrentUrl: function () {
                return window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search
            },
            cleanLink: function (t) {
                return t.replace(/#.*/, "")
            },
            xhrTimeout: 5e3,
            xhr: function (t) {
                var e = this.deferred(),
                    n = new XMLHttpRequest;
                return n.onreadystatechange = function () {
                    if (4 === n.readyState) return 200 === n.status ? e.resolve(n.responseText) : e.reject(new Error("xhr: HTTP code is not 200"))
                }, n.ontimeout = function () {
                    return e.reject(new Error("xhr: Timeout exceeded"))
                }, n.open("GET", t), n.timeout = this.xhrTimeout, n.setRequestHeader("x-barba", "yes"), n.send(), e.promise
            },
            extend: function (t, e) {
                var n = Object.create(t);
                for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
                return n
            },
            deferred: function () {
                return new function () {
                    this.resolve = null, this.reject = null, this.promise = new Promise(function (t, e) {
                        this.resolve = t, this.reject = e
                    }.bind(this))
                }
            },
            getPort: function (t) {
                var e = "undefined" != typeof t ? t : window.location.port,
                    n = window.location.protocol;
                return "" != e ? parseInt(e) : "http:" === n ? 80 : "https:" === n ? 443 : void 0
            }
        };
        t.exports = n
    }, function (t, e, n) {
        var r = n(7),
            i = n(5),
            o = {
                namespace: null,
                extend: function (t) {
                    return i.extend(this, t)
                },
                init: function () {
                    var t = this;
                    r.on("initStateChange", function (e, n) {
                        n && n.namespace === t.namespace && t.onLeave()
                    }), r.on("newPageReady", function (e, n, r) {
                        t.container = r, e.namespace === t.namespace && t.onEnter()
                    }), r.on("transitionCompleted", function (e, n) {
                        e.namespace === t.namespace && t.onEnterCompleted(), n && n.namespace === t.namespace && t.onLeaveCompleted()
                    })
                },
                onEnter: function () {},
                onEnterCompleted: function () {},
                onLeave: function () {},
                onLeaveCompleted: function () {}
            };
        t.exports = o
    }, function (t, e) {
        var n = {
            events: {},
            on: function (t, e) {
                this.events[t] = this.events[t] || [], this.events[t].push(e)
            },
            off: function (t, e) {
                t in this.events != !1 && this.events[t].splice(this.events[t].indexOf(e), 1)
            },
            trigger: function (t) {
                if (t in this.events != !1)
                    for (var e = 0; e < this.events[t].length; e++) this.events[t][e].apply(this, Array.prototype.slice.call(arguments, 1))
            }
        };
        t.exports = n
    }, function (t, e, n) {
        var r = n(5),
            i = {
                data: {},
                extend: function (t) {
                    return r.extend(this, t)
                },
                set: function (t, e) {
                    this.data[t] = e
                },
                get: function (t) {
                    return this.data[t]
                },
                reset: function () {
                    this.data = {}
                }
            };
        t.exports = i
    }, function (t, e) {
        var n = {
            history: [],
            add: function (t, e) {
                e || (e = void 0), this.history.push({
                    url: t,
                    namespace: e
                })
            },
            currentStatus: function () {
                return this.history[this.history.length - 1]
            },
            prevStatus: function () {
                var t = this.history;
                return t.length < 2 ? null : t[t.length - 2]
            }
        };
        t.exports = n
    }, function (t, e, n) {
        var r = n(5),
            i = n(7),
            o = n(11),
            s = n(8),
            a = n(9),
            c = n(12),
            u = {
                Dom: c,
                History: a,
                Cache: s,
                cacheEnabled: !0,
                transitionProgress: !1,
                ignoreClassLink: "no-barba",
                start: function () {
                    this.init()
                },
                init: function () {
                    var t = this.Dom.getContainer(),
                        e = this.Dom.getWrapper();
                    e.setAttribute("aria-live", "polite"), this.History.add(this.getCurrentUrl(), this.Dom.getNamespace(t)), i.trigger("initStateChange", this.History.currentStatus()), i.trigger("newPageReady", this.History.currentStatus(), {}, t, this.Dom.currentHTML), i.trigger("transitionCompleted", this.History.currentStatus()), this.bindEvents()
                },
                bindEvents: function () {
                    document.addEventListener("click", this.onLinkClick.bind(this)), window.addEventListener("popstate", this.onStateChange.bind(this))
                },
                getCurrentUrl: function () {
                    return r.cleanLink(r.getCurrentUrl())
                },
                goTo: function (t) {
                    window.history.pushState(null, null, t), this.onStateChange()
                },
                forceGoTo: function (t) {
                    window.location = t
                },
                load: function (t) {
                    var e, n = r.deferred(),
                        i = this;
                    return e = this.Cache.get(t), e || (e = r.xhr(t), this.Cache.set(t, e)), e.then(function (t) {
                        var e = i.Dom.parseResponse(t);
                        i.Dom.putContainer(e), i.cacheEnabled || i.Cache.reset(), n.resolve(e)
                    }, function () {
                        i.forceGoTo(t), n.reject()
                    }), n.promise
                },
                getHref: function (t) {
                    if (t) return t.getAttribute && "string" == typeof t.getAttribute("xlink:href") ? t.getAttribute("xlink:href") : "string" == typeof t.href ? t.href : void 0
                },
                onLinkClick: function (t) {
                    for (var e = t.target; e && !this.getHref(e);) e = e.parentNode;
                    if (this.preventCheck(t, e)) {
                        t.stopPropagation(), t.preventDefault(), i.trigger("linkClicked", e, t);
                        var n = this.getHref(e);
                        this.goTo(n)
                    }
                },
                preventCheck: function (t, e) {
                    if (!window.history.pushState) return !1;
                    var n = this.getHref(e);
                    return !(!e || !n) && (!(t.which > 1 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey) && ((!e.target || "_blank" !== e.target) && (window.location.protocol === e.protocol && window.location.hostname === e.hostname && (r.getPort() === r.getPort(e.port) && (!(n.indexOf("#") > -1) && ((!e.getAttribute || "string" != typeof e.getAttribute("download")) && (r.cleanLink(n) != r.cleanLink(location.href) && !e.classList.contains(this.ignoreClassLink))))))))
                },
                getTransition: function () {
                    return o
                },
                onStateChange: function () {
                    var t = this.getCurrentUrl();
                    if (this.transitionProgress && this.forceGoTo(t), this.History.currentStatus().url === t) return !1;
                    this.History.add(t);
                    var e = this.load(t),
                        n = Object.create(this.getTransition());
                    this.transitionProgress = !0, i.trigger("initStateChange", this.History.currentStatus(), this.History.prevStatus());
                    var r = n.init(this.Dom.getContainer(), e);
                    e.then(this.onNewContainerLoaded.bind(this)), r.then(this.onTransitionEnd.bind(this))
                },
                onNewContainerLoaded: function (t) {
                    var e = this.History.currentStatus();
                    e.namespace = this.Dom.getNamespace(t), i.trigger("newPageReady", this.History.currentStatus(), this.History.prevStatus(), t, this.Dom.currentHTML)
                },
                onTransitionEnd: function () {
                    this.transitionProgress = !1, i.trigger("transitionCompleted", this.History.currentStatus(), this.History.prevStatus())
                }
            };
        t.exports = u
    }, function (t, e, n) {
        var r = n(4),
            i = r.extend({
                start: function () {
                    this.newContainerLoading.then(this.finish.bind(this))
                },
                finish: function () {
                    document.body.scrollTop = 0, this.done()
                }
            });
        t.exports = i
    }, function (t, e) {
        var n = {
            dataNamespace: "namespace",
            wrapperId: "barba-wrapper",
            containerClass: "barba-container",
            currentHTML: document.documentElement.innerHTML,
            parseResponse: function (t) {
                this.currentHTML = t;
                var e = document.createElement("div");
                e.innerHTML = t;
                var n = e.querySelector("title");
                return n && (document.title = n.textContent), this.getContainer(e)
            },
            getWrapper: function () {
                var t = document.getElementById(this.wrapperId);
                if (!t) throw new Error("Barba.js: wrapper not found!");
                return t
            },
            getContainer: function (t) {
                if (t || (t = document.body), !t) throw new Error("Barba.js: DOM not ready!");
                var e = this.parseContainer(t);
                if (e && e.jquery && (e = e[0]), !e) throw new Error("Barba.js: no container found");
                return e
            },
            getNamespace: function (t) {
                return t && t.dataset ? t.dataset[this.dataNamespace] : t ? t.getAttribute("data-" + this.dataNamespace) : null
            },
            putContainer: function (t) {
                t.style.visibility = "hidden";
                var e = this.getWrapper();
                e.appendChild(t)
            },
            parseContainer: function (t) {
                return t.querySelector("." + this.containerClass)
            }
        };
        t.exports = n
    }, function (t, e, n) {
        var r = n(5),
            i = n(10),
            o = {
                ignoreClassLink: "no-barba-prefetch",
                init: function () {
                    return !!window.history.pushState && (document.body.addEventListener("mouseover", this.onLinkEnter.bind(this)), void document.body.addEventListener("touchstart", this.onLinkEnter.bind(this)))
                },
                onLinkEnter: function (t) {
                    for (var e = t.target; e && !i.getHref(e);) e = e.parentNode;
                    if (e && !e.classList.contains(this.ignoreClassLink)) {
                        var n = i.getHref(e);
                        if (i.preventCheck(t, e) && !i.Cache.get(n)) {
                            var o = r.xhr(n);
                            i.Cache.set(n, o)
                        }
                    }
                }
            };
        t.exports = o
    }])
});
/**
 * @license
 * ========================================================================
 * ScrollPos-Styler v0.7.1
 * https://github.com/acch/scrollpos-styler
 * ========================================================================
 * Copyright 2015 Achim Christ
 * Licensed under MIT (https://github.com/acch/scrollpos-styler/blob/master/LICENSE)
 * ======================================================================== */
var ScrollPosStyler = function (t, r) {
    "use strict";
    var o = 0,
        a = !1,
        i = 1,
        n = "sps",
        c = t.getElementsByClassName(n),
        f = "sps--abv",
        m = "sps--blw",
        u = "data-sps-offset";

    function l(s) {
        var e = [];
        o = r.pageYOffset;
        for (var t = 0; c[t]; ++t) {
            var a = c[t],
                n = a.getAttribute(u) || i,
                l = a.classList.contains(f);
            (s || l) && n < o ? e.push({
                element: a,
                addClass: m,
                removeClass: f
            }) : (s || !l) && o <= n && e.push({
                element: a,
                addClass: f,
                removeClass: m
            })
        }
        return e
    }

    function v(s) {
        for (var e = 0; s[e]; ++e) {
            var t = s[e];
            t.element.classList.add(t.addClass), t.element.classList.remove(t.removeClass)
        }
        a = !1
    }
    var s = {
        init: function (s) {
            a = !0, s && (s.spsClass && (n = s.spsClass, c = t.getElementsByClassName(n)), i = s.scrollOffsetY || i, f = s.classAbove || f, m = s.classBelow || m, u = s.offsetTag || u);
            var e = l(!0);
            0 < e.length ? r.requestAnimationFrame(function () {
                v(e)
            }) : a = !1
        }
    };
    return t.addEventListener("DOMContentLoaded", function () {
        r.setTimeout(s.init, 1)
    }), r.addEventListener("scroll", function () {
        if (!a) {
            var s = l(!1);
            0 < s.length && (a = !0, r.requestAnimationFrame(function () {
                v(s)
            }))
        }
    }), s
}(document, window);
/**
 * jsOnlyLightbox 0.5.6
 * Copyright © 2014 Felix Hagspiel - http://jslightbox.felixhagspiel.de
 *
 * @license MIT
 * - Free for use in both personal and commercial projects
 */
"use strict";

function Lightbox() {
    function t() {
        return window.innerHeight || document.documentElement.offsetHeight
    }

    function e() {
        return window.innerWidth || document.documentElement.offsetWidth
    }

    function n(t, e, n, o) {
        t.addEventListener ? t.addEventListener(e, n, o || !1) : t.attachEvent && t.attachEvent("on" + e, n)
    }

    function o(t, e) {
        if (t && e) return new RegExp("(^|\\s)" + e + "(\\s|$)").test(t.className)
    }

    function i(t, e) {
        if (t && e) return t.className = t.className.replace(new RegExp("(?:^|\\s)" + e + "(?!\\S)"), ""), t
    }

    function r(t, e) {
        if (t && e) return o(t, e) || (t.className += " " + e), t
    }

    function a(t) {
        return void 0 !== t
    }

    function l(t, e) {
        if (!t || !a(t)) return !1;
        var n;
        return t.getAttribute ? n = t.getAttribute(e) : t.getAttributeNode && (n = t.getAttributeNode(e).value), !(!a(n) || "" === n) && n
    }

    function p(t, e) {
        if (!t || !a(t)) return !1;
        var n;
        return t.getAttribute ? n = t.getAttribute(e) : t.getAttributeNode && (n = t.getAttributeNode(e).value), "string" == typeof n
    }

    function c(t) {
        n(t, "click", function (e) {
            e.target.parentElement.parentElement.classList.toggle('lightbox-opened'), s(e), u(e), j = l(t, z + "-group") || !1, V = t, A(t, !1, !1, !1)
        }, !1)
    }

    function s(t) {
        t.stopPropagation ? t.stopPropagation() : t.returnValue = !1
    }

    function u(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1
    }

    function m(t) {
        for (var e = [], n = 0; n < W.thumbnails.length; n++) l(W.thumbnails[n], z + "-group") === t && e.push(W.thumbnails[n]);
        return e
    }

    function g(t, e) {
        for (var n = m(e), o = 0; o < n.length; o++)
            if (l(t, "src") === l(n[o], "src") && l(t, z + "-index") === l(n[o], z + "-index") && l(t, z) === l(n[o], z)) return o
    }

    function d() {
        if (j) {
            var t = new Image,
                e = new Image,
                n = g(V, j);
            n === P.length - 1 ? (t.src = l(P[P.length - 1], z) || P[P.length - 1].src, e.src = l(P[0].src, z) || P[0].src) : 0 === n ? (t.src = l(P[P.length - 1], z) || P[P.length - 1].src, e.src = l(P[1], z) || P[1].src) : (t.src = l(P[n - 1], z) || P[n - 1].src, e.src = l(P[n + 1], z) || P[n + 1].src)
        }
    }

    function f() {
        if (!M) {
            h();
            var t = function () {
                if (r(W.box, O + "-loading"), !N && "number" == typeof W.opt.loadingAnimation) {
                    var t = 0;
                    w = setInterval(function () {
                        r(q[t], O + "-active"), setTimeout(function () {
                            i(q[t], O + "-active")
                        }, W.opt.loadingAnimation), t = t >= q.length ? 0 : t += 1
                    }, W.opt.loadingAnimation)
                }
            };
            I = setTimeout(t, 500)
        }
    }

    function h() {
        if (!M && (i(W.box, O + "-loading"), !N && "string" != typeof W.opt.loadingAnimation && W.opt.loadingAnimation)) {
            clearInterval(w);
            for (var t = 0; t < q.length; t++) i(q[t], O + "-active")
        }
    }

    function v() {
        if (!X) {
            if (X = document.createElement("span"), r(X, O + "-next"), W.opt.nextImg) {
                var t = document.createElement("img");
                t.setAttribute("src", W.opt.nextImg), X.appendChild(t)
            } else r(X, O + "-no-img");
            n(X, "click", function (t) {
                s(t), W.next()
            }, !1), W.box.appendChild(X)
        }
        if (r(X, O + "-active"), !$) {
            if ($ = document.createElement("span"), r($, O + "-prev"), W.opt.prevImg) {
                var e = document.createElement("img");
                e.setAttribute("src", W.opt.prevImg), $.appendChild(e)
            } else r($, O + "-no-img");
            n($, "click", function (t) {
                s(t), W.prev()
            }, !1), W.box.appendChild($)
        }
        r($, O + "-active")
    }

    function b() {
        if (W.opt.responsive && X && $) {
            var e = t() / 2 - X.offsetHeight / 2;
            X.style.top = e + "px", $.style.top = e + "px"
        }
    }

    function x(t) {
        function e(t) {
            return "boolean" != typeof t || t
        }
        if (t || (t = {}), W.opt = {
                boxId: t.boxId || !1,
                controls: e(t.controls),
                dimensions: e(t.dimensions),
                captions: e(t.captions),
                prevImg: "string" == typeof t.prevImg && t.prevImg,
                nextImg: "string" == typeof t.nextImg && t.nextImg,
                hideCloseBtn: t.hideCloseBtn || !1,
                closeOnClick: "boolean" != typeof t.closeOnClick || t.closeOnClick,
                nextOnClick: e(t.nextOnClick),
                loadingAnimation: void 0 === t.loadingAnimation || t.loadingAnimation,
                animElCount: t.animElCount || 4,
                preload: e(t.preload),
                carousel: e(t.carousel),
                animation: "number" == typeof t.animation || !1 === t.animation ? t.animation : 400,
                responsive: e(t.responsive),
                maxImgSize: t.maxImgSize || .8,
                keyControls: e(t.keyControls),
                hideOverflow: t.hideOverflow || !0,
                onopen: t.onopen || !1,
                onclose: t.onclose || !1,
                onload: t.onload || !1,
                onresize: t.onresize || !1,
                onloaderror: t.onloaderror || !1,
                onimageclick: "function" == typeof t.onimageclick && t.onimageclick
            }, W.opt.boxId) {
            W.box = document.getElementById(W.opt.boxId);
            var o = W.box.getAttribute("class");
            o.search(O + " ") < 0 && W.box.setAttribute("class", o + " " + O)
        } else if (!W.box) {
            var a = document.getElementById(T);
            a || (a = document.createElement("div")), a.setAttribute("id", T), a.setAttribute("class", O), W.box = a, S.appendChild(W.box)
        }
        if (W.box.innerHTML = B, M && r(W.box, O + "-ie8"), W.wrapper = document.getElementById(T + "-contentwrapper"), !W.opt.hideCloseBtn) {
            var l = document.createElement("span");
            l.setAttribute("id", T + "-close"), l.setAttribute("class", O + "-close"), l.innerHTML = "Close", W.box.appendChild(l), n(l, "click", function (t) {
                s(t), W.close()
            }, !1)
        }
        if (!M && W.opt.closeOnClick && n(W.box, "click", function (t) {
                s(t), W.close()
            }, !1), "string" == typeof W.opt.loadingAnimation)(y = document.createElement("img")).setAttribute("src", W.opt.loadingAnimation), r(y, O + "-loading-animation"), W.box.appendChild(y);
        else if (W.opt.loadingAnimation) {
            W.opt.loadingAnimation = "number" == typeof W.opt.loadingAnimation ? W.opt.loadingAnimation : 200, r(y = document.createElement("div"), O + "-loading-animation");
            for (var p = 0; p < W.opt.animElCount;) q.push(y.appendChild(document.createElement("span"))), p++;
            W.box.appendChild(y)
        }
        W.opt.responsive ? (n(window, "resize", function () {
            W.resize()
        }, !1), r(W.box, O + "-nooverflow")) : i(W.box, O + "-nooverflow"), W.opt.keyControls && n(document, "keydown", function (t) {
            R && (s(t), 39 === t.keyCode ? W.next() : 37 === t.keyCode ? W.prev() : 27 === t.keyCode && W.close())
        }, !1)
    }

    function A(t, e, i, p) {
        if (!t && !e) return !1;
        (j = e || j || l(t, z + "-group")) && (P = m(j), "boolean" != typeof t || t || (t = P[0])), D.img = new Image, V = t;
        var c;
        c = "string" == typeof t ? t : l(t, z) ? l(t, z) : l(t, "src"), L = !1, R || ("number" == typeof W.opt.animation && r(D.img, O + "-animate-transition " + O + "-animate-init"), R = !0, W.opt.onopen && W.opt.onopen(D)), W.opt && a(W.opt.hideOverflow) && !W.opt.hideOverflow || S.setAttribute("data-lightbox", "on"), W.box.setAttribute("style", "padding-top: 0"), W.wrapper.innerHTML = "", W.wrapper.appendChild(D.img), W.opt.animation && r(W.wrapper, O + "-animate");
        var u = l(t, z + "-caption");
        if (u && W.opt.captions) {
            var g = document.createElement("p");
            g.setAttribute("class", O + "-caption"), g.innerHTML = u, W.wrapper.appendChild(g)
        }
        r(W.box, O + "-active"), M && r(W.wrapper, O + "-active"), W.opt.controls && P.length > 1 && (v(), b()), D.img.onerror = function (t) {
            W.opt.onloaderror && (t._happenedWhile = p || !1, W.opt.onloaderror(t))
        }, D.img.onload = function () {
            if (D.originalWidth = this.naturalWidth || this.width, D.originalHeight = this.naturalHeight || this.height, M || N) {
                var t = new Image;
                t.setAttribute("src", c), D.originalWidth = t.width, D.originalHeight = t.height
            }
            var e = setInterval(function () {
                o(W.box, O + "-active") && (r(W.wrapper, O + "-wrapper-active"), "number" == typeof W.opt.animation && r(D.img, O + "-animate-transition"), i && i(), h(), clearTimeout(I), W.opt.preload && d(), W.opt.nextOnClick && (r(D.img, O + "-next-on-click"), n(D.img, "click", function (t) {
                    s(t), W.next()
                }, !1)), W.opt.onimageclick && n(D.img, "click", function (t) {
                    s(t), W.opt.onimageclick(D)
                }, !1), W.opt.onload && W.opt.onload(p), clearInterval(e), W.resize())
            }, 10)
        }, D.img.setAttribute("src", c), f()
    }
    var y, w, I, C, k, E, H, O = "jslghtbx",
        T = "jslghtbx",
        z = "data-jslghtbx",
        W = this,
        M = !1,
        N = !1,
        S = document.getElementsByTagName("body")[0],
        B = '<div class="jslghtbx-contentwrapper" id="jslghtbx-contentwrapper" ></div>',
        L = !1,
        j = !1,
        V = !1,
        D = {},
        P = [],
        R = !1,
        q = [],
        X = !1,
        $ = !1;
    W.opt = {}, W.box = !1, W.wrapper = !1, W.thumbnails = [], W.thumbnails.push = function () {
        for (var t = 0, e = arguments.length; t < e; t++) c(arguments[t]);
        return Array.prototype.push.apply(this, arguments)
    }, W.load = function (t) {
        navigator.appVersion.indexOf("MSIE 8") > 0 && (M = !0), navigator.appVersion.indexOf("MSIE 9") > 0 && (N = !0), x(t);
        for (var e = document.querySelectorAll("[" + z + "]"), n = 0; n < e.length; n++) p(e[n], z) && (e[n].setAttribute(z + "-index", n), W.thumbnails.push(e[n]))
    }, W.open = function (t, e) {
        t && e && (e = !1), A(t, e, !1, !1)
    }, W.resize = function () {
        if (D.img) {
            C = e(), k = t();
            var n = W.box.offsetWidth,
                o = W.box.offsetHeight;
            !L && D.img && D.img.offsetWidth && D.img.offsetHeight && (L = D.img.offsetWidth / D.img.offsetHeight), Math.floor(n / L) > o ? (E = o * L, H = o) : (E = n, H = n / L), E = Math.floor(E * W.opt.maxImgSize), H = Math.floor(H * W.opt.maxImgSize), (W.opt.dimensions && H > D.originalHeight || W.opt.dimensions && E > D.originalWidth) && (H = D.originalHeight, E = D.originalWidth), D.img.setAttribute("width", E), D.img.setAttribute("height", H), D.img.setAttribute("style", "margin-top:" + (t() - H) / 2 + "px"), setTimeout(b, 200), W.opt.onresize && W.opt.onresize(D)
        }
    }, W.next = function () {
        if (j) {
            var t = g(V, j) + 1;
            if (P[t]) V = P[t];
            else {
                if (!W.opt.carousel) return;
                V = P[0]
            }
            "number" == typeof W.opt.animation ? (i(D.img, O + "-animating-next"), setTimeout(function () {
                A(V, !1, function () {
                    setTimeout(function () {
                        r(D.img, O + "-animating-next")
                    }, W.opt.animation / 2)
                }, "next")
            }, W.opt.animation / 2)) : A(V, !1, !1, "next")
        }
    }, W.prev = function () {
        if (j) {
            var t = g(V, j) - 1;
            if (P[t]) V = P[t];
            else {
                if (!W.opt.carousel) return;
                V = P[P.length - 1]
            }
            "number" == typeof W.opt.animation ? (i(D.img, O + "-animating-prev"), setTimeout(function () {
                A(V, !1, function () {
                    setTimeout(function () {
                        r(D.img, O + "-animating-next")
                    }, W.opt.animation / 2)
                }, "prev")
            }, W.opt.animation / 2)) : A(V, !1, !1, "prev")
        }
    }, W.close = function () {
        j = !1, V = !1;
        var t = D;
        D = {}, P = [], R = !1, i(W.box, O + "-active"), i(W.wrapper, O + "-wrapper-active"), i(X, O + "-active"), i($, O + "-active"), W.box.setAttribute("style", "padding-top: 0px"), h(), M && W.box.setAttribute("style", "display: none"), W.opt && a(W.opt.hideOverflow) && !W.opt.hideOverflow || S.setAttribute("data-lightbox", "off"), W.opt.onclose && W.opt.onclose(t)
    }
}
// detect swipe
function swipedetect(el, callback) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 100, //required min distance traveled to be considered swipe
        restraint = 100, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 300, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) {}

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        // e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}
