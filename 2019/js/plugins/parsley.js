/*!
 * Parsley.js
 * Version 2.8.1 - built Sat, Feb 3rd 2018, 2:27 pm
 * http://parsleyjs.org
 * Guillaume Potier - <guillaume@wisembly.com>
 * Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
 * MIT Licensed
 */
function _toConsumableArray(r) {
    if (Array.isArray(r)) {
        for (var s = 0, a = Array(r.length); s < r.length; s++) a[s] = r[s];
        return a
    }
    return Array.from(r)
}
var _slice = Array.prototype.slice,
    _slicedToArray = function(r, s) {
        if (Array.isArray(r)) return r;
        if (Symbol.iterator in Object(r)) return function e(r, s) {
            var a = [],
                o = !0,
                u = !1,
                c = void 0;
            try {
                for (var y, _ = r[Symbol.iterator](); !(o = (y = _.next()).done) && (a.push(y.value), !s || a.length !== s); o = !0);
            } catch (r) {
                u = !0, c = r
            } finally {
                try {
                    !o && _.return && _.return()
                } finally {
                    if (u) throw c
                }
            }
            return a
        }(r, s);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    },
    _extends = Object.assign || function(r) {
        for (var s = 1; s < arguments.length; s++) {
            var a = arguments[s];
            for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (r[o] = a[o])
        }
        return r
    };
! function(r, s) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = s(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], s) : r.parsley = s(r.jQuery)
}(this, (function(r) {
    "use strict";

    function t(r, s) {
        return r.parsleyAdaptedCallback || (r.parsleyAdaptedCallback = function() {
            var a = Array.prototype.slice.call(arguments, 0);
            a.unshift(this), r.apply(s || O, a)
        }), r.parsleyAdaptedCallback
    }

    function i(r) {
        return 0 === r.lastIndexOf(D, 0) ? r.substr(D.length) : r
    }
    /**
     * inputevent - Alleviate browser bugs for input events
     * https://github.com/marcandre/inputevent
     * @version v0.0.3 - (built Thu, Apr 14th 2016, 5:58 pm)
     * @author Marc-Andre Lafortune <github@marc-andre.ca>
     * @license MIT
     */
    var s = 1,
        a = {},
        o = {
            attr: function(r, s, a) {
                var o, u, c, y = new RegExp("^" + s, "i");
                if (void 0 === a) a = {};
                else
                    for (o in a) a.hasOwnProperty(o) && delete a[o];
                if (!r) return a;
                for (o = (c = r.attributes).length; o--;)(u = c[o]) && u.specified && y.test(u.name) && (a[this.camelize(u.name.slice(s.length))] = this.deserializeValue(u.value));
                return a
            },
            checkAttr: function(r, s, a) {
                return r.hasAttribute(s + a)
            },
            setAttr: function(r, s, a, o) {
                r.setAttribute(this.dasherize(s + a), String(o))
            },
            getType: function(r) {
                return r.getAttribute("type") || "text"
            },
            generateID: function() {
                return "" + s++
            },
            deserializeValue: function(r) {
                var s;
                try {
                    return r ? "true" == r || "false" != r && ("null" == r ? null : isNaN(s = Number(r)) ? /^[\[\{]/.test(r) ? JSON.parse(r) : r : s) : r
                } catch (s) {
                    return r
                }
            },
            camelize: function(r) {
                return r.replace(/-+(.)?/g, (function(r, s) {
                    return s ? s.toUpperCase() : ""
                }))
            },
            dasherize: function(r) {
                return r.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            },
            warn: function() {
                var r;
                window.console && "function" == typeof window.console.warn && (r = window.console).warn.apply(r, arguments)
            },
            warnOnce: function(r) {
                a[r] || (a[r] = !0, this.warn.apply(this, arguments))
            },
            _resetWarnings: function() {
                a = {}
            },
            trimString: function(r) {
                return r.replace(/^\s+|\s+$/g, "")
            },
            parse: {
                date: function S(r) {
                    var s = r.match(/^(\d{4,})-(\d\d)-(\d\d)$/);
                    if (!s) return null;
                    var a = s.map((function(r) {
                            return parseInt(r, 10)
                        })),
                        o = _slicedToArray(a, 4),
                        u = (o[0], o[1]),
                        c = o[2],
                        y = o[3],
                        S = new Date(u, c - 1, y);
                    return S.getFullYear() !== u || S.getMonth() + 1 !== c || S.getDate() !== y ? null : S
                },
                string: function(r) {
                    return r
                },
                integer: function(r) {
                    return isNaN(r) ? null : parseInt(r, 10)
                },
                number: function(r) {
                    if (isNaN(r)) throw null;
                    return parseFloat(r)
                },
                boolean: function(r) {
                    return !/^\s*false\s*$/i.test(r)
                },
                object: function(r) {
                    return o.deserializeValue(r)
                },
                regexp: function(r) {
                    var s = "";
                    return /^\/.*\/(?:[gimy]*)$/.test(r) ? (s = r.replace(/.*\/([gimy]*)$/, "$1"), r = r.replace(new RegExp("^/(.*?)/" + s + "$"), "$1")) : r = "^" + r + "$", new RegExp(r, s)
                }
            },
            parseRequirement: function(r, s) {
                var a = this.parse[r || "string"];
                if (!a) throw 'Unknown requirement specification: "' + r + '"';
                var o = a(s);
                if (null === o) throw "Requirement is not a " + r + ': "' + s + '"';
                return o
            },
            namespaceEvents: function(s, a) {
                return (s = this.trimString(s || "").split(/\s+/))[0] ? r.map(s, (function(r) {
                    return r + "." + a
                })).join(" ") : ""
            },
            difference: function(s, a) {
                var o = [];
                return r.each(s, (function(r, s) {
                    -1 == a.indexOf(s) && o.push(s)
                })), o
            },
            all: function(s) {
                return r.when.apply(r, _toConsumableArray(s).concat([42, 42]))
            },
            objectCreate: Object.create || function() {
                var e = function() {};
                return function(r) {
                    if (arguments.length > 1) throw Error("Second argument not supported");
                    if ("object" != typeof r) throw TypeError("Argument must be an object");
                    e.prototype = r;
                    var s = new e;
                    return e.prototype = null, s
                }
            }(),
            _SubmitSelector: 'input[type="submit"], button:submit'
        },
        u = {
            namespace: "data-parsley-",
            inputs: "input, textarea, select",
            excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]",
            priorityEnabled: !0,
            multiple: null,
            group: null,
            uiEnabled: !0,
            validationThreshold: 3,
            focus: "first",
            trigger: !1,
            triggerAfterFailure: "input",
            errorClass: "parsley-error",
            successClass: "parsley-success",
            classHandler: function(r) {},
            errorsContainer: function(r) {},
            errorsWrapper: '<ul class="parsley-errors-list"></ul>',
            errorTemplate: "<li></li>"
        },
        l = function() {
            this.__id__ = o.generateID()
        };
    l.prototype = {
        asyncSupport: !0,
        _pipeAccordingToValidationResult: function() {
            var s = this,
                i = function() {
                    var a = r.Deferred();
                    return !0 !== s.validationResult && a.reject(), a.resolve().promise()
                };
            return [i, i]
        },
        actualizeOptions: function() {
            return o.attr(this.element, this.options.namespace, this.domOptions), this.parent && this.parent.actualizeOptions && this.parent.actualizeOptions(), this
        },
        _resetOptions: function(r) {
            for (var s in this.domOptions = o.objectCreate(this.parent.options), this.options = o.objectCreate(this.domOptions), r) r.hasOwnProperty(s) && (this.options[s] = r[s]);
            this.actualizeOptions()
        },
        _listeners: null,
        on: function(r, s) {
            return this._listeners = this._listeners || {}, (this._listeners[r] = this._listeners[r] || []).push(s), this
        },
        subscribe: function(s, a) {
            r.listenTo(this, s.toLowerCase(), a)
        },
        off: function(r, s) {
            var a = this._listeners && this._listeners[r];
            if (a)
                if (s)
                    for (var o = a.length; o--;) a[o] === s && a.splice(o, 1);
                else delete this._listeners[r];
            return this
        },
        unsubscribe: function(s, a) {
            r.unsubscribeTo(this, s.toLowerCase())
        },
        trigger: function(r, s, a) {
            s = s || this;
            var o, u = this._listeners && this._listeners[r];
            if (u)
                for (var c = u.length; c--;)
                    if (!1 === (o = u[c].call(s, s, a))) return o;
            return !this.parent || this.parent.trigger(r, s, a)
        },
        asyncIsValid: function(r, s) {
            return o.warnOnce("asyncIsValid is deprecated; please use whenValid instead"), this.whenValid({
                group: r,
                force: s
            })
        },
        _findRelated: function() {
            return this.options.multiple ? r(this.parent.element.querySelectorAll("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]')) : this.$element
        }
    };
    var h = function(s) {
        r.extend(!0, this, s)
    };
    h.prototype = {
        validate: function(r, s) {
            if (this.fn) return arguments.length > 3 && (s = [].slice.call(arguments, 1, -1)), this.fn(r, s);
            if (Array.isArray(r)) {
                if (!this.validateMultiple) throw "Validator `" + this.name + "` does not handle multiple values";
                return this.validateMultiple.apply(this, arguments)
            }
            var a = arguments[arguments.length - 1];
            if (this.validateDate && a._isDateInput()) return arguments[0] = o.parse.date(arguments[0]), null !== arguments[0] && this.validateDate.apply(this, arguments);
            if (this.validateNumber) return !isNaN(r) && (arguments[0] = parseFloat(arguments[0]), this.validateNumber.apply(this, arguments));
            if (this.validateString) return this.validateString.apply(this, arguments);
            throw "Validator `" + this.name + "` only handles multiple values"
        },
        parseRequirements: function(s, a) {
            if ("string" != typeof s) return Array.isArray(s) ? s : [s];
            var u = this.requirementType;
            if (Array.isArray(u)) {
                for (var c = function(r, s) {
                        var a = r.match(/^\s*\[(.*)\]\s*$/);
                        if (!a) throw 'Requirement is not an array: "' + r + '"';
                        var u = a[1].split(",").map(o.trimString);
                        if (u.length !== s) throw "Requirement has " + u.length + " values when " + s + " are needed";
                        return u
                    }(s, u.length), y = 0; y < c.length; y++) c[y] = o.parseRequirement(u[y], c[y]);
                return c
            }
            return r.isPlainObject(u) ? function(r, s, a) {
                var u = null,
                    c = {};
                for (var y in r)
                    if (y) {
                        var _ = a(y);
                        "string" == typeof _ && (_ = o.parseRequirement(r[y], _)), c[y] = _
                    } else u = o.parseRequirement(r[y], s);
                return [u, c]
            }(u, s, a) : [o.parseRequirement(u, s)]
        },
        requirementType: "string",
        priority: 2
    };
    var p = function(r, s) {
            this.__class__ = "ValidatorRegistry", this.locale = "en", this.init(r || {}, s || {})
        },
        c = {
            email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/,
            number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i,
            integer: /^-?\d+$/,
            digits: /^\d+$/,
            alphanum: /^\w+$/i,
            date: {
                test: function(r) {
                    return null !== o.parse.date(r)
                }
            },
            url: new RegExp("^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-zA-Z\\u00a1-\\uffff0-9]-*)*[a-zA-Z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-zA-Z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$")
        };
    c.range = c.number;
    var f = function(r) {
            var s = ("" + r).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
            return s ? Math.max(0, (s[1] ? s[1].length : 0) - (s[2] ? +s[2] : 0)) : 0
        },
        m = function(r, s) {
            return s.map(o.parse[r])
        },
        g = function(r, s) {
            return function(a) {
                for (var o = arguments.length, u = Array(o > 1 ? o - 1 : 0), c = 1; c < o; c++) u[c - 1] = arguments[c];
                return u.pop(), s.apply(void 0, [a].concat(_toConsumableArray(m(r, u))))
            }
        },
        v = function(r) {
            return {
                validateDate: g("date", r),
                validateNumber: g("number", r),
                requirementType: r.length <= 2 ? "string" : ["string", "string"],
                priority: 30
            }
        };
    p.prototype = {
        init: function(r, s) {
            for (var a in this.catalog = s, this.validators = _extends({}, this.validators), r) this.addValidator(a, r[a].fn, r[a].priority);
            window.Parsley.trigger("parsley:validator:init")
        },
        setLocale: function(r) {
            if (void 0 === this.catalog[r]) throw new Error(r + " is not available in the catalog");
            return this.locale = r, this
        },
        addCatalog: function(r, s, a) {
            return "object" == typeof s && (this.catalog[r] = s), !0 === a ? this.setLocale(r) : this
        },
        addMessage: function(r, s, a) {
            return void 0 === this.catalog[r] && (this.catalog[r] = {}), this.catalog[r][s] = a, this
        },
        addMessages: function(r, s) {
            for (var a in s) this.addMessage(r, a, s[a]);
            return this
        },
        addValidator: function(r, s, a) {
            if (this.validators[r]) o.warn('Validator "' + r + '" is already defined.');
            else if (u.hasOwnProperty(r)) return void o.warn('"' + r + '" is a restricted keyword and is not a valid validator name.');
            return this._setValidator.apply(this, arguments)
        },
        hasValidator: function(r) {
            return !!this.validators[r]
        },
        updateValidator: function(r, s, a) {
            return this.validators[r] ? this._setValidator.apply(this, arguments) : (o.warn('Validator "' + r + '" is not already defined.'), this.addValidator.apply(this, arguments))
        },
        removeValidator: function(r) {
            return this.validators[r] || o.warn('Validator "' + r + '" is not defined.'), delete this.validators[r], this
        },
        _setValidator: function(r, s, a) {
            for (var o in "object" != typeof s && (s = {
                    fn: s,
                    priority: a
                }), s.validate || (s = new h(s)), this.validators[r] = s, s.messages || {}) this.addMessage(o, r, s.messages[o]);
            return this
        },
        getErrorMessage: function(r) {
            var s;
            "type" === r.name ? s = (this.catalog[this.locale][r.name] || {})[r.requirements] : s = this.formatMessage(this.catalog[this.locale][r.name], r.requirements);
            return s || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage
        },
        formatMessage: function(r, s) {
            if ("object" == typeof s) {
                for (var a in s) r = this.formatMessage(r, s[a]);
                return r
            }
            return "string" == typeof r ? r.replace(/%s/i, s) : ""
        },
        validators: {
            notblank: {
                validateString: function(r) {
                    return /\S/.test(r)
                },
                priority: 2
            },
            required: {
                validateMultiple: function(r) {
                    return r.length > 0
                },
                validateString: function(r) {
                    return /\S/.test(r)
                },
                priority: 512
            },
            type: {
                validateString: function(r, s) {
                    var a = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
                        o = a.step,
                        u = void 0 === o ? "any" : o,
                        y = a.base,
                        _ = void 0 === y ? 0 : y,
                        b = c[s];
                    if (!b) throw new Error("validator type `" + s + "` is not supported");
                    if (!b.test(r)) return !1;
                    if ("number" === s && !/^any$/i.test(u || "")) {
                        var C = Number(r),
                            E = Math.max(f(u), f(_));
                        if (f(C) > E) return !1;
                        var d = function(r) {
                            return Math.round(r * Math.pow(10, E))
                        };
                        if ((d(C) - d(_)) % d(u) != 0) return !1
                    }
                    return !0
                },
                requirementType: {
                    "": "string",
                    step: "string",
                    base: "number"
                },
                priority: 256
            },
            pattern: {
                validateString: function(r, s) {
                    return s.test(r)
                },
                requirementType: "regexp",
                priority: 64
            },
            minlength: {
                validateString: function(r, s) {
                    return r.length >= s
                },
                requirementType: "integer",
                priority: 30
            },
            maxlength: {
                validateString: function(r, s) {
                    return r.length <= s
                },
                requirementType: "integer",
                priority: 30
            },
            length: {
                validateString: function(r, s, a) {
                    return r.length >= s && r.length <= a
                },
                requirementType: ["integer", "integer"],
                priority: 30
            },
            mincheck: {
                validateMultiple: function(r, s) {
                    return r.length >= s
                },
                requirementType: "integer",
                priority: 30
            },
            maxcheck: {
                validateMultiple: function(r, s) {
                    return r.length <= s
                },
                requirementType: "integer",
                priority: 30
            },
            check: {
                validateMultiple: function(r, s, a) {
                    return r.length >= s && r.length <= a
                },
                requirementType: ["integer", "integer"],
                priority: 30
            },
            min: v((function(r, s) {
                return r >= s
            })),
            max: v((function(r, s) {
                return r <= s
            })),
            range: v((function(r, s, a) {
                return r >= s && r <= a
            })),
            equalto: {
                validateString: function(s, a) {
                    var o = r(a);
                    return o.length ? s === o.val() : s === a
                },
                priority: 256
            }
        }
    };
    var y = {};
    y.Form = {
        _actualizeTriggers: function() {
            var r = this;
            this.$element.on("submit.Parsley", (function(s) {
                r.onSubmitValidate(s)
            })), this.$element.on("click.Parsley", o._SubmitSelector, (function(s) {
                r.onSubmitButton(s)
            })), !1 !== this.options.uiEnabled && this.element.setAttribute("novalidate", "")
        },
        focus: function() {
            if (this._focusedField = null, !0 === this.validationResult || "none" === this.options.focus) return null;
            for (var r = 0; r < this.fields.length; r++) {
                var s = this.fields[r];
                if (!0 !== s.validationResult && s.validationResult.length > 0 && void 0 === s.options.noFocus && (this._focusedField = s.$element, "first" === this.options.focus)) break
            }
            return null === this._focusedField ? null : this._focusedField.focus()
        },
        _destroyUI: function() {
            this.$element.off(".Parsley")
        }
    }, y.Field = {
        _reflowUI: function() {
            if (this._buildUI(), this._ui) {
                var r = function k(r, s, a) {
                    for (var o = [], u = [], c = 0; c < r.length; c++) {
                        for (var y = !1, _ = 0; _ < s.length; _++)
                            if (r[c].assert.name === s[_].assert.name) {
                                y = !0;
                                break
                            }
                        y ? u.push(r[c]) : o.push(r[c])
                    }
                    return {
                        kept: u,
                        added: o,
                        removed: a ? [] : k(s, r, !0).added
                    }
                }(this.validationResult, this._ui.lastValidationResult);
                this._ui.lastValidationResult = this.validationResult, this._manageStatusClass(), this._manageErrorsMessages(r), this._actualizeTriggers(), !r.kept.length && !r.added.length || this._failedOnce || (this._failedOnce = !0, this._actualizeTriggers())
            }
        },
        getErrorsMessages: function() {
            if (!0 === this.validationResult) return [];
            for (var r = [], s = 0; s < this.validationResult.length; s++) r.push(this.validationResult[s].errorMessage || this._getErrorMessage(this.validationResult[s].assert));
            return r
        },
        addError: function(r) {
            var s = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                a = s.message,
                o = s.assert,
                u = s.updateClass,
                c = void 0 === u || u;
            this._buildUI(), this._addError(r, {
                message: a,
                assert: o
            }), c && this._errorClass()
        },
        updateError: function(r) {
            var s = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                a = s.message,
                o = s.assert,
                u = s.updateClass,
                c = void 0 === u || u;
            this._buildUI(), this._updateError(r, {
                message: a,
                assert: o
            }), c && this._errorClass()
        },
        removeError: function(r) {
            var s = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                a = s.updateClass,
                o = void 0 === a || a;
            this._buildUI(), this._removeError(r), o && this._manageStatusClass()
        },
        _manageStatusClass: function() {
            this.hasConstraints() && this.needsValidation() && !0 === this.validationResult ? this._successClass() : this.validationResult.length > 0 ? this._errorClass() : this._resetClass()
        },
        _manageErrorsMessages: function(s) {
            if (void 0 === this.options.errorsMessagesDisabled) {
                if (void 0 !== this.options.errorMessage) return s.added.length || s.kept.length ? (this._insertErrorWrapper(), 0 === this._ui.$errorsWrapper.find(".parsley-custom-error-message").length && this._ui.$errorsWrapper.append(r(this.options.errorTemplate).addClass("parsley-custom-error-message")), this._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(this.options.errorMessage)) : this._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();
                for (var a = 0; a < s.removed.length; a++) this._removeError(s.removed[a].assert.name);
                for (a = 0; a < s.added.length; a++) this._addError(s.added[a].assert.name, {
                    message: s.added[a].errorMessage,
                    assert: s.added[a].assert
                });
                for (a = 0; a < s.kept.length; a++) this._updateError(s.kept[a].assert.name, {
                    message: s.kept[a].errorMessage,
                    assert: s.kept[a].assert
                })
            }
        },
        _addError: function(s, a) {
            var o = a.message,
                u = a.assert;
            this._insertErrorWrapper(), this._ui.$errorClassHandler.attr("aria-describedby", this._ui.errorsWrapperId), this._ui.$errorsWrapper.addClass("filled").append(r(this.options.errorTemplate).addClass("parsley-" + s).html(o || this._getErrorMessage(u)))
        },
        _updateError: function(r, s) {
            var a = s.message,
                o = s.assert;
            this._ui.$errorsWrapper.addClass("filled").find(".parsley-" + r).html(a || this._getErrorMessage(o))
        },
        _removeError: function(r) {
            this._ui.$errorClassHandler.removeAttr("aria-describedby"), this._ui.$errorsWrapper.removeClass("filled").find(".parsley-" + r).remove()
        },
        _getErrorMessage: function(r) {
            var s = r.name + "Message";
            return void 0 !== this.options[s] ? window.Parsley.formatMessage(this.options[s], r.requirements) : window.Parsley.getErrorMessage(r)
        },
        _buildUI: function() {
            if (!this._ui && !1 !== this.options.uiEnabled) {
                var s = {};
                this.element.setAttribute(this.options.namespace + "id", this.__id__), s.$errorClassHandler = this._manageClassHandler(), s.errorsWrapperId = "parsley-id-" + (this.options.multiple ? "multiple-" + this.options.multiple : this.__id__), s.$errorsWrapper = r(this.options.errorsWrapper).attr("id", s.errorsWrapperId), s.lastValidationResult = [], s.validationInformationVisible = !1, this._ui = s
            }
        },
        _manageClassHandler: function() {
            if ("string" == typeof this.options.classHandler && r(this.options.classHandler).length) return r(this.options.classHandler);
            var s = this.options.classHandler;
            if ("string" == typeof this.options.classHandler && "function" == typeof window[this.options.classHandler] && (s = window[this.options.classHandler]), "function" == typeof s) {
                var a = s.call(this, this);
                if (void 0 !== a && a.length) return a
            } else {
                if ("object" == typeof s && s instanceof jQuery && s.length) return s;
                s && o.warn("The class handler `" + s + "` does not exist in DOM nor as a global JS function")
            }
            return this._inputHolder()
        },
        _inputHolder: function() {
            return this.options.multiple && "SELECT" !== this.element.nodeName ? this.$element.parent() : this.$element
        },
        _insertErrorWrapper: function() {
            var s = this.options.errorsContainer;
            if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();
            if ("string" == typeof s) {
                if (r(s).length) return r(s).append(this._ui.$errorsWrapper);
                "function" == typeof window[s] ? s = window[s] : o.warn("The errors container `" + s + "` does not exist in DOM nor as a global JS function")
            }
            return "function" == typeof s && (s = s.call(this, this)), "object" == typeof s && s.length ? s.append(this._ui.$errorsWrapper) : this._inputHolder().after(this._ui.$errorsWrapper)
        },
        _actualizeTriggers: function() {
            var r, s = this,
                a = this._findRelated();
            a.off(".Parsley"), this._failedOnce ? a.on(o.namespaceEvents(this.options.triggerAfterFailure, "Parsley"), (function() {
                s._validateIfNeeded()
            })) : (r = o.namespaceEvents(this.options.trigger, "Parsley")) && a.on(r, (function(r) {
                s._validateIfNeeded(r)
            }))
        },
        _validateIfNeeded: function(r) {
            var s = this;
            r && /key|input/.test(r.type) && (!this._ui || !this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold || (this.options.debounce ? (window.clearTimeout(this._debounced), this._debounced = window.setTimeout((function() {
                return s.validate()
            }), this.options.debounce)) : this.validate())
        },
        _resetUI: function() {
            this._failedOnce = !1, this._actualizeTriggers(), void 0 !== this._ui && (this._ui.$errorsWrapper.removeClass("filled").children().remove(), this._resetClass(), this._ui.lastValidationResult = [], this._ui.validationInformationVisible = !1)
        },
        _destroyUI: function() {
            this._resetUI(), void 0 !== this._ui && this._ui.$errorsWrapper.remove(), delete this._ui
        },
        _successClass: function() {
            this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass)
        },
        _errorClass: function() {
            this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass)
        },
        _resetClass: function() {
            this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass)
        }
    };
    var w = function(s, a, o) {
            this.__class__ = "Form", this.element = s, this.$element = r(s), this.domOptions = a, this.options = o, this.parent = window.Parsley, this.fields = [], this.validationResult = null
        },
        _ = {
            pending: null,
            resolved: !0,
            rejected: !1
        };
    w.prototype = {
        onSubmitValidate: function(r) {
            var s = this;
            if (!0 !== r.parsley) {
                var a = this._submitSource || this.$element.find(o._SubmitSelector)[0];
                if (this._submitSource = null, this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !0), !a || null === a.getAttribute("formnovalidate")) {
                    window.Parsley._remoteCache = {};
                    var u = this.whenValidate({
                        event: r
                    });
                    "resolved" === u.state() && !1 !== this._trigger("submit") || (r.stopImmediatePropagation(), r.preventDefault(), "pending" === u.state() && u.done((function() {
                        s._submit(a)
                    })))
                }
            }
        },
        onSubmitButton: function(r) {
            this._submitSource = r.currentTarget
        },
        _submit: function(s) {
            if (!1 !== this._trigger("submit")) {
                if (s) {
                    var a = this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !1);
                    0 === a.length && (a = r('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)), a.attr({
                        name: s.getAttribute("name"),
                        value: s.getAttribute("value")
                    })
                }
                this.$element.trigger(_extends(r.Event("submit"), {
                    parsley: !0
                }))
            }
        },
        validate: function(s) {
            if (arguments.length >= 1 && !r.isPlainObject(s)) {
                o.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");
                var a = _slice.call(arguments),
                    u = a[0],
                    c = a[1],
                    y = a[2];
                s = {
                    group: u,
                    force: c,
                    event: y
                }
            }
            return _[this.whenValidate(s).state()]
        },
        whenValidate: function() {
            var s, a = this,
                u = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                c = u.group,
                y = u.force,
                _ = u.event;
            this.submitEvent = _, _ && (this.submitEvent = _extends({}, _, {
                preventDefault: function() {
                    o.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"), a.validationResult = !1
                }
            })), this.validationResult = !0, this._trigger("validate"), this._refreshFields();
            var b = this._withoutReactualizingFormOptions((function() {
                return r.map(a.fields, (function(r) {
                    return r.whenValidate({
                        force: y,
                        group: c
                    })
                }))
            }));
            return (s = o.all(b).done((function() {
                a._trigger("success")
            })).fail((function() {
                a.validationResult = !1, a.focus(), a._trigger("error")
            })).always((function() {
                a._trigger("validated")
            }))).pipe.apply(s, _toConsumableArray(this._pipeAccordingToValidationResult()))
        },
        isValid: function(s) {
            if (arguments.length >= 1 && !r.isPlainObject(s)) {
                o.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");
                var a = _slice.call(arguments),
                    u = a[0],
                    c = a[1];
                s = {
                    group: u,
                    force: c
                }
            }
            return _[this.whenValid(s).state()]
        },
        whenValid: function() {
            var s = this,
                a = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                u = a.group,
                c = a.force;
            this._refreshFields();
            var y = this._withoutReactualizingFormOptions((function() {
                return r.map(s.fields, (function(r) {
                    return r.whenValid({
                        group: u,
                        force: c
                    })
                }))
            }));
            return o.all(y)
        },
        refresh: function() {
            return this._refreshFields(), this
        },
        reset: function() {
            for (var r = 0; r < this.fields.length; r++) this.fields[r].reset();
            this._trigger("reset")
        },
        destroy: function() {
            this._destroyUI();
            for (var r = 0; r < this.fields.length; r++) this.fields[r].destroy();
            this.$element.removeData("Parsley"), this._trigger("destroy")
        },
        _refreshFields: function() {
            return this.actualizeOptions()._bindFields()
        },
        _bindFields: function() {
            var s = this,
                a = this.fields;
            return this.fields = [], this.fieldsMappedById = {}, this._withoutReactualizingFormOptions((function() {
                s.$element.find(s.options.inputs).not(s.options.excluded).each((function(r, a) {
                    var o = new window.Parsley.Factory(a, {}, s);
                    if (("Field" === o.__class__ || "FieldMultiple" === o.__class__) && !0 !== o.options.excluded) {
                        var u = o.__class__ + "-" + o.__id__;
                        void 0 === s.fieldsMappedById[u] && (s.fieldsMappedById[u] = o, s.fields.push(o))
                    }
                })), r.each(o.difference(a, s.fields), (function(r, s) {
                    s.reset()
                }))
            })), this
        },
        _withoutReactualizingFormOptions: function(r) {
            var s = this.actualizeOptions;
            this.actualizeOptions = function() {
                return this
            };
            var a = r();
            return this.actualizeOptions = s, a
        },
        _trigger: function(r) {
            return this.trigger("form:" + r)
        }
    };
    var F = function(r, s, a, o, u) {
        var c = window.Parsley._validatorRegistry.validators[s],
            y = new h(c);
        o = o || r.options[s + "Priority"] || y.priority, _extends(this, {
            validator: y,
            name: s,
            requirements: a,
            priority: o,
            isDomConstraint: u = !0 === u
        }), this._parseRequirements(r.options)
    };
    F.prototype = {
        validate: function(r, s) {
            var a;
            return (a = this.validator).validate.apply(a, [r].concat(_toConsumableArray(this.requirementList), [s]))
        },
        _parseRequirements: function(r) {
            var s = this;
            this.requirementList = this.validator.parseRequirements(this.requirements, (function(a) {
                return r[s.name + function(r) {
                    return r[0].toUpperCase() + r.slice(1)
                }(a)]
            }))
        }
    };
    var A = function(s, a, o, u) {
            this.__class__ = "Field", this.element = s, this.$element = r(s), void 0 !== u && (this.parent = u), this.options = o, this.domOptions = a, this.constraints = [], this.constraintsByName = {}, this.validationResult = !0, this._bindConstraints()
        },
        b = {
            pending: null,
            resolved: !0,
            rejected: !1
        };
    A.prototype = {
        validate: function(s) {
            arguments.length >= 1 && !r.isPlainObject(s) && (o.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."), s = {
                options: s
            });
            var a = this.whenValidate(s);
            if (!a) return !0;
            switch (a.state()) {
                case "pending":
                    return null;
                case "resolved":
                    return !0;
                case "rejected":
                    return this.validationResult
            }
        },
        whenValidate: function() {
            var r, s = this,
                a = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                o = a.force,
                u = a.group;
            if (this.refresh(), !u || this._isInGroup(u)) return this.value = this.getValue(), this._trigger("validate"), (r = this.whenValid({
                force: o,
                value: this.value,
                _refreshed: !0
            }).always((function() {
                s._reflowUI()
            })).done((function() {
                s._trigger("success")
            })).fail((function() {
                s._trigger("error")
            })).always((function() {
                s._trigger("validated")
            }))).pipe.apply(r, _toConsumableArray(this._pipeAccordingToValidationResult()))
        },
        hasConstraints: function() {
            return 0 !== this.constraints.length
        },
        needsValidation: function(r) {
            return void 0 === r && (r = this.getValue()), !(!r.length && !this._isRequired() && void 0 === this.options.validateIfEmpty)
        },
        _isInGroup: function(s) {
            return Array.isArray(this.options.group) ? -1 !== r.inArray(s, this.options.group) : this.options.group === s
        },
        isValid: function(s) {
            if (arguments.length >= 1 && !r.isPlainObject(s)) {
                o.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");
                var a = _slice.call(arguments),
                    u = a[0],
                    c = a[1];
                s = {
                    force: u,
                    value: c
                }
            }
            var y = this.whenValid(s);
            return !y || b[y.state()]
        },
        whenValid: function() {
            var s = this,
                a = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
                u = a.force,
                c = void 0 !== u && u,
                y = a.value,
                _ = a.group,
                b = a._refreshed;
            if (b || this.refresh(), !_ || this._isInGroup(_)) {
                if (this.validationResult = !0, !this.hasConstraints()) return r.when();
                if (null != y || (y = this.getValue()), !this.needsValidation(y) && !0 !== c) return r.when();
                var C = this._getGroupedConstraints(),
                    E = [];
                return r.each(C, (function(a, u) {
                    var c = o.all(r.map(u, (function(r) {
                        return s._validateConstraint(y, r)
                    })));
                    if (E.push(c), "rejected" === c.state()) return !1
                })), o.all(E)
            }
        },
        _validateConstraint: function(s, a) {
            var u = this,
                c = a.validate(s, this);
            return !1 === c && (c = r.Deferred().reject()), o.all([c]).fail((function(r) {
                u.validationResult instanceof Array || (u.validationResult = []), u.validationResult.push({
                    assert: a,
                    errorMessage: "string" == typeof r && r
                })
            }))
        },
        getValue: function() {
            var r;
            return null == (r = "function" == typeof this.options.value ? this.options.value(this) : void 0 !== this.options.value ? this.options.value : this.$element.val()) ? "" : this._handleWhitespace(r)
        },
        reset: function() {
            return this._resetUI(), this._trigger("reset")
        },
        destroy: function() {
            this._destroyUI(), this.$element.removeData("Parsley"), this.$element.removeData("FieldMultiple"), this._trigger("destroy")
        },
        refresh: function() {
            return this._refreshConstraints(), this
        },
        _refreshConstraints: function() {
            return this.actualizeOptions()._bindConstraints()
        },
        refreshConstraints: function() {
            return o.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh"), this.refresh()
        },
        addConstraint: function(r, s, a, o) {
            if (window.Parsley._validatorRegistry.validators[r]) {
                var u = new F(this, r, s, a, o);
                "undefined" !== this.constraintsByName[u.name] && this.removeConstraint(u.name), this.constraints.push(u), this.constraintsByName[u.name] = u
            }
            return this
        },
        removeConstraint: function(r) {
            for (var s = 0; s < this.constraints.length; s++)
                if (r === this.constraints[s].name) {
                    this.constraints.splice(s, 1);
                    break
                }
            return delete this.constraintsByName[r], this
        },
        updateConstraint: function(r, s, a) {
            return this.removeConstraint(r).addConstraint(r, s, a)
        },
        _bindConstraints: function() {
            for (var r = [], s = {}, a = 0; a < this.constraints.length; a++) !1 === this.constraints[a].isDomConstraint && (r.push(this.constraints[a]), s[this.constraints[a].name] = this.constraints[a]);
            for (var o in this.constraints = r, this.constraintsByName = s, this.options) this.addConstraint(o, this.options[o], void 0, !0);
            return this._bindHtml5Constraints()
        },
        _bindHtml5Constraints: function() {
            null !== this.element.getAttribute("required") && this.addConstraint("required", !0, void 0, !0), null !== this.element.getAttribute("pattern") && this.addConstraint("pattern", this.element.getAttribute("pattern"), void 0, !0);
            var r = this.element.getAttribute("min"),
                s = this.element.getAttribute("max");
            null !== r && null !== s ? this.addConstraint("range", [r, s], void 0, !0) : null !== r ? this.addConstraint("min", r, void 0, !0) : null !== s && this.addConstraint("max", s, void 0, !0), null !== this.element.getAttribute("minlength") && null !== this.element.getAttribute("maxlength") ? this.addConstraint("length", [this.element.getAttribute("minlength"), this.element.getAttribute("maxlength")], void 0, !0) : null !== this.element.getAttribute("minlength") ? this.addConstraint("minlength", this.element.getAttribute("minlength"), void 0, !0) : null !== this.element.getAttribute("maxlength") && this.addConstraint("maxlength", this.element.getAttribute("maxlength"), void 0, !0);
            var a = o.getType(this.element);
            return "number" === a ? this.addConstraint("type", ["number", {
                step: this.element.getAttribute("step") || "1",
                base: r || this.element.getAttribute("value")
            }], void 0, !0) : /^(email|url|range|date)$/i.test(a) ? this.addConstraint("type", a, void 0, !0) : this
        },
        _isRequired: function() {
            return void 0 !== this.constraintsByName.required && !1 !== this.constraintsByName.required.requirements
        },
        _trigger: function(r) {
            return this.trigger("field:" + r)
        },
        _handleWhitespace: function(r) {
            return !0 === this.options.trimValue && o.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'), "squish" === this.options.whitespace && (r = r.replace(/\s{2,}/g, " ")), "trim" !== this.options.whitespace && "squish" !== this.options.whitespace && !0 !== this.options.trimValue || (r = o.trimString(r)), r
        },
        _isDateInput: function() {
            var r = this.constraintsByName.type;
            return r && "date" === r.requirements
        },
        _getGroupedConstraints: function() {
            if (!1 === this.options.priorityEnabled) return [this.constraints];
            for (var r = [], s = {}, a = 0; a < this.constraints.length; a++) {
                var o = this.constraints[a].priority;
                s[o] || r.push(s[o] = []), s[o].push(this.constraints[a])
            }
            return r.sort((function(r, s) {
                return s[0].priority - r[0].priority
            })), r
        }
    };
    var C = A,
        $ = function() {
            this.__class__ = "FieldMultiple"
        };
    $.prototype = {
        addElement: function(r) {
            return this.$elements.push(r), this
        },
        _refreshConstraints: function() {
            var s;
            if (this.constraints = [], "SELECT" === this.element.nodeName) return this.actualizeOptions()._bindConstraints(), this;
            for (var a = 0; a < this.$elements.length; a++)
                if (r("html").has(this.$elements[a]).length) {
                    s = this.$elements[a].data("FieldMultiple")._refreshConstraints().constraints;
                    for (var o = 0; o < s.length; o++) this.addConstraint(s[o].name, s[o].requirements, s[o].priority, s[o].isDomConstraint)
                } else this.$elements.splice(a, 1);
            return this
        },
        getValue: function() {
            if ("function" == typeof this.options.value) return this.options.value(this);
            if (void 0 !== this.options.value) return this.options.value;
            if ("INPUT" === this.element.nodeName) {
                var s = o.getType(this.element);
                if ("radio" === s) return this._findRelated().filter(":checked").val() || "";
                if ("checkbox" === s) {
                    var a = [];
                    return this._findRelated().filter(":checked").each((function() {
                        a.push(r(this).val())
                    })), a
                }
            }
            return "SELECT" === this.element.nodeName && null === this.$element.val() ? [] : this.$element.val()
        },
        _init: function() {
            return this.$elements = [this.$element], this
        }
    };
    var P = function(s, a, o) {
        this.element = s, this.$element = r(s);
        var u = this.$element.data("Parsley");
        if (u) return void 0 !== o && u.parent === window.Parsley && (u.parent = o, u._resetOptions(u.options)), "object" == typeof a && _extends(u.options, a), u;
        if (!this.$element.length) throw new Error("You must bind Parsley on an existing element.");
        if (void 0 !== o && "Form" !== o.__class__) throw new Error("Parent instance must be a Form instance");
        return this.parent = o || window.Parsley, this.init(a)
    };
    P.prototype = {
        init: function(r) {
            return this.__class__ = "Parsley", this.__version__ = "2.8.1", this.__id__ = o.generateID(), this._resetOptions(r), "FORM" === this.element.nodeName || o.checkAttr(this.element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs) ? this.bind("parsleyForm") : this.isMultiple() ? this.handleMultiple() : this.bind("parsleyField")
        },
        isMultiple: function() {
            var r = o.getType(this.element);
            return "radio" === r || "checkbox" === r || "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")
        },
        handleMultiple: function() {
            var s, a, u = this;
            if (this.options.multiple = this.options.multiple || (s = this.element.getAttribute("name")) || this.element.getAttribute("id"), "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")) return this.options.multiple = this.options.multiple || this.__id__, this.bind("parsleyFieldMultiple");
            if (!this.options.multiple) return o.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element), this;
            this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ""), s && r('input[name="' + s + '"]').each((function(r, s) {
                var a = o.getType(s);
                "radio" !== a && "checkbox" !== a || s.setAttribute(u.options.namespace + "multiple", u.options.multiple)
            }));
            for (var c = this._findRelated(), y = 0; y < c.length; y++)
                if (void 0 !== (a = r(c.get(y)).data("Parsley"))) {
                    this.$element.data("FieldMultiple") || a.addElement(this.$element);
                    break
                }
            return this.bind("parsleyField", !0), a || this.bind("parsleyFieldMultiple")
        },
        bind: function(s, a) {
            var u;
            switch (s) {
                case "parsleyForm":
                    u = r.extend(new w(this.element, this.domOptions, this.options), new l, window.ParsleyExtend)._bindFields();
                    break;
                case "parsleyField":
                    u = r.extend(new C(this.element, this.domOptions, this.options, this.parent), new l, window.ParsleyExtend);
                    break;
                case "parsleyFieldMultiple":
                    u = r.extend(new C(this.element, this.domOptions, this.options, this.parent), new $, new l, window.ParsleyExtend)._init();
                    break;
                default:
                    throw new Error(s + "is not a supported Parsley type")
            }
            return this.options.multiple && o.setAttr(this.element, this.options.namespace, "multiple", this.options.multiple), void 0 !== a ? (this.$element.data("FieldMultiple", u), u) : (this.$element.data("Parsley", u), u._actualizeTriggers(), u._trigger("init"), u)
        }
    };
    var E = r.fn.jquery.split(".");
    if (parseInt(E[0]) <= 1 && parseInt(E[1]) < 8) throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";
    E.forEach || o.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");
    var x = _extends(new l, {
        element: document,
        $element: r(document),
        actualizeOptions: null,
        _resetOptions: null,
        Factory: P,
        version: "2.8.1"
    });
    _extends(C.prototype, y.Field, l.prototype), _extends(w.prototype, y.Form, l.prototype), _extends(P.prototype, l.prototype), r.fn.parsley = r.fn.psly = function(s) {
        if (this.length > 1) {
            var a = [];
            return this.each((function() {
                a.push(r(this).parsley(s))
            })), a
        }
        if (0 != this.length) return new P(this[0], s)
    }, void 0 === window.ParsleyExtend && (window.ParsleyExtend = {}), x.options = _extends(o.objectCreate(u), window.ParsleyConfig), window.ParsleyConfig = x.options, window.Parsley = window.psly = x, x.Utils = o, window.ParsleyUtils = {}, r.each(o, (function(r, s) {
        "function" == typeof s && (window.ParsleyUtils[r] = function() {
            return o.warnOnce("Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead."), o[r].apply(o, arguments)
        })
    }));
    var V = window.Parsley._validatorRegistry = new p(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);
    window.ParsleyValidator = {}, r.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator".split(" "), (function(r, s) {
        window.Parsley[s] = function() {
            return V[s].apply(V, arguments)
        }, window.ParsleyValidator[s] = function() {
            var r;
            return o.warnOnce("Accessing the method '" + s + "' through Validator is deprecated. Simply call 'window.Parsley." + s + "(...)'"), (r = window.Parsley)[s].apply(r, arguments)
        }
    })), window.Parsley.UI = y, window.ParsleyUI = {
        removeError: function(r, s, a) {
            var u = !0 !== a;
            return o.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."), r.removeError(s, {
                updateClass: u
            })
        },
        getErrorsMessages: function(r) {
            return o.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly."), r.getErrorsMessages()
        }
    }, r.each("addError updateError".split(" "), (function(r, s) {
        window.ParsleyUI[s] = function(r, a, u, c, y) {
            var _ = !0 !== y;
            return o.warnOnce("Accessing UI is deprecated. Call '" + s + "' on the instance directly. Please comment in issue 1073 as to your need to call this method."), r[s](a, {
                message: u,
                assert: c,
                updateClass: _
            })
        }
    })), !1 !== window.ParsleyConfig.autoBind && r((function() {
        r("[data-parsley-validate]").length && r("[data-parsley-validate]").parsley()
    }));
    var O = r({}),
        R = function() {
            o.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley")
        },
        D = "parsley:";
    return r.listen = function(r, s) {
        var a;
        if (R(), "object" == typeof arguments[1] && "function" == typeof arguments[2] && (a = arguments[1], s = arguments[2]), "function" != typeof s) throw new Error("Wrong parameters");
        window.Parsley.on(i(r), t(s, a))
    }, r.listenTo = function(r, s, a) {
        if (R(), !(r instanceof C || r instanceof w)) throw new Error("Must give Parsley instance");
        if ("string" != typeof s || "function" != typeof a) throw new Error("Wrong parameters");
        r.on(i(s), t(a))
    }, r.unsubscribe = function(r, s) {
        if (R(), "string" != typeof r || "function" != typeof s) throw new Error("Wrong arguments");
        window.Parsley.off(i(r), s.parsleyAdaptedCallback)
    }, r.unsubscribeTo = function(r, s) {
        if (R(), !(r instanceof C || r instanceof w)) throw new Error("Must give Parsley instance");
        r.off(i(s))
    }, r.unsubscribeAll = function(s) {
        R(), window.Parsley.off(i(s)), r("form,input,textarea,select").each((function() {
            var a = r(this).data("Parsley");
            a && a.off(i(s))
        }))
    }, r.emit = function(r, s) {
        var a;
        R();
        var o = s instanceof C || s instanceof w,
            u = Array.prototype.slice.call(arguments, o ? 2 : 1);
        u.unshift(i(r)), o || (s = window.Parsley), (a = s).trigger.apply(a, _toConsumableArray(u))
    }, r.extend(!0, x, {
        asyncValidators: {
            default: {
                fn: function(r) {
                    return r.status >= 200 && r.status < 300
                },
                url: !1
            },
            reverse: {
                fn: function(r) {
                    return r.status < 200 || r.status >= 300
                },
                url: !1
            }
        },
        addAsyncValidator: function(r, s, a, o) {
            return x.asyncValidators[r] = {
                fn: s,
                url: a || !1,
                options: o || {}
            }, this
        }
    }), x.addValidator("remote", {
        requirementType: {
            "": "string",
            validator: "string",
            reverse: "boolean",
            options: "object"
        },
        validateString: function(s, a, o, u) {
            var c, y, _ = {},
                b = o.validator || (!0 === o.reverse ? "reverse" : "default");
            if (void 0 === x.asyncValidators[b]) throw new Error("Calling an undefined async validator: `" + b + "`");
            (a = x.asyncValidators[b].url || a).indexOf("{value}") > -1 ? a = a.replace("{value}", encodeURIComponent(s)) : _[u.element.getAttribute("name") || u.element.getAttribute("id")] = s;
            var C = r.extend(!0, o.options || {}, x.asyncValidators[b].options);
            c = r.extend(!0, {}, {
                url: a,
                data: _,
                type: "GET"
            }, C), u.trigger("field:ajaxoptions", u, c), y = r.param(c), void 0 === x._remoteCache && (x._remoteCache = {});
            var E = x._remoteCache[y] = x._remoteCache[y] || r.ajax(c),
                h = function() {
                    var s = x.asyncValidators[b].fn.call(u, E, a, o);
                    return s || (s = r.Deferred().reject()), r.when(s)
                };
            return E.then(h, h)
        },
        priority: -1
    }), x.on("form:submit", (function() {
        x._remoteCache = {}
    })), l.prototype.addAsyncValidator = function() {
        return o.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"), x.addAsyncValidator.apply(x, arguments)
    }, x.addMessages("en", {
        defaultMessage: "Invalid value",
        type: {
            email: "Invalid email",
            url: "Invalid url",
            number: "Only numbers allowed",
            integer: "Only integer allowed",
            digits: "Only digits allowed",
            alphanum: "Only alphanumeric allowed"
        },
        notblank: "This value should not be blank.",
        required: "Required",
        pattern: "This value seems to be invalid.",
        min: "This value should be greater than or equal to %s.",
        max: "This value should be lower than or equal to %s.",
        range: "This value should be between %s and %s.",
        minlength: "Your input should have %s characters or more.",
        maxlength: "This value is too long. It should have %s characters or fewer.",
        length: "This value length is invalid. It should be between %s and %s characters long.",
        mincheck: "You must select at least %s choices.",
        maxcheck: "You must select %s choices or fewer.",
        check: "You must select between %s and %s choices.",
        equalto: "This value should be the same.",
        euvatin: "It's not a valid VAT Identification Number."
    }), x.setLocale("en"), (new function n() {
        var s = this,
            a = window || global;
        _extends(this, {
            isNativeEvent: function(r) {
                return r.originalEvent && !1 !== r.originalEvent.isTrusted
            },
            fakeInputEvent: function(a) {
                s.isNativeEvent(a) && r(a.target).trigger("input")
            },
            misbehaves: function(a) {
                s.isNativeEvent(a) && (s.behavesOk(a), r(document).on("change.inputevent", a.data.selector, s.fakeInputEvent), s.fakeInputEvent(a))
            },
            behavesOk: function(a) {
                s.isNativeEvent(a) && r(document).off("input.inputevent", a.data.selector, s.behavesOk).off("change.inputevent", a.data.selector, s.misbehaves)
            },
            install: function() {
                if (!a.inputEventPatched) {
                    a.inputEventPatched = "0.0.3";
                    for (var o = ["select", 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'], u = 0; u < o.length; u++) {
                        var c = o[u];
                        r(document).on("input.inputevent", c, {
                            selector: c
                        }, s.behavesOk).on("change.inputevent", c, {
                            selector: c
                        }, s.misbehaves)
                    }
                }
            },
            uninstall: function() {
                delete a.inputEventPatched, r(document).off(".inputevent")
            }
        })
    }).install(), x
})), Parsley.addMessages("de", {
    defaultMessage: "Eingabe nicht korrekt",
    type: {
        email: "Ungültige E-Mail-Adresse",
        url: "Ungültige URL",
        number: "Nur Zahlen erlaubt",
        integer: "Nur Zahlen erlaubt",
        digits: "Nur Ziffern erlaubt",
        alphanum: "Die Eingabe muss alphanumerisch sein."
    },
    notblank: "Die Eingabe darf nicht leer sein.",
    required: "Pflichtfeld",
    pattern: "Die Eingabe scheint ungültig zu sein.",
    min: "Die Eingabe muss größer oder gleich %s sein.",
    max: "Die Eingabe muss kleiner oder gleich %s sein.",
    range: "Die Eingabe muss zwischen %s und %s liegen.",
    minlength: "Du musst mindestens %s Zeichen eingegeben.",
    maxlength: "Die Eingabe ist zu lang. Es dürfen höchstens %s Zeichen eingegeben werden.",
    length: "Die Länge der Eingabe ist ungültig. Es müssen zwischen %s und %s Zeichen eingegeben werden.",
    mincheck: "Wählen Sie mindestens %s Angaben aus.",
    maxcheck: "Wählen Sie maximal %s Angaben aus.",
    check: "Wählen Sie zwischen %s und %s Angaben.",
    equalto: "Dieses Feld muss dem anderen entsprechen."
}), $("body").hasClass("expatGuideUebersicht") || $("body").hasClass("expats") || $("#knowledge-search").hasClass("enSearch") ? Parsley.setLocale("en") : Parsley.setLocale("de");