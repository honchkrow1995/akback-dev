/*!
 * BootstrapValidator (http://bootstrapvalidator.com)
 * The best jQuery plugin to validate form fields. Designed to use with Bootstrap 3
 *
 * @version     v0.5.3, built on 2014-11-05 9:14:18 PM
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2014 Nguyen Huu Phuoc
 * @license     Commercial: http://bootstrapvalidator.com/license/
 *              Non-commercial: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */
if ("undefined" == typeof jQuery) throw new Error("BootstrapValidator requires jQuery");
! function(a) {
    var b = a.fn.jquery.split(" ")[0].split(".");
    if (+b[0] < 2 && +b[1] < 9 || 1 === +b[0] && 9 === +b[1] && +b[2] < 1) throw new Error("BootstrapValidator requires jQuery version 1.9.1 or higher")
}(window.jQuery),
function(a) {
    var b = function(b, c) {
        this.$form = a(b), this.options = a.extend({}, a.fn.bootstrapValidator.DEFAULT_OPTIONS, c), this.$invalidFields = a([]), this.$submitButton = null, this.$hiddenButton = null, this.STATUS_NOT_VALIDATED = "NOT_VALIDATED", this.STATUS_VALIDATING = "VALIDATING", this.STATUS_INVALID = "INVALID", this.STATUS_VALID = "VALID";
        var d = function() {
                for (var a = 3, b = document.createElement("div"), c = b.all || []; b.innerHTML = "<!--[if gt IE " + ++a + "]><br><![endif]-->", c[0];);
                return a > 4 ? a : !a
            }(),
            e = document.createElement("div");
        this._changeEvent = 9 !== d && "oninput" in e ? "input" : "keyup", this._submitIfValid = null, this._cacheFields = {}, this._init()
    };
    b.prototype = {
        constructor: b,
        _init: function() {
            var b = this,
                c = {
                    autoFocus: this.$form.attr("data-bv-autofocus"),
                    container: this.$form.attr("data-bv-container"),
                    events: {
                        formInit: this.$form.attr("data-bv-events-form-init"),
                        formError: this.$form.attr("data-bv-events-form-error"),
                        formSuccess: this.$form.attr("data-bv-events-form-success"),
                        fieldAdded: this.$form.attr("data-bv-events-field-added"),
                        fieldRemoved: this.$form.attr("data-bv-events-field-removed"),
                        fieldInit: this.$form.attr("data-bv-events-field-init"),
                        fieldError: this.$form.attr("data-bv-events-field-error"),
                        fieldSuccess: this.$form.attr("data-bv-events-field-success"),
                        fieldStatus: this.$form.attr("data-bv-events-field-status"),
                        validatorError: this.$form.attr("data-bv-events-validator-error"),
                        validatorSuccess: this.$form.attr("data-bv-events-validator-success")
                    },
                    excluded: this.$form.attr("data-bv-excluded"),
                    feedbackIcons: {
                        valid: this.$form.attr("data-bv-feedbackicons-valid"),
                        invalid: this.$form.attr("data-bv-feedbackicons-invalid"),
                        validating: this.$form.attr("data-bv-feedbackicons-validating")
                    },
                    group: this.$form.attr("data-bv-group"),
                    live: this.$form.attr("data-bv-live"),
                    message: this.$form.attr("data-bv-message"),
                    onError: this.$form.attr("data-bv-onerror"),
                    onSuccess: this.$form.attr("data-bv-onsuccess"),
                    submitButtons: this.$form.attr("data-bv-submitbuttons"),
                    threshold: this.$form.attr("data-bv-threshold"),
                    trigger: this.$form.attr("data-bv-trigger"),
                    verbose: this.$form.attr("data-bv-verbose"),
                    fields: {}
                };
            this.$form.attr("novalidate", "novalidate").addClass(this.options.elementClass).on("submit.bv", function(a) {
                a.preventDefault(), b.validate()
            }).on("click.bv", this.options.submitButtons, function() {
                b.$submitButton = a(this), b._submitIfValid = !0
            }).find("[name], [data-bv-field]").each(function() {
                var d = a(this),
                    e = d.attr("name") || d.attr("data-bv-field"),
                    f = b._parseOptions(d);
                f && (d.attr("data-bv-field", e), c.fields[e] = a.extend({}, f, c.fields[e]))
            }), this.options = a.extend(!0, this.options, c), this.$hiddenButton = a("<button/>").attr("type", "submit").prependTo(this.$form).addClass("bv-hidden-submit").css({
                display: "none",
                width: 0,
                height: 0
            }), this.$form.on("click.bv", '[type="submit"]', function(c) {
                if (!c.isDefaultPrevented()) {
                    var d = a(c.target),
                        e = d.is('[type="submit"]') ? d.eq(0) : d.parent('[type="submit"]').eq(0);
                    !b.options.submitButtons || e.is(b.options.submitButtons) || e.is(b.$hiddenButton) || b.$form.off("submit.bv").submit()
                }
            });
            for (var d in this.options.fields) this._initField(d);
            this.$form.trigger(a.Event(this.options.events.formInit), {
                bv: this,
                options: this.options
            }), this.options.onSuccess && this.$form.on(this.options.events.formSuccess, function(c) {
                a.fn.bootstrapValidator.helpers.call(b.options.onSuccess, [c])
            }), this.options.onError && this.$form.on(this.options.events.formError, function(c) {
                a.fn.bootstrapValidator.helpers.call(b.options.onError, [c])
            })
        },
        _parseOptions: function(b) {
            var c, d, e, f, g, h, i, j, k, l = b.attr("name") || b.attr("data-bv-field"),
                m = {};
            for (d in a.fn.bootstrapValidator.validators)
                if (c = a.fn.bootstrapValidator.validators[d], e = "data-bv-" + d.toLowerCase(), f = b.attr(e) + "", k = "function" == typeof c.enableByHtml5 ? c.enableByHtml5(b) : null, k && "false" !== f || k !== !0 && ("" === f || "true" === f || e === f.toLowerCase())) {
                    c.html5Attributes = a.extend({}, {
                        message: "message",
                        onerror: "onError",
                        onsuccess: "onSuccess"
                    }, c.html5Attributes), m[d] = a.extend({}, k === !0 ? {} : k, m[d]);
                    for (j in c.html5Attributes) g = c.html5Attributes[j], h = "data-bv-" + d.toLowerCase() + "-" + j, i = b.attr(h), i && ("true" === i || h === i.toLowerCase() ? i = !0 : "false" === i && (i = !1), m[d][g] = i)
                }
            var n = {
                    autoFocus: b.attr("data-bv-autofocus"),
                    container: b.attr("data-bv-container"),
                    excluded: b.attr("data-bv-excluded"),
                    feedbackIcons: b.attr("data-bv-feedbackicons"),
                    group: b.attr("data-bv-group"),
                    message: b.attr("data-bv-message"),
                    onError: b.attr("data-bv-onerror"),
                    onStatus: b.attr("data-bv-onstatus"),
                    onSuccess: b.attr("data-bv-onsuccess"),
                    selector: b.attr("data-bv-selector"),
                    threshold: b.attr("data-bv-threshold"),
                    trigger: b.attr("data-bv-trigger"),
                    verbose: b.attr("data-bv-verbose"),
                    validators: m
                },
                o = a.isEmptyObject(n),
                p = a.isEmptyObject(m);
            return !p || !o && this.options.fields && this.options.fields[l] ? (n.validators = m, n) : null
        },
        _initField: function(b) {
            var c = a([]);
            switch (typeof b) {
                case "object":
                    c = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    c = this.getFieldElements(b), c.attr("data-bv-field", b)
            }
            if (0 !== c.length && null !== this.options.fields[b] && null !== this.options.fields[b].validators) {
                var d;
                for (d in this.options.fields[b].validators) a.fn.bootstrapValidator.validators[d] || delete this.options.fields[b].validators[d];
                null === this.options.fields[b].enabled && (this.options.fields[b].enabled = !0);
                for (var e = this, f = c.length, g = c.attr("type"), h = 1 === f || "radio" === g || "checkbox" === g, i = "radio" === g || "checkbox" === g || "file" === g || "SELECT" === c.eq(0).get(0).tagName ? "change" : this._changeEvent, j = (this.options.fields[b].trigger || this.options.trigger || i).split(" "), k = a.map(j, function(a) {
                        return a + ".update.bv"
                    }).join(" "), l = 0; f > l; l++) {
                    var m = c.eq(l),
                        n = this.options.fields[b].group || this.options.group,
                        o = m.parents(n),
                        p = "function" == typeof(this.options.fields[b].container || this.options.container) ? (this.options.fields[b].container || this.options.container).call(this, m, this) : this.options.fields[b].container || this.options.container,
                        q = p && "tooltip" !== p && "popover" !== p ? a(p) : this._getMessageContainer(m, n);
                    p && "tooltip" !== p && "popover" !== p && q.addClass("has-error"), q.find('.help-block[data-bv-validator][data-bv-for="' + b + '"]').remove(), o.find('i[data-bv-icon-for="' + b + '"]').remove(), m.off(k).on(k, function() {
                        e.updateStatus(a(this), e.STATUS_NOT_VALIDATED)
                    }), m.data("bv.messages", q);
                    for (d in this.options.fields[b].validators) m.data("bv.result." + d, this.STATUS_NOT_VALIDATED), h && l !== f - 1 || a("<small/>").css("display", "none").addClass("help-block").attr("data-bv-validator", d).attr("data-bv-for", b).attr("data-bv-result", this.STATUS_NOT_VALIDATED).html(this._getMessage(b, d)).appendTo(q), "function" == typeof a.fn.bootstrapValidator.validators[d].init && a.fn.bootstrapValidator.validators[d].init(this, m, this.options.fields[b].validators[d]);
                    if (this.options.fields[b].feedbackIcons !== !1 && "false" !== this.options.fields[b].feedbackIcons && this.options.feedbackIcons && this.options.feedbackIcons.validating && this.options.feedbackIcons.invalid && this.options.feedbackIcons.valid && (!h || l === f - 1)) {
                        o.addClass("has-feedback");
                        var r = a("<i/>").css("display", "none").addClass("form-control-feedback").attr("data-bv-icon-for", b).insertAfter(m);
                        if ("checkbox" === g || "radio" === g) {
                            var s = m.parent();
                            s.hasClass(g) ? r.insertAfter(s) : s.parent().hasClass(g) && r.insertAfter(s.parent())
                        }
                        0 === o.find("label").length && r.addClass("bv-no-label"), 0 !== o.find(".input-group").length && r.addClass("bv-icon-input-group").insertAfter(o.find(".input-group").eq(0)), h ? l === f - 1 && c.data("bv.icon", r) : m.data("bv.icon", r), p && m.off("focus.container.bv").on("focus.container.bv", function() {
                            switch (p) {
                                case "tooltip":
                                    a(this).data("bv.icon").tooltip("show");
                                    break;
                                case "popover":
                                    a(this).data("bv.icon").popover("show")
                            }
                        }).off("blur.container.bv").on("blur.container.bv", function() {
                            switch (p) {
                                case "tooltip":
                                    a(this).data("bv.icon").tooltip("hide");
                                    break;
                                case "popover":
                                    a(this).data("bv.icon").popover("hide")
                            }
                        })
                    }
                }
                switch (c.on(this.options.events.fieldSuccess, function(b, c) {
                    var d = e.getOptions(c.field, null, "onSuccess");
                    d && a.fn.bootstrapValidator.helpers.call(d, [b, c])
                }).on(this.options.events.fieldError, function(b, c) {
                    var d = e.getOptions(c.field, null, "onError");
                    d && a.fn.bootstrapValidator.helpers.call(d, [b, c])
                }).on(this.options.events.fieldStatus, function(b, c) {
                    var d = e.getOptions(c.field, null, "onStatus");
                    d && a.fn.bootstrapValidator.helpers.call(d, [b, c])
                }).on(this.options.events.validatorError, function(b, c) {
                    var d = e.getOptions(c.field, c.validator, "onError");
                    d && a.fn.bootstrapValidator.helpers.call(d, [b, c])
                }).on(this.options.events.validatorSuccess, function(b, c) {
                    var d = e.getOptions(c.field, c.validator, "onSuccess");
                    d && a.fn.bootstrapValidator.helpers.call(d, [b, c])
                }), k = a.map(j, function(a) {
                    return a + ".live.bv"
                }).join(" "), this.options.live) {
                    case "submitted":
                        break;
                    case "disabled":
                        c.off(k);
                        break;
                    case "enabled":
                    default:
                        c.off(k).on(k, function() {
                            e._exceedThreshold(a(this)) && e.validateField(a(this))
                        })
                }
                c.trigger(a.Event(this.options.events.fieldInit), {
                    bv: this,
                    field: b,
                    element: c
                })
            }
        },
        _getMessage: function(b, c) {
            if (!(this.options.fields[b] && a.fn.bootstrapValidator.validators[c] && this.options.fields[b].validators && this.options.fields[b].validators[c])) return "";
            var d = this.options.fields[b].validators[c];
            switch (!0) {
                case !!d.message:
                    return d.message;
                case !!this.options.fields[b].message:
                    return this.options.fields[b].message;
                case !!a.fn.bootstrapValidator.i18n[c]:
                    return a.fn.bootstrapValidator.i18n[c]["default"];
                default:
                    return this.options.message
            }
        },
        _getMessageContainer: function(a, b) {
            var c = a.parent();
            if (c.is(b)) return c;
            var d = c.attr("class");
            if (!d) return this._getMessageContainer(c, b);
            d = d.split(" ");
            for (var e = d.length, f = 0; e > f; f++)
                if (/^col-(xs|sm|md|lg)-\d+$/.test(d[f]) || /^col-(xs|sm|md|lg)-offset-\d+$/.test(d[f])) return c;
            return this._getMessageContainer(c, b)
        },
        _submit: function() {
            var b = this.isValid(),
                c = b ? this.options.events.formSuccess : this.options.events.formError,
                d = a.Event(c);
            this.$form.trigger(d), this.$submitButton && (b ? this._onSuccess(d) : this._onError(d))
        },
        _isExcluded: function(b) {
            var c = b.attr("data-bv-excluded"),
                d = b.attr("data-bv-field") || b.attr("name");
            switch (!0) {
                case !!d && this.options.fields && this.options.fields[d] && ("true" === this.options.fields[d].excluded || this.options.fields[d].excluded === !0):
                case "true" === c:
                case "" === c:
                    return !0;
                case !!d && this.options.fields && this.options.fields[d] && ("false" === this.options.fields[d].excluded || this.options.fields[d].excluded === !1):
                case "false" === c:
                    return !1;
                default:
                    if (this.options.excluded) {
                        "string" == typeof this.options.excluded && (this.options.excluded = a.map(this.options.excluded.split(","), function(b) {
                            return a.trim(b)
                        }));
                        for (var e = this.options.excluded.length, f = 0; e > f; f++)
                            if ("string" == typeof this.options.excluded[f] && b.is(this.options.excluded[f]) || "function" == typeof this.options.excluded[f] && this.options.excluded[f].call(this, b, this) === !0) return !0
                    }
                    return !1
            }
        },
        _exceedThreshold: function(b) {
            var c = b.attr("data-bv-field"),
                d = this.options.fields[c].threshold || this.options.threshold;
            if (!d) return !0;
            var e = -1 !== a.inArray(b.attr("type"), ["button", "checkbox", "file", "hidden", "image", "radio", "reset", "submit"]);
            return e || b.val().length >= d
        },
        _onError: function(b) {
            if (!b.isDefaultPrevented()) {
                if ("submitted" === this.options.live) {
                    this.options.live = "enabled";
                    var c = this;
                    for (var d in this.options.fields) ! function(b) {
                        var e = c.getFieldElements(b);
                        if (e.length) {
                            var f = a(e[0]).attr("type"),
                                g = "radio" === f || "checkbox" === f || "file" === f || "SELECT" === a(e[0]).get(0).tagName ? "change" : c._changeEvent,
                                h = c.options.fields[d].trigger || c.options.trigger || g,
                                i = a.map(h.split(" "), function(a) {
                                    return a + ".live.bv"
                                }).join(" ");
                            e.off(i).on(i, function() {
                                c._exceedThreshold(a(this)) && c.validateField(a(this))
                            })
                        }
                    }(d)
                }
                for (var e = 0; e < this.$invalidFields.length; e++) {
                    var f = this.$invalidFields.eq(e),
                        g = this._isOptionEnabled(f.attr("data-bv-field"), "autoFocus");
                    if (g) {
                        var h, i = f.parents(".tab-pane");
                        i && (h = i.attr("id")) && a('a[href="#' + h + '"][data-toggle="tab"]').tab("show"), f.focus();
                        break
                    }
                }
            }
        },
        _onSuccess: function(a) {
            a.isDefaultPrevented() || this.disableSubmitButtons(!0).defaultSubmit()
        },
        _onFieldValidated: function(b, c) {
            var d = b.attr("data-bv-field"),
                e = this.options.fields[d].validators,
                f = {},
                g = 0,
                h = {
                    bv: this,
                    field: d,
                    element: b,
                    validator: c,
                    result: b.data("bv.response." + c)
                };
            if (c) switch (b.data("bv.result." + c)) {
                case this.STATUS_INVALID:
                    b.trigger(a.Event(this.options.events.validatorError), h);
                    break;
                case this.STATUS_VALID:
                    b.trigger(a.Event(this.options.events.validatorSuccess), h)
            }
            f[this.STATUS_NOT_VALIDATED] = 0, f[this.STATUS_VALIDATING] = 0, f[this.STATUS_INVALID] = 0, f[this.STATUS_VALID] = 0;
            for (var i in e)
                if (e[i].enabled !== !1) {
                    g++;
                    var j = b.data("bv.result." + i);
                    j && f[j] ++
                }
            f[this.STATUS_VALID] === g ? (this.$invalidFields = this.$invalidFields.not(b), b.trigger(a.Event(this.options.events.fieldSuccess), h)) : (0 === f[this.STATUS_NOT_VALIDATED] || !this._isOptionEnabled(d, "verbose")) && 0 === f[this.STATUS_VALIDATING] && f[this.STATUS_INVALID] > 0 && (this.$invalidFields = this.$invalidFields.add(b), b.trigger(a.Event(this.options.events.fieldError), h))
        },
        _isOptionEnabled: function(a, b) {
            return !this.options.fields[a] || "true" !== this.options.fields[a][b] && this.options.fields[a][b] !== !0 ? !this.options.fields[a] || "false" !== this.options.fields[a][b] && this.options.fields[a][b] !== !1 ? "true" === this.options[b] || this.options[b] === !0 : !1 : !0
        },
        getFieldElements: function(b) {
            return this._cacheFields[b] || (this._cacheFields[b] = this.options.fields[b] && this.options.fields[b].selector ? a(this.options.fields[b].selector) : this.$form.find('[name="' + b + '"]')), this._cacheFields[b]
        },
        getOptions: function(a, b, c) {
            if (!a) return c ? this.options[c] : this.options;
            if ("object" == typeof a && (a = a.attr("data-bv-field")), !this.options.fields[a]) return null;
            var d = this.options.fields[a];
            return b ? d.validators && d.validators[b] ? c ? d.validators[b][c] : d.validators[b] : null : c ? d[c] : d
        },
        disableSubmitButtons: function(a) {
            return a ? "disabled" !== this.options.live && this.$form.find(this.options.submitButtons).attr("disabled", "disabled") : this.$form.find(this.options.submitButtons).removeAttr("disabled"), this
        },
        validate: function() {
            if (!this.options.fields) return this;
            this.disableSubmitButtons(!0), this._submitIfValid = !1;
            for (var a in this.options.fields) this.validateField(a);
            return this._submit(), this._submitIfValid = !0, this
        },
        validateField: function(b) {
            var c = a([]);
            switch (typeof b) {
                case "object":
                    c = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    c = this.getFieldElements(b)
            }
            if (0 === c.length || !this.options.fields[b] || this.options.fields[b].enabled === !1) return this;
            for (var d, e, f = this, g = c.attr("type"), h = "radio" === g || "checkbox" === g ? 1 : c.length, i = "radio" === g || "checkbox" === g, j = this.options.fields[b].validators, k = this._isOptionEnabled(b, "verbose"), l = 0; h > l; l++) {
                var m = c.eq(l);
                if (!this._isExcluded(m)) {
                    var n = !1;
                    for (d in j) {
                        if (m.data("bv.dfs." + d) && m.data("bv.dfs." + d).reject(), n) break;
                        var o = m.data("bv.result." + d);
                        if (o !== this.STATUS_VALID && o !== this.STATUS_INVALID)
                            if (j[d].enabled !== !1) {
                                if (m.data("bv.result." + d, this.STATUS_VALIDATING), e = a.fn.bootstrapValidator.validators[d].validate(this, m, j[d]), "object" == typeof e && e.resolve) this.updateStatus(i ? b : m, this.STATUS_VALIDATING, d), m.data("bv.dfs." + d, e), e.done(function(a, b, c) {
                                    a.removeData("bv.dfs." + b).data("bv.response." + b, c), c.message && f.updateMessage(a, b, c.message), f.updateStatus(i ? a.attr("data-bv-field") : a, c.valid ? f.STATUS_VALID : f.STATUS_INVALID, b), c.valid && f._submitIfValid === !0 ? f._submit() : c.valid || k || (n = !0)
                                });
                                else if ("object" == typeof e && void 0 !== e.valid && void 0 !== e.message) {
                                    if (m.data("bv.response." + d, e), this.updateMessage(i ? b : m, d, e.message), this.updateStatus(i ? b : m, e.valid ? this.STATUS_VALID : this.STATUS_INVALID, d), !e.valid && !k) break
                                } else if ("boolean" == typeof e && (m.data("bv.response." + d, e), this.updateStatus(i ? b : m, e ? this.STATUS_VALID : this.STATUS_INVALID, d), !e && !k)) break
                            } else this.updateStatus(i ? b : m, this.STATUS_VALID, d);
                        else this._onFieldValidated(m, d)
                    }
                }
            }
            return this
        },
        updateMessage: function(b, c, d) {
            var e = a([]);
            switch (typeof b) {
                case "object":
                    e = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    e = this.getFieldElements(b)
            }
            e.each(function() {
                a(this).data("bv.messages").find('.help-block[data-bv-validator="' + c + '"][data-bv-for="' + b + '"]').html(d)
            })
        },
		
        updateStatus: function(b, c, d) {
            var e = a([]);
            switch (typeof b) {
                case "object":
                    e = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    e = this.getFieldElements(b)
            }
            c === this.STATUS_NOT_VALIDATED && (this._submitIfValid = !1);
            for (var f = this, g = e.attr("type"), h = this.options.fields[b].group || this.options.group, i = "radio" === g || "checkbox" === g ? 1 : e.length, j = 0; i > j; j++) {
                var k = e.eq(j);
                if (!this._isExcluded(k)) {
                    var l = k.parents(h),
                        m = k.data("bv.messages"),
                        n = m.find('.help-block[data-bv-validator][data-bv-for="' + b + '"]'),
                        o = d ? n.filter('[data-bv-validator="' + d + '"]') : n,
                        p = k.data("bv.icon"),
                        q = "function" == typeof(this.options.fields[b].container || this.options.container) ? (this.options.fields[b].container || this.options.container).call(this, k, this) : this.options.fields[b].container || this.options.container,
                        r = null;
                    if (d) k.data("bv.result." + d, c);
                    else
                        for (var s in this.options.fields[b].validators) k.data("bv.result." + s, c);
                    o.attr("data-bv-result", c);
                    var t, u, v = k.parents(".tab-pane");
                    switch (v && (t = v.attr("id")) && (u = a('a[href="#' + t + '"][data-toggle="tab"]').parent()), c) {
                        case this.STATUS_VALIDATING:
                            r = null, this.disableSubmitButtons(!0), l.removeClass("has-success").removeClass("has-error"), p && p.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).addClass(this.options.feedbackIcons.validating).show(), u && u.removeClass("bv-tab-success").removeClass("bv-tab-error");
                            break;
                        case this.STATUS_INVALID:
                            r = !1, this.disableSubmitButtons(!0), l.removeClass("has-success").addClass("has-error"), p && p.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.validating).addClass(this.options.feedbackIcons.invalid).show(), u && u.removeClass("bv-tab-success").addClass("bv-tab-error");
                            break;
                        case this.STATUS_VALID:
                            r = 0 === n.filter('[data-bv-result="' + this.STATUS_NOT_VALIDATED + '"]').length ? n.filter('[data-bv-result="' + this.STATUS_VALID + '"]').length === n.length : null, null !== r && (this.disableSubmitButtons(this.$submitButton ? !this.isValid() : !r), p && p.removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).removeClass(this.options.feedbackIcons.valid).addClass(r ? this.options.feedbackIcons.valid : this.options.feedbackIcons.invalid).show()), l.removeClass("has-error has-success").addClass(this.isValidContainer(l) ? "has-success" : "has-error"), u && u.removeClass("bv-tab-success").removeClass("bv-tab-error").addClass(this.isValidContainer(v) ? "bv-tab-success" : "bv-tab-error");
                            break;
                        case this.STATUS_NOT_VALIDATED:
                        default:
                            r = null, this.disableSubmitButtons(!1), l.removeClass("has-success").removeClass("has-error"), p && p.removeClass(this.options.feedbackIcons.valid).removeClass(this.options.feedbackIcons.invalid).removeClass(this.options.feedbackIcons.validating).hide(), u && u.removeClass("bv-tab-success").removeClass("bv-tab-error")
                    }
                    switch (!0) {
                        case p && "tooltip" === q:
                            r === !1 ? p.css("cursor", "pointer").tooltip("destroy").tooltip({
                                container: "body",
                                html: !0,
                                placement: "auto top",
                                title: n.filter('[data-bv-result="' + f.STATUS_INVALID + '"]').eq(0).html()
                            }) : p.css("cursor", "").tooltip("destroy");
                            break;
                        case p && "popover" === q:
                            r === !1 ? p.css("cursor", "pointer").popover("destroy").popover({
                                container: "body",
                                content: n.filter('[data-bv-result="' + f.STATUS_INVALID + '"]').eq(0).html(),
                                html: !0,
                                placement: "auto top",
                                trigger: "hover click"
                            }) : p.css("cursor", "").popover("destroy");
                            break;
                        default:
                            c === this.STATUS_INVALID ? o.show() : o.hide()
                    }
                    k.trigger(a.Event(this.options.events.fieldStatus), {
                        bv: this,
                        field: b,
                        element: k,
                        status: c
                    }), this._onFieldValidated(k, d)
                }
            }
            return this
        },

		 /**
		* Reset the form
		*
		* @param {Boolean} resetFormData Reset current form data
		*/
		resetForm: function(resetFormData) {
			for (var field in this.options.fields) {
				this.dfds[field] = {};
				this.results[field] = {};
			// Mark all fields as not validated yet
		for (var v in this.options.fields[field].validators) {
		this.results[field][v] = this.STATUS_NOT_VALIDATED;
		}
		}
		this.invalidField = null;
		this.$submitButton = null;
		// Hide all error elements
		this.$form
		.find('.has-error').removeClass('has-error').end()
		.find('.has-success').removeClass('has-success').end()
		.find('.help-block[data-bs-validator]').hide();
		// Enable submit buttons
		this._disableSubmitButtons(false);
		// Hide all feeback icons
		if (this.options.feedbackIcons) {
		this.$form.find('.form-control-feedback').removeClass('glyphicon-ok').removeClass('glyphicon-remove').removeClass('glyphicon-refresh').hide();
		}
		if (resetFormData) {
		this.$form.reset();
		}
		},
        isValid: function() {
            for (var a in this.options.fields)
                if (!this.isValidField(a)) return !1;
            return !0
        },
        isValidField: function(b) {
            var c = a([]);
            switch (typeof b) {
                case "object":
                    c = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    c = this.getFieldElements(b)
            }
            if (0 === c.length || !this.options.fields[b] || this.options.fields[b].enabled === !1) return !0;
            for (var d, e, f, g = c.attr("type"), h = "radio" === g || "checkbox" === g ? 1 : c.length, i = 0; h > i; i++)
                if (d = c.eq(i), !this._isExcluded(d))
                    for (e in this.options.fields[b].validators)
                        if (this.options.fields[b].validators[e].enabled !== !1 && (f = d.data("bv.result." + e), f !== this.STATUS_VALID)) return !1;
            return !0
        },
        isValidContainer: function(b) {
            var c = this,
                d = {},
                e = "string" == typeof b ? a(b) : b;
            if (0 === e.length) return !0;
            e.find("[data-bv-field]").each(function() {
                var b = a(this),
                    e = b.attr("data-bv-field");
                c._isExcluded(b) || d[e] || (d[e] = b)
            });
            for (var f in d) {
                var g = d[f];
                if (g.data("bv.messages").find('.help-block[data-bv-validator][data-bv-for="' + f + '"]').filter('[data-bv-result="' + this.STATUS_INVALID + '"]').length > 0) return !1
            }
            return !0
        },
        defaultSubmit: function() {
            this.$submitButton && a("<input/>").attr("type", "hidden").attr("data-bv-submit-hidden", "").attr("name", this.$submitButton.attr("name")).val(this.$submitButton.val()).appendTo(this.$form), this.$form.off("submit.bv").submit()
        },
        getInvalidFields: function() {
            return this.$invalidFields
        },
        getSubmitButton: function() {
            return this.$submitButton
        },
        getMessages: function(b, c) {
            var d = this,
                e = [],
                f = a([]);
            switch (!0) {
                case b && "object" == typeof b:
                    f = b;
                    break;
                case b && "string" == typeof b:
                    var g = this.getFieldElements(b);
                    if (g.length > 0) {
                        var h = g.attr("type");
                        f = "radio" === h || "checkbox" === h ? g.eq(0) : g
                    }
                    break;
                default:
                    f = this.$invalidFields
            }
            var i = c ? '[data-bv-validator="' + c + '"]' : "";
            return f.each(function() {
                e = e.concat(a(this).data("bv.messages").find('.help-block[data-bv-for="' + a(this).attr("data-bv-field") + '"][data-bv-result="' + d.STATUS_INVALID + '"]' + i).map(function() {
                    var b = a(this).attr("data-bv-validator"),
                        c = a(this).attr("data-bv-for");
                    return d.options.fields[c].validators[b].enabled === !1 ? "" : a(this).html()
                }).get())
            }), e
        },
        updateOption: function(a, b, c, d) {
            return "object" == typeof a && (a = a.attr("data-bv-field")), this.options.fields[a] && this.options.fields[a].validators[b] && (this.options.fields[a].validators[b][c] = d, this.updateStatus(a, this.STATUS_NOT_VALIDATED, b)), this
        },
        addField: function(b, c) {
            var d = a([]);
            switch (typeof b) {
                case "object":
                    d = b, b = b.attr("data-bv-field") || b.attr("name");
                    break;
                case "string":
                    delete this._cacheFields[b], d = this.getFieldElements(b)
            }
            d.attr("data-bv-field", b);
            for (var e = d.attr("type"), f = "radio" === e || "checkbox" === e ? 1 : d.length, g = 0; f > g; g++) {
                var h = d.eq(g),
                    i = this._parseOptions(h);
                i = null === i ? c : a.extend(!0, c, i), this.options.fields[b] = a.extend(!0, this.options.fields[b], i), this._cacheFields[b] = this._cacheFields[b] ? this._cacheFields[b].add(h) : h, this._initField("checkbox" === e || "radio" === e ? b : h)
            }
            return this.disableSubmitButtons(!1), this.$form.trigger(a.Event(this.options.events.fieldAdded), {
                field: b,
                element: d,
                options: this.options.fields[b]
            }), this
        },
        removeField: function(b) {
            var c = a([]);
            switch (typeof b) {
                case "object":
                    c = b, b = b.attr("data-bv-field") || b.attr("name"), c.attr("data-bv-field", b);
                    break;
                case "string":
                    c = this.getFieldElements(b)
            }
            if (0 === c.length) return this;
            for (var d = c.attr("type"), e = "radio" === d || "checkbox" === d ? 1 : c.length, f = 0; e > f; f++) {
                var g = c.eq(f);
                this.$invalidFields = this.$invalidFields.not(g), this._cacheFields[b] = this._cacheFields[b].not(g)
            }
            return this._cacheFields[b] && 0 !== this._cacheFields[b].length || delete this.options.fields[b], ("checkbox" === d || "radio" === d) && this._initField(b), this.disableSubmitButtons(!1), this.$form.trigger(a.Event(this.options.events.fieldRemoved), {
                field: b,
                element: c
            }), this
        },
        resetField: function(b, c) {
            var d = a([]);
            switch (typeof b) {
                case "object":
                    d = b, b = b.attr("data-bv-field");
                    break;
                case "string":
                    d = this.getFieldElements(b)
            }
            var e = d.length;
            if (this.options.fields[b])
                for (var f = 0; e > f; f++)
                    for (var g in this.options.fields[b].validators) d.eq(f).removeData("bv.dfs." + g);
            if (this.updateStatus(b, this.STATUS_NOT_VALIDATED), c) {
                var h = d.attr("type");
                "radio" === h || "checkbox" === h ? d.removeAttr("checked").removeAttr("selected") : d.val("")
            }
            return this
        },
        resetForm: function(b) {
            for (var c in this.options.fields) this.resetField(c, b);
            return this.$invalidFields = a([]), this.$submitButton = null, this.disableSubmitButtons(!1), this
        },
        revalidateField: function(a) {
            return this.updateStatus(a, this.STATUS_NOT_VALIDATED).validateField(a), this
        },
        enableFieldValidators: function(a, b, c) {
            var d = this.options.fields[a].validators;
            if (c && d && d[c] && d[c].enabled !== b) this.options.fields[a].validators[c].enabled = b, this.updateStatus(a, this.STATUS_NOT_VALIDATED, c);
            else if (!c && this.options.fields[a].enabled !== b) {
                this.options.fields[a].enabled = b;
                for (var e in d) this.enableFieldValidators(a, b, e)
            }
            return this
        },
        getDynamicOption: function(b, c) {
            var d = "string" == typeof b ? this.getFieldElements(b) : b,
                e = d.val();
            if ("function" == typeof c) return a.fn.bootstrapValidator.helpers.call(c, [e, this, d]);
            if ("string" == typeof c) {
                var f = this.getFieldElements(c);
                return f.length ? f.val() : a.fn.bootstrapValidator.helpers.call(c, [e, this, d]) || c
            }
            return null
        },
        destroy: function() {
            var b, c, d, e, f, g;
            for (b in this.options.fields) {
                c = this.getFieldElements(b), g = this.options.fields[b].group || this.options.group;
                for (var h = 0; h < c.length; h++) {
                    if (d = c.eq(h), d.data("bv.messages").find('.help-block[data-bv-validator][data-bv-for="' + b + '"]').remove().end().end().removeData("bv.messages").parents(g).removeClass("has-feedback has-error has-success").end().off(".bv").removeAttr("data-bv-field"), f = d.data("bv.icon")) {
                        var i = "function" == typeof(this.options.fields[b].container || this.options.container) ? (this.options.fields[b].container || this.options.container).call(this, d, this) : this.options.fields[b].container || this.options.container;
                        switch (i) {
                            case "tooltip":
                                f.tooltip("destroy").remove();
                                break;
                            case "popover":
                                f.popover("destroy").remove();
                                break;
                            default:
                                f.remove()
                        }
                    }
                    d.removeData("bv.icon");
                    for (e in this.options.fields[b].validators) d.data("bv.dfs." + e) && d.data("bv.dfs." + e).reject(), d.removeData("bv.result." + e).removeData("bv.response." + e).removeData("bv.dfs." + e), "function" == typeof a.fn.bootstrapValidator.validators[e].destroy && a.fn.bootstrapValidator.validators[e].destroy(this, d, this.options.fields[b].validators[e])
                }
            }
            this.disableSubmitButtons(!1), this.$hiddenButton.remove(), this.$form.removeClass(this.options.elementClass).off(".bv").removeData("bootstrapValidator").find("[data-bv-submit-hidden]").remove().end().find('[type="submit"]').off("click.bv")
        }
    }, a.fn.bootstrapValidator = function(c) {
        var d = arguments;
        return this.each(function() {
            var e = a(this),
                f = e.data("bootstrapValidator"),
                g = "object" == typeof c && c;
            f || (f = new b(this, g), e.data("bootstrapValidator", f)), "string" == typeof c && f[c].apply(f, Array.prototype.slice.call(d, 1))
        })
    }, a.fn.bootstrapValidator.DEFAULT_OPTIONS = {
        autoFocus: !0,
        container: null,
        elementClass: "bv-form",
        events: {
            formInit: "init.form.bv",
            formError: "error.form.bv",
            formSuccess: "success.form.bv",
            fieldAdded: "added.field.bv",
            fieldRemoved: "removed.field.bv",
            fieldInit: "init.field.bv",
            fieldError: "error.field.bv",
            fieldSuccess: "success.field.bv",
            fieldStatus: "status.field.bv",
            validatorError: "error.validator.bv",
            validatorSuccess: "success.validator.bv"
        },
        excluded: [":disabled", ":hidden", ":not(:visible)"],
        feedbackIcons: {
            valid: null,
            invalid: null,
            validating: null
        },
        fields: null,
        group: ".form-group",
        live: "enabled",
        message: "This value is not valid",
        submitButtons: '[type="submit"]',
        threshold: null,
        verbose: !0
    }, a.fn.bootstrapValidator.validators = {}, a.fn.bootstrapValidator.i18n = {}, a.fn.bootstrapValidator.Constructor = b, a.fn.bootstrapValidator.helpers = {
        call: function(a, b) {
            if ("function" == typeof a) return a.apply(this, b);
            if ("string" == typeof a) {
                "()" === a.substring(a.length - 2) && (a = a.substring(0, a.length - 2));
                for (var c = a.split("."), d = c.pop(), e = window, f = 0; f < c.length; f++) e = e[c[f]];
                return "undefined" == typeof e[d] ? null : e[d].apply(this, b)
            }
        },
        format: function(b, c) {
            a.isArray(c) || (c = [c]);
            for (var d in c) b = b.replace("%s", c[d]);
            return b
        },
        date: function(a, b, c, d) {
            if (isNaN(a) || isNaN(b) || isNaN(c)) return !1;
            if (c.length > 2 || b.length > 2 || a.length > 4) return !1;
            if (c = parseInt(c, 10), b = parseInt(b, 10), a = parseInt(a, 10), 1e3 > a || a > 9999 || 0 >= b || b > 12) return !1;
            var e = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if ((a % 400 === 0 || a % 100 !== 0 && a % 4 === 0) && (e[1] = 29), 0 >= c || c > e[b - 1]) return !1;
            if (d === !0) {
                var f = new Date,
                    g = f.getFullYear(),
                    h = f.getMonth(),
                    i = f.getDate();
                return g > a || a === g && h > b - 1 || a === g && b - 1 === h && i > c
            }
            return !0
        },
        luhn: function(a) {
            for (var b = a.length, c = 0, d = [
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                    [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
                ], e = 0; b--;) e += d[c][parseInt(a.charAt(b), 10)], c ^= 1;
            return e % 10 === 0 && e > 0
        },
        mod11And10: function(a) {
            for (var b = 5, c = a.length, d = 0; c > d; d++) b = (2 * (b || 10) % 11 + parseInt(a.charAt(d), 10)) % 10;
            return 1 === b
        },
        mod37And36: function(a, b) {
            b = b || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (var c = b.length, d = a.length, e = Math.floor(c / 2), f = 0; d > f; f++) e = (2 * (e || c) % (c + 1) + b.indexOf(a.charAt(f))) % c;
            return 1 === e
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.base64 = a.extend(a.fn.bootstrapValidator.i18n.base64 || {}, {
        "default": "Please enter a valid base 64 encoded"
    }), a.fn.bootstrapValidator.validators.base64 = {
        validate: function(a, b) {
            var c = b.val();
            return "" === c ? !0 : /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.between = a.extend(a.fn.bootstrapValidator.i18n.between || {}, {
        "default": "Please enter a value between %s and %s",
        notInclusive: "Please enter a value between %s and %s strictly"
    }), a.fn.bootstrapValidator.validators.between = {
        html5Attributes: {
            message: "message",
            min: "min",
            max: "max",
            inclusive: "inclusive"
        },
        enableByHtml5: function(a) {
            return "range" === a.attr("type") ? {
                min: a.attr("min"),
                max: a.attr("max")
            } : !1
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            if (e = this._format(e), !a.isNumeric(e)) return !1;
            var f = a.isNumeric(d.min) ? d.min : b.getDynamicOption(c, d.min),
                g = a.isNumeric(d.max) ? d.max : b.getDynamicOption(c, d.max),
                h = this._format(f),
                i = this._format(g);
            return e = parseFloat(e), d.inclusive === !0 || void 0 === d.inclusive ? {
                valid: e >= h && i >= e,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.between["default"], [f, g])
            } : {
                valid: e > h && i > e,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.between.notInclusive, [f, g])
            }
        },
        _format: function(a) {
            return (a + "").replace(",", ".")
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.validators.blank = {
        validate: function() {
            return !0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.callback = a.extend(a.fn.bootstrapValidator.i18n.callback || {}, {
        "default": "Please enter a valid value"
    }), a.fn.bootstrapValidator.validators.callback = {
        html5Attributes: {
            message: "message",
            callback: "callback"
        },
        validate: function(b, c, d) {
            var e = c.val(),
                f = new a.Deferred,
                g = {
                    valid: !0
                };
            if (d.callback) {
                var h = a.fn.bootstrapValidator.helpers.call(d.callback, [e, b, c]);
                g = "boolean" == typeof h ? {
                    valid: h
                } : h
            }
            return f.resolve(c, "callback", g), f
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.choice = a.extend(a.fn.bootstrapValidator.i18n.choice || {}, {
        "default": "Please enter a valid value",
        less: "Please choose %s options at minimum",
        more: "Please choose %s options at maximum",
        between: "Please choose %s - %s options"
    }), a.fn.bootstrapValidator.validators.choice = {
        html5Attributes: {
            message: "message",
            min: "min",
            max: "max"
        },
        validate: function(b, c, d) {
            var e = c.is("select") ? b.getFieldElements(c.attr("data-bv-field")).find("option").filter(":selected").length : b.getFieldElements(c.attr("data-bv-field")).filter(":checked").length,
                f = d.min ? a.isNumeric(d.min) ? d.min : b.getDynamicOption(c, d.min) : null,
                g = d.max ? a.isNumeric(d.max) ? d.max : b.getDynamicOption(c, d.max) : null,
                h = !0,
                i = d.message || a.fn.bootstrapValidator.i18n.choice["default"];
            switch ((f && e < parseInt(f, 10) || g && e > parseInt(g, 10)) && (h = !1), !0) {
                case !!f && !!g:
                    i = a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.choice.between, [parseInt(f, 10), parseInt(g, 10)]);
                    break;
                case !!f:
                    i = a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.choice.less, parseInt(f, 10));
                    break;
                case !!g:
                    i = a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.choice.more, parseInt(g, 10))
            }
            return {
                valid: h,
                message: i
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.color = a.extend(a.fn.bootstrapValidator.i18n.color || {}, {
        "default": "Please enter a valid color"
    }), a.fn.bootstrapValidator.validators.color = {
        SUPPORTED_TYPES: ["hex", "rgb", "rgba", "hsl", "hsla", "keyword"],
        KEYWORD_COLORS: ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "transparent", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f = d.type || this.SUPPORTED_TYPES;
            a.isArray(f) || (f = f.replace(/s/g, "").split(","));
            for (var g, h, i = !1, j = 0; j < f.length; j++)
                if (h = f[j], g = "_" + h.toLowerCase(), i = i || this[g](e)) return !0;
            return !1
        },
        _hex: function(a) {
            return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a)
        },
        _hsl: function(a) {
            return /^hsl\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/.test(a)
        },
        _hsla: function(a) {
            return /^hsla\((\s*(-?\d+)\s*,)(\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/.test(a)
        },
        _keyword: function(b) {
            return a.inArray(b, this.KEYWORD_COLORS) >= 0
        },
        _rgb: function(a) {
            var b = /^rgb\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){2}(\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*)\)$/,
                c = /^rgb\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){2}(\s*(\b(0?\d{1,2}|100)\b%)\s*)\)$/;
            return b.test(a) || c.test(a)
        },
        _rgba: function(a) {
            var b = /^rgba\((\s*(\b([01]?\d{1,2}|2[0-4]\d|25[0-5])\b)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/,
                c = /^rgba\((\s*(\b(0?\d{1,2}|100)\b%)\s*,){3}(\s*(0?(\.\d+)?|1(\.0+)?)\s*)\)$/;
            return b.test(a) || c.test(a)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.creditCard = a.extend(a.fn.bootstrapValidator.i18n.creditCard || {}, {
        "default": "Please enter a valid credit card number"
    }), a.fn.bootstrapValidator.validators.creditCard = {
        validate: function(b, c) {
            var d = c.val();
            if ("" === d) return !0;
            if (/[^0-9-\s]+/.test(d)) return !1;
            if (d = d.replace(/\D/g, ""), !a.fn.bootstrapValidator.helpers.luhn(d)) return !1;
            var e, f, g = {
                AMERICAN_EXPRESS: {
                    length: [15],
                    prefix: ["34", "37"]
                },
                DINERS_CLUB: {
                    length: [14],
                    prefix: ["300", "301", "302", "303", "304", "305", "36"]
                },
                DINERS_CLUB_US: {
                    length: [16],
                    prefix: ["54", "55"]
                },
                DISCOVER: {
                    length: [16],
                    prefix: ["6011", "622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925", "644", "645", "646", "647", "648", "649", "65"]
                },
                JCB: {
                    length: [16],
                    prefix: ["3528", "3529", "353", "354", "355", "356", "357", "358"]
                },
                LASER: {
                    length: [16, 17, 18, 19],
                    prefix: ["6304", "6706", "6771", "6709"]
                },
                MAESTRO: {
                    length: [12, 13, 14, 15, 16, 17, 18, 19],
                    prefix: ["5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763", "6764", "6765", "6766"]
                },
                MASTERCARD: {
                    length: [16],
                    prefix: ["51", "52", "53", "54", "55"]
                },
                SOLO: {
                    length: [16, 18, 19],
                    prefix: ["6334", "6767"]
                },
                UNIONPAY: {
                    length: [16, 17, 18, 19],
                    prefix: ["622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925"]
                },
                VISA: {
                    length: [16],
                    prefix: ["4"]
                }
            };
            for (e in g)
                for (f in g[e].prefix)
                    if (d.substr(0, g[e].prefix[f].length) === g[e].prefix[f] && -1 !== a.inArray(d.length, g[e].length)) return !0;
            return !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.cusip = a.extend(a.fn.bootstrapValidator.i18n.cusip || {}, {
        "default": "Please enter a valid CUSIP number"
    }), a.fn.bootstrapValidator.validators.cusip = {
        validate: function(b, c) {
            var d = c.val();
            if ("" === d) return !0;
            if (d = d.toUpperCase(), !/^[0-9A-Z]{9}$/.test(d)) return !1;
            for (var e = a.map(d.split(""), function(a) {
                    var b = a.charCodeAt(0);
                    return b >= "A".charCodeAt(0) && b <= "Z".charCodeAt(0) ? b - "A".charCodeAt(0) + 10 : a
                }), f = e.length, g = 0, h = 0; f - 1 > h; h++) {
                var i = parseInt(e[h], 10);
                h % 2 !== 0 && (i *= 2), i > 9 && (i -= 9), g += i
            }
            return g = (10 - g % 10) % 10, g === e[f - 1]
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.cvv = a.extend(a.fn.bootstrapValidator.i18n.cvv || {}, {
        "default": "Please enter a valid CVV number"
    }), a.fn.bootstrapValidator.validators.cvv = {
        html5Attributes: {
            message: "message",
            ccfield: "creditCardField"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            if (!/^[0-9]{3,4}$/.test(e)) return !1;
            if (!d.creditCardField) return !0;
            var f = b.getFieldElements(d.creditCardField).val();
            if ("" === f) return !0;
            f = f.replace(/\D/g, "");
            var g, h, i = {
                    AMERICAN_EXPRESS: {
                        length: [15],
                        prefix: ["34", "37"]
                    },
                    DINERS_CLUB: {
                        length: [14],
                        prefix: ["300", "301", "302", "303", "304", "305", "36"]
                    },
                    DINERS_CLUB_US: {
                        length: [16],
                        prefix: ["54", "55"]
                    },
                    DISCOVER: {
                        length: [16],
                        prefix: ["6011", "622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925", "644", "645", "646", "647", "648", "649", "65"]
                    },
                    JCB: {
                        length: [16],
                        prefix: ["3528", "3529", "353", "354", "355", "356", "357", "358"]
                    },
                    LASER: {
                        length: [16, 17, 18, 19],
                        prefix: ["6304", "6706", "6771", "6709"]
                    },
                    MAESTRO: {
                        length: [12, 13, 14, 15, 16, 17, 18, 19],
                        prefix: ["5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763", "6764", "6765", "6766"]
                    },
                    MASTERCARD: {
                        length: [16],
                        prefix: ["51", "52", "53", "54", "55"]
                    },
                    SOLO: {
                        length: [16, 18, 19],
                        prefix: ["6334", "6767"]
                    },
                    UNIONPAY: {
                        length: [16, 17, 18, 19],
                        prefix: ["622126", "622127", "622128", "622129", "62213", "62214", "62215", "62216", "62217", "62218", "62219", "6222", "6223", "6224", "6225", "6226", "6227", "6228", "62290", "62291", "622920", "622921", "622922", "622923", "622924", "622925"]
                    },
                    VISA: {
                        length: [16],
                        prefix: ["4"]
                    }
                },
                j = null;
            for (g in i)
                for (h in i[g].prefix)
                    if (f.substr(0, i[g].prefix[h].length) === i[g].prefix[h] && -1 !== a.inArray(f.length, i[g].length)) {
                        j = g;
                        break
                    }
            return null === j ? !1 : "AMERICAN_EXPRESS" === j ? 4 === e.length : 3 === e.length
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.date = a.extend(a.fn.bootstrapValidator.i18n.date || {}, {
        "default": "Please enter a valid date",
        min: "Please enter a date after %s",
        max: "Please enter a date before %s",
        range: "Please enter a date in the range %s - %s"
    }), a.fn.bootstrapValidator.validators.date = {
        html5Attributes: {
            message: "message",
            format: "format",
            min: "min",
            max: "max",
            separator: "separator"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            d.format = d.format || "MM/DD/YYYY", "date" === c.attr("type") && (d.format = "YYYY-MM-DD");
            var f = d.format.split(" "),
                g = f[0],
                h = f.length > 1 ? f[1] : null,
                i = f.length > 2 ? f[2] : null,
                j = e.split(" "),
                k = j[0],
                l = j.length > 1 ? j[1] : null;
            if (f.length !== j.length) return {
                valid: !1,
                message: d.message || a.fn.bootstrapValidator.i18n.date["default"]
            };
            var m = d.separator;
            if (m || (m = -1 !== k.indexOf("/") ? "/" : -1 !== k.indexOf("-") ? "-" : null), null === m || -1 === k.indexOf(m)) return {
                valid: !1,
                message: d.message || a.fn.bootstrapValidator.i18n.date["default"]
            };
            if (k = k.split(m), g = g.split(m), k.length !== g.length) return {
                valid: !1,
                message: d.message || a.fn.bootstrapValidator.i18n.date["default"]
            };
            var n = k[a.inArray("YYYY", g)],
                o = k[a.inArray("MM", g)],
                p = k[a.inArray("DD", g)];
            if (!n || !o || !p || 4 !== n.length) return {
                valid: !1,
                message: d.message || a.fn.bootstrapValidator.i18n.date["default"]
            };
            var q = null,
                r = null,
                s = null;
            if (h) {
                if (h = h.split(":"), l = l.split(":"), h.length !== l.length) return {
                    valid: !1,
                    message: d.message || a.fn.bootstrapValidator.i18n.date["default"]
                };
                if (r = l.length > 0 ? l[0] : null, q = l.length > 1 ? l[1] : null, s = l.length > 2 ? l[2] : null) {
                    if (isNaN(s) || s.length > 2) return {
                        valid: !1,
                        message: d.message || a.fn.bootstrapValidator.i18n.date["default"]
                    };
                    if (s = parseInt(s, 10), 0 > s || s > 60) return {
                        valid: !1,
                        message: d.message || a.fn.bootstrapValidator.i18n.date["default"]
                    }
                }
                if (r) {
                    if (isNaN(r) || r.length > 2) return {
                        valid: !1,
                        message: d.message || a.fn.bootstrapValidator.i18n.date["default"]
                    };
                    if (r = parseInt(r, 10), 0 > r || r >= 24 || i && r > 12) return {
                        valid: !1,
                        message: d.message || a.fn.bootstrapValidator.i18n.date["default"]
                    }
                }
                if (q) {
                    if (isNaN(q) || q.length > 2) return {
                        valid: !1,
                        message: d.message || a.fn.bootstrapValidator.i18n.date["default"]
                    };
                    if (q = parseInt(q, 10), 0 > q || q > 59) return {
                        valid: !1,
                        message: d.message || a.fn.bootstrapValidator.i18n.date["default"]
                    }
                }
            }
            var t = a.fn.bootstrapValidator.helpers.date(n, o, p),
                u = d.message || a.fn.bootstrapValidator.i18n.date["default"],
                v = null,
                w = null,
                x = d.min,
                y = d.max;
            switch (x && (isNaN(Date.parse(x)) && (x = b.getDynamicOption(c, x)), v = this._parseDate(x, g, m)), y && (isNaN(Date.parse(y)) && (y = b.getDynamicOption(c, y)), w = this._parseDate(y, g, m)), k = new Date(n, o, p, r, q, s), !0) {
                case x && !y && t:
                    t = k.getTime() >= v.getTime(), u = d.message || a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.date.min, x);
                    break;
                case y && !x && t:
                    t = k.getTime() <= w.getTime(), u = d.message || a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.date.max, y);
                    break;
                case y && x && t:
                    t = k.getTime() <= w.getTime() && k.getTime() >= v.getTime(), u = d.message || a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.date.range, [x, y])
            }
            return {
                valid: t,
                message: u
            }
        },
        _parseDate: function(b, c, d) {
            var e = 0,
                f = 0,
                g = 0,
                h = b.split(" "),
                i = h[0],
                j = h.length > 1 ? h[1] : null;
            i = i.split(d);
            var k = i[a.inArray("YYYY", c)],
                l = i[a.inArray("MM", c)],
                m = i[a.inArray("DD", c)];
            return j && (j = j.split(":"), f = j.length > 0 ? j[0] : null, e = j.length > 1 ? j[1] : null, g = j.length > 2 ? j[2] : null), new Date(k, l, m, f, e, g)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.different = a.extend(a.fn.bootstrapValidator.i18n.different || {}, {
        "default": "Please enter a different value"
    }), a.fn.bootstrapValidator.validators.different = {
        html5Attributes: {
            message: "message",
            field: "field"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" === d) return !0;
            for (var e = c.field.split(","), f = !0, g = 0; g < e.length; g++) {
                var h = a.getFieldElements(e[g]);
                if (null != h && 0 !== h.length) {
                    var i = h.val();
                    d === i ? f = !1 : "" !== i && a.updateStatus(h, a.STATUS_VALID, "different")
                }
            }
            return f
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.digits = a.extend(a.fn.bootstrapValidator.i18n.digits || {}, {
        "default": "Please enter only digits"
    }), a.fn.bootstrapValidator.validators.digits = {
        validate: function(a, b) {
            var c = b.val();
            return "" === c ? !0 : /^\d+$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.ean = a.extend(a.fn.bootstrapValidator.i18n.ean || {}, {
        "default": "Please enter a valid EAN number"
    }), a.fn.bootstrapValidator.validators.ean = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            if (!/^(\d{8}|\d{12}|\d{13})$/.test(c)) return !1;
            for (var d = c.length, e = 0, f = 8 === d ? [3, 1] : [1, 3], g = 0; d - 1 > g; g++) e += parseInt(c.charAt(g), 10) * f[g % 2];
            return e = (10 - e % 10) % 10, e + "" === c.charAt(d - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.emailAddress = a.extend(a.fn.bootstrapValidator.i18n.emailAddress || {}, {
        "default": "Please enter a valid email address"
    }), a.fn.bootstrapValidator.validators.emailAddress = {
        html5Attributes: {
            message: "message",
            multiple: "multiple",
            separator: "separator"
        },
        enableByHtml5: function(a) {
            return "email" === a.attr("type")
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" === d) return !0;
            var e = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                f = c.multiple === !0 || "true" === c.multiple;
            if (f) {
                for (var g = c.separator || /[,;]/, h = this._splitEmailAddresses(d, g), i = 0; i < h.length; i++)
                    if (!e.test(h[i])) return !1;
                return !0
            }
            return e.test(d)
        },
        _splitEmailAddresses: function(a, b) {
            for (var c = a.split(/"/), d = c.length, e = [], f = "", g = 0; d > g; g++)
                if (g % 2 === 0) {
                    var h = c[g].split(b),
                        i = h.length;
                    if (1 === i) f += h[0];
                    else {
                        e.push(f + h[0]);
                        for (var j = 1; i - 1 > j; j++) e.push(h[j]);
                        f = h[i - 1]
                    }
                } else f += '"' + c[g], d - 1 > g && (f += '"');
            return e.push(f), e
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.file = a.extend(a.fn.bootstrapValidator.i18n.file || {}, {
        "default": "Please choose a valid file"
    }), a.fn.bootstrapValidator.validators.file = {
        html5Attributes: {
            extension: "extension",
            maxfiles: "maxFiles",
            minfiles: "minFiles",
            maxsize: "maxSize",
            minsize: "minSize",
            maxtotalsize: "maxTotalSize",
            mintotalsize: "minTotalSize",
            message: "message",
            type: "type"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f, g = d.extension ? d.extension.toLowerCase().split(",") : null,
                h = d.type ? d.type.toLowerCase().split(",") : null,
                i = window.File && window.FileList && window.FileReader;
            if (i) {
                var j = c.get(0).files,
                    k = j.length,
                    l = 0;
                if (d.maxFiles && k > parseInt(d.maxFiles, 10) || d.minFiles && k < parseInt(d.minFiles, 10)) return !1;
                for (var m = 0; k > m; m++)
                    if (l += j[m].size, f = j[m].name.substr(j[m].name.lastIndexOf(".") + 1), d.minSize && j[m].size < parseInt(d.minSize, 10) || d.maxSize && j[m].size > parseInt(d.maxSize, 10) || g && -1 === a.inArray(f.toLowerCase(), g) || j[m].type && h && -1 === a.inArray(j[m].type.toLowerCase(), h)) return !1;
                if (d.maxTotalSize && l > parseInt(d.maxTotalSize, 10) || d.minTotalSize && l < parseInt(d.minTotalSize, 10)) return !1
            } else if (f = e.substr(e.lastIndexOf(".") + 1), g && -1 === a.inArray(f.toLowerCase(), g)) return !1;
            return !0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.greaterThan = a.extend(a.fn.bootstrapValidator.i18n.greaterThan || {}, {
        "default": "Please enter a value greater than or equal to %s",
        notInclusive: "Please enter a value greater than %s"
    }), a.fn.bootstrapValidator.validators.greaterThan = {
        html5Attributes: {
            message: "message",
            value: "value",
            inclusive: "inclusive"
        },
        enableByHtml5: function(a) {
            var b = a.attr("type"),
                c = a.attr("min");
            return c && "date" !== b ? {
                value: c
            } : !1
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            if (e = this._format(e), !a.isNumeric(e)) return !1;
            var f = a.isNumeric(d.value) ? d.value : b.getDynamicOption(c, d.value),
                g = this._format(f);
            return e = parseFloat(e), d.inclusive === !0 || void 0 === d.inclusive ? {
                valid: e >= g,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.greaterThan["default"], f)
            } : {
                valid: e > g,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.greaterThan.notInclusive, f)
            }
        },
        _format: function(a) {
            return (a + "").replace(",", ".")
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.grid = a.extend(a.fn.bootstrapValidator.i18n.grid || {}, {
        "default": "Please enter a valid GRId number"
    }), a.fn.bootstrapValidator.validators.grid = {
        validate: function(b, c) {
            var d = c.val();
            return "" === d ? !0 : (d = d.toUpperCase(), /^[GRID:]*([0-9A-Z]{2})[-\s]*([0-9A-Z]{5})[-\s]*([0-9A-Z]{10})[-\s]*([0-9A-Z]{1})$/g.test(d) ? (d = d.replace(/\s/g, "").replace(/-/g, ""), "GRID:" === d.substr(0, 5) && (d = d.substr(5)), a.fn.bootstrapValidator.helpers.mod37And36(d)) : !1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.hex = a.extend(a.fn.bootstrapValidator.i18n.hex || {}, {
        "default": "Please enter a valid hexadecimal number"
    }), a.fn.bootstrapValidator.validators.hex = {
        validate: function(a, b) {
            var c = b.val();
            return "" === c ? !0 : /^[0-9a-fA-F]+$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.hexColor = a.extend(a.fn.bootstrapValidator.i18n.hexColor || {}, {
        "default": "Please enter a valid hex color"
    }), a.fn.bootstrapValidator.validators.hexColor = {
        enableByHtml5: function(a) {
            return "color" === a.attr("type")
        },
        validate: function(a, b) {
            var c = b.val();
            return "" === c ? !0 : "color" === b.attr("type") ? /^#[0-9A-F]{6}$/i.test(c) : /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.iban = a.extend(a.fn.bootstrapValidator.i18n.iban || {}, {
        "default": "Please enter a valid IBAN number",
        countryNotSupported: "The country code %s is not supported",
        country: "Please enter a valid IBAN number in %s",
        countries: {
            AD: "Andorra",
            AE: "United Arab Emirates",
            AL: "Albania",
            AO: "Angola",
            AT: "Austria",
            AZ: "Azerbaijan",
            BA: "Bosnia and Herzegovina",
            BE: "Belgium",
            BF: "Burkina Faso",
            BG: "Bulgaria",
            BH: "Bahrain",
            BI: "Burundi",
            BJ: "Benin",
            BR: "Brazil",
            CH: "Switzerland",
            CI: "Ivory Coast",
            CM: "Cameroon",
            CR: "Costa Rica",
            CV: "Cape Verde",
            CY: "Cyprus",
            CZ: "Czech Republic",
            DE: "Germany",
            DK: "Denmark",
            DO: "Dominican Republic",
            DZ: "Algeria",
            EE: "Estonia",
            ES: "Spain",
            FI: "Finland",
            FO: "Faroe Islands",
            FR: "France",
            GB: "United Kingdom",
            GE: "Georgia",
            GI: "Gibraltar",
            GL: "Greenland",
            GR: "Greece",
            GT: "Guatemala",
            HR: "Croatia",
            HU: "Hungary",
            IE: "Ireland",
            IL: "Israel",
            IR: "Iran",
            IS: "Iceland",
            IT: "Italy",
            JO: "Jordan",
            KW: "Kuwait",
            KZ: "Kazakhstan",
            LB: "Lebanon",
            LI: "Liechtenstein",
            LT: "Lithuania",
            LU: "Luxembourg",
            LV: "Latvia",
            MC: "Monaco",
            MD: "Moldova",
            ME: "Montenegro",
            MG: "Madagascar",
            MK: "Macedonia",
            ML: "Mali",
            MR: "Mauritania",
            MT: "Malta",
            MU: "Mauritius",
            MZ: "Mozambique",
            NL: "Netherlands",
            NO: "Norway",
            PK: "Pakistan",
            PL: "Poland",
            PS: "Palestine",
            PT: "Portugal",
            QA: "Qatar",
            RO: "Romania",
            RS: "Serbia",
            SA: "Saudi Arabia",
            SE: "Sweden",
            SI: "Slovenia",
            SK: "Slovakia",
            SM: "San Marino",
            SN: "Senegal",
            TN: "Tunisia",
            TR: "Turkey",
            VG: "Virgin Islands, British"
        }
    }), a.fn.bootstrapValidator.validators.iban = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        REGEX: {
            AD: "AD[0-9]{2}[0-9]{4}[0-9]{4}[A-Z0-9]{12}",
            AE: "AE[0-9]{2}[0-9]{3}[0-9]{16}",
            AL: "AL[0-9]{2}[0-9]{8}[A-Z0-9]{16}",
            AO: "AO[0-9]{2}[0-9]{21}",
            AT: "AT[0-9]{2}[0-9]{5}[0-9]{11}",
            AZ: "AZ[0-9]{2}[A-Z]{4}[A-Z0-9]{20}",
            BA: "BA[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{8}[0-9]{2}",
            BE: "BE[0-9]{2}[0-9]{3}[0-9]{7}[0-9]{2}",
            BF: "BF[0-9]{2}[0-9]{23}",
            BG: "BG[0-9]{2}[A-Z]{4}[0-9]{4}[0-9]{2}[A-Z0-9]{8}",
            BH: "BH[0-9]{2}[A-Z]{4}[A-Z0-9]{14}",
            BI: "BI[0-9]{2}[0-9]{12}",
            BJ: "BJ[0-9]{2}[A-Z]{1}[0-9]{23}",
            BR: "BR[0-9]{2}[0-9]{8}[0-9]{5}[0-9]{10}[A-Z][A-Z0-9]",
            CH: "CH[0-9]{2}[0-9]{5}[A-Z0-9]{12}",
            CI: "CI[0-9]{2}[A-Z]{1}[0-9]{23}",
            CM: "CM[0-9]{2}[0-9]{23}",
            CR: "CR[0-9]{2}[0-9]{3}[0-9]{14}",
            CV: "CV[0-9]{2}[0-9]{21}",
            CY: "CY[0-9]{2}[0-9]{3}[0-9]{5}[A-Z0-9]{16}",
            CZ: "CZ[0-9]{2}[0-9]{20}",
            DE: "DE[0-9]{2}[0-9]{8}[0-9]{10}",
            DK: "DK[0-9]{2}[0-9]{14}",
            DO: "DO[0-9]{2}[A-Z0-9]{4}[0-9]{20}",
            DZ: "DZ[0-9]{2}[0-9]{20}",
            EE: "EE[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{11}[0-9]{1}",
            ES: "ES[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{1}[0-9]{1}[0-9]{10}",
            FI: "FI[0-9]{2}[0-9]{6}[0-9]{7}[0-9]{1}",
            FO: "FO[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}",
            FR: "FR[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}",
            GB: "GB[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}",
            GE: "GE[0-9]{2}[A-Z]{2}[0-9]{16}",
            GI: "GI[0-9]{2}[A-Z]{4}[A-Z0-9]{15}",
            GL: "GL[0-9]{2}[0-9]{4}[0-9]{9}[0-9]{1}",
            GR: "GR[0-9]{2}[0-9]{3}[0-9]{4}[A-Z0-9]{16}",
            GT: "GT[0-9]{2}[A-Z0-9]{4}[A-Z0-9]{20}",
            HR: "HR[0-9]{2}[0-9]{7}[0-9]{10}",
            HU: "HU[0-9]{2}[0-9]{3}[0-9]{4}[0-9]{1}[0-9]{15}[0-9]{1}",
            IE: "IE[0-9]{2}[A-Z]{4}[0-9]{6}[0-9]{8}",
            IL: "IL[0-9]{2}[0-9]{3}[0-9]{3}[0-9]{13}",
            IR: "IR[0-9]{2}[0-9]{22}",
            IS: "IS[0-9]{2}[0-9]{4}[0-9]{2}[0-9]{6}[0-9]{10}",
            IT: "IT[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}",
            JO: "JO[0-9]{2}[A-Z]{4}[0-9]{4}[0]{8}[A-Z0-9]{10}",
            KW: "KW[0-9]{2}[A-Z]{4}[0-9]{22}",
            KZ: "KZ[0-9]{2}[0-9]{3}[A-Z0-9]{13}",
            LB: "LB[0-9]{2}[0-9]{4}[A-Z0-9]{20}",
            LI: "LI[0-9]{2}[0-9]{5}[A-Z0-9]{12}",
            LT: "LT[0-9]{2}[0-9]{5}[0-9]{11}",
            LU: "LU[0-9]{2}[0-9]{3}[A-Z0-9]{13}",
            LV: "LV[0-9]{2}[A-Z]{4}[A-Z0-9]{13}",
            MC: "MC[0-9]{2}[0-9]{5}[0-9]{5}[A-Z0-9]{11}[0-9]{2}",
            MD: "MD[0-9]{2}[A-Z0-9]{20}",
            ME: "ME[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",
            MG: "MG[0-9]{2}[0-9]{23}",
            MK: "MK[0-9]{2}[0-9]{3}[A-Z0-9]{10}[0-9]{2}",
            ML: "ML[0-9]{2}[A-Z]{1}[0-9]{23}",
            MR: "MR13[0-9]{5}[0-9]{5}[0-9]{11}[0-9]{2}",
            MT: "MT[0-9]{2}[A-Z]{4}[0-9]{5}[A-Z0-9]{18}",
            MU: "MU[0-9]{2}[A-Z]{4}[0-9]{2}[0-9]{2}[0-9]{12}[0-9]{3}[A-Z]{3}",
            MZ: "MZ[0-9]{2}[0-9]{21}",
            NL: "NL[0-9]{2}[A-Z]{4}[0-9]{10}",
            NO: "NO[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{1}",
            PK: "PK[0-9]{2}[A-Z]{4}[A-Z0-9]{16}",
            PL: "PL[0-9]{2}[0-9]{8}[0-9]{16}",
            PS: "PS[0-9]{2}[A-Z]{4}[A-Z0-9]{21}",
            PT: "PT[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{11}[0-9]{2}",
            QA: "QA[0-9]{2}[A-Z]{4}[A-Z0-9]{21}",
            RO: "RO[0-9]{2}[A-Z]{4}[A-Z0-9]{16}",
            RS: "RS[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",
            SA: "SA[0-9]{2}[0-9]{2}[A-Z0-9]{18}",
            SE: "SE[0-9]{2}[0-9]{3}[0-9]{16}[0-9]{1}",
            SI: "SI[0-9]{2}[0-9]{5}[0-9]{8}[0-9]{2}",
            SK: "SK[0-9]{2}[0-9]{4}[0-9]{6}[0-9]{10}",
            SM: "SM[0-9]{2}[A-Z]{1}[0-9]{5}[0-9]{5}[A-Z0-9]{12}",
            SN: "SN[0-9]{2}[A-Z]{1}[0-9]{23}",
            TN: "TN59[0-9]{2}[0-9]{3}[0-9]{13}[0-9]{2}",
            TR: "TR[0-9]{2}[0-9]{5}[A-Z0-9]{1}[A-Z0-9]{16}",
            VG: "VG[0-9]{2}[A-Z]{4}[0-9]{16}"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            e = e.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
            var f = d.country;
            if (f ? "string" == typeof f && this.REGEX[f] || (f = b.getDynamicOption(c, f)) : f = e.substr(0, 2), !this.REGEX[f]) return {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.iban.countryNotSupported, f)
            };
            if (!new RegExp("^" + this.REGEX[f] + "$").test(e)) return {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.iban.country, a.fn.bootstrapValidator.i18n.iban.countries[f])
            };
            e = e.substr(4) + e.substr(0, 4), e = a.map(e.split(""), function(a) {
                var b = a.charCodeAt(0);
                return b >= "A".charCodeAt(0) && b <= "Z".charCodeAt(0) ? b - "A".charCodeAt(0) + 10 : a
            }), e = e.join("");
            for (var g = parseInt(e.substr(0, 1), 10), h = e.length, i = 1; h > i; ++i) g = (10 * g + parseInt(e.substr(i, 1), 10)) % 97;
            return {
                valid: 1 === g,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.iban.country, a.fn.bootstrapValidator.i18n.iban.countries[f])
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.id = a.extend(a.fn.bootstrapValidator.i18n.id || {}, {
        "default": "Please enter a valid identification number",
        countryNotSupported: "The country code %s is not supported",
        country: "Please enter a valid identification number in %s",
        countries: {
            BA: "Bosnia and Herzegovina",
            BG: "Bulgaria",
            BR: "Brazil",
            CH: "Switzerland",
            CL: "Chile",
            CN: "China",
            CZ: "Czech Republic",
            DK: "Denmark",
            EE: "Estonia",
            ES: "Spain",
            FI: "Finland",
            HR: "Croatia",
            IE: "Ireland",
            IS: "Iceland",
            LT: "Lithuania",
            LV: "Latvia",
            ME: "Montenegro",
            MK: "Macedonia",
            NL: "Netherlands",
            RO: "Romania",
            RS: "Serbia",
            SE: "Sweden",
            SI: "Slovenia",
            SK: "Slovakia",
            SM: "San Marino",
            TH: "Thailand",
            ZA: "South Africa"
        }
    }), a.fn.bootstrapValidator.validators.id = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        COUNTRY_CODES: ["BA", "BG", "BR", "CH", "CL", "CN", "CZ", "DK", "EE", "ES", "FI", "HR", "IE", "IS", "LT", "LV", "ME", "MK", "NL", "RO", "RS", "SE", "SI", "SK", "SM", "TH", "ZA"],
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f = d.country;
            if (f ? ("string" != typeof f || -1 === a.inArray(f.toUpperCase(), this.COUNTRY_CODES)) && (f = b.getDynamicOption(c, f)) : f = e.substr(0, 2), -1 === a.inArray(f, this.COUNTRY_CODES)) return {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.id.countryNotSupported, f)

            };
            var g = ["_", f.toLowerCase()].join("");
            return this[g](e) ? !0 : {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.id.country, a.fn.bootstrapValidator.i18n.id.countries[f.toUpperCase()])
            }
        },
        _validateJMBG: function(a, b) {
            if (!/^\d{13}$/.test(a)) return !1;
            var c = parseInt(a.substr(0, 2), 10),
                d = parseInt(a.substr(2, 2), 10),
                e = (parseInt(a.substr(4, 3), 10), parseInt(a.substr(7, 2), 10)),
                f = parseInt(a.substr(12, 1), 10);
            if (c > 31 || d > 12) return !1;
            for (var g = 0, h = 0; 6 > h; h++) g += (7 - h) * (parseInt(a.charAt(h), 10) + parseInt(a.charAt(h + 6), 10));
            if (g = 11 - g % 11, (10 === g || 11 === g) && (g = 0), g !== f) return !1;
            switch (b.toUpperCase()) {
                case "BA":
                    return e >= 10 && 19 >= e;
                case "MK":
                    return e >= 41 && 49 >= e;
                case "ME":
                    return e >= 20 && 29 >= e;
                case "RS":
                    return e >= 70 && 99 >= e;
                case "SI":
                    return e >= 50 && 59 >= e;
                default:
                    return !0
            }
        },
        _ba: function(a) {
            return this._validateJMBG(a, "BA")
        },
        _mk: function(a) {
            return this._validateJMBG(a, "MK")
        },
        _me: function(a) {
            return this._validateJMBG(a, "ME")
        },
        _rs: function(a) {
            return this._validateJMBG(a, "RS")
        },
        _si: function(a) {
            return this._validateJMBG(a, "SI")
        },
        _bg: function(b) {
            if (!/^\d{10}$/.test(b) && !/^\d{6}\s\d{3}\s\d{1}$/.test(b)) return !1;
            b = b.replace(/\s/g, "");
            var c = parseInt(b.substr(0, 2), 10) + 1900,
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10);
            if (d > 40 ? (c += 100, d -= 40) : d > 20 && (c -= 100, d -= 20), !a.fn.bootstrapValidator.helpers.date(c, d, e)) return !1;
            for (var f = 0, g = [2, 4, 8, 5, 10, 9, 7, 3, 6], h = 0; 9 > h; h++) f += parseInt(b.charAt(h), 10) * g[h];
            return f = f % 11 % 10, f + "" === b.substr(9, 1)
        },
        _br: function(a) {
            if (/^1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}|0{11}$/.test(a)) return !1;
            if (!/^\d{11}$/.test(a) && !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(a)) return !1;
            a = a.replace(/\./g, "").replace(/-/g, "");
            for (var b = 0, c = 0; 9 > c; c++) b += (10 - c) * parseInt(a.charAt(c), 10);
            if (b = 11 - b % 11, (10 === b || 11 === b) && (b = 0), b + "" !== a.charAt(9)) return !1;
            var d = 0;
            for (c = 0; 10 > c; c++) d += (11 - c) * parseInt(a.charAt(c), 10);
            return d = 11 - d % 11, (10 === d || 11 === d) && (d = 0), d + "" === a.charAt(10)
        },
        _ch: function(a) {
            if (!/^756[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{4}[\.]{0,1}[0-9]{2}$/.test(a)) return !1;
            a = a.replace(/\D/g, "").substr(3);
            for (var b = a.length, c = 0, d = 8 === b ? [3, 1] : [1, 3], e = 0; b - 1 > e; e++) c += parseInt(a.charAt(e), 10) * d[e % 2];
            return c = 10 - c % 10, c + "" === a.charAt(b - 1)
        },
        _cl: function(a) {
            if (!/^\d{7,8}[-]{0,1}[0-9K]$/i.test(a)) return !1;
            for (a = a.replace(/\-/g, ""); a.length < 9;) a = "0" + a;
            for (var b = 0, c = [3, 2, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = 11 - b % 11, 11 === b ? b = 0 : 10 === b && (b = "K"), b + "" === a.charAt(8).toUpperCase()
        },
        _cn: function(b) {
            if (b = b.trim(), !/^\d{15}$/.test(b) && !/^\d{17}[\dXx]{1}$/.test(b)) return !1;
            var c = {
                    11: {
                        0: [0],
                        1: [
                            [0, 9],
                            [11, 17]
                        ],
                        2: [0, 28, 29]
                    },
                    12: {
                        0: [0],
                        1: [
                            [0, 16]
                        ],
                        2: [0, 21, 23, 25]
                    },
                    13: {
                        0: [0],
                        1: [
                            [0, 5], 7, 8, 21, [23, 33],
                            [81, 85]
                        ],
                        2: [
                            [0, 5],
                            [7, 9],
                            [23, 25], 27, 29, 30, 81, 83
                        ],
                        3: [
                            [0, 4],
                            [21, 24]
                        ],
                        4: [
                            [0, 4], 6, 21, [23, 35], 81
                        ],
                        5: [
                            [0, 3],
                            [21, 35], 81, 82
                        ],
                        6: [
                            [0, 4],
                            [21, 38],
                            [81, 84]
                        ],
                        7: [
                            [0, 3], 5, 6, [21, 33]
                        ],
                        8: [
                            [0, 4],
                            [21, 28]
                        ],
                        9: [
                            [0, 3],
                            [21, 30],
                            [81, 84]
                        ],
                        10: [
                            [0, 3],
                            [22, 26], 28, 81, 82
                        ],
                        11: [
                            [0, 2],
                            [21, 28], 81, 82
                        ]
                    },
                    14: {
                        0: [0],
                        1: [0, 1, [5, 10],
                            [21, 23], 81
                        ],
                        2: [
                            [0, 3], 11, 12, [21, 27]
                        ],
                        3: [
                            [0, 3], 11, 21, 22
                        ],
                        4: [
                            [0, 2], 11, 21, [23, 31], 81
                        ],
                        5: [
                            [0, 2], 21, 22, 24, 25, 81
                        ],
                        6: [
                            [0, 3],
                            [21, 24]
                        ],
                        7: [
                            [0, 2],
                            [21, 29], 81
                        ],
                        8: [
                            [0, 2],
                            [21, 30], 81, 82
                        ],
                        9: [
                            [0, 2],
                            [21, 32], 81
                        ],
                        10: [
                            [0, 2],
                            [21, 34], 81, 82
                        ],
                        11: [
                            [0, 2],
                            [21, 30], 81, 82
                        ],
                        23: [
                            [0, 3], 22, 23, [25, 30], 32, 33
                        ]
                    },
                    15: {
                        0: [0],
                        1: [
                            [0, 5],
                            [21, 25]
                        ],
                        2: [
                            [0, 7],
                            [21, 23]
                        ],
                        3: [
                            [0, 4]
                        ],
                        4: [
                            [0, 4],
                            [21, 26],
                            [28, 30]
                        ],
                        5: [
                            [0, 2],
                            [21, 26], 81
                        ],
                        6: [
                            [0, 2],
                            [21, 27]
                        ],
                        7: [
                            [0, 3],
                            [21, 27],
                            [81, 85]
                        ],
                        8: [
                            [0, 2],
                            [21, 26]
                        ],
                        9: [
                            [0, 2],
                            [21, 29], 81
                        ],
                        22: [
                            [0, 2],
                            [21, 24]
                        ],
                        25: [
                            [0, 2],
                            [22, 31]
                        ],
                        26: [
                            [0, 2],
                            [24, 27],
                            [29, 32], 34
                        ],
                        28: [0, 1, [22, 27]],
                        29: [0, [21, 23]]
                    },
                    21: {
                        0: [0],
                        1: [
                            [0, 6],
                            [11, 14],
                            [22, 24], 81
                        ],
                        2: [
                            [0, 4],
                            [11, 13], 24, [81, 83]
                        ],
                        3: [
                            [0, 4], 11, 21, 23, 81
                        ],
                        4: [
                            [0, 4], 11, [21, 23]
                        ],
                        5: [
                            [0, 5], 21, 22
                        ],
                        6: [
                            [0, 4], 24, 81, 82
                        ],
                        7: [
                            [0, 3], 11, 26, 27, 81, 82
                        ],
                        8: [
                            [0, 4], 11, 81, 82
                        ],
                        9: [
                            [0, 5], 11, 21, 22
                        ],
                        10: [
                            [0, 5], 11, 21, 81
                        ],
                        11: [
                            [0, 3], 21, 22
                        ],
                        12: [
                            [0, 2], 4, 21, 23, 24, 81, 82
                        ],
                        13: [
                            [0, 3], 21, 22, 24, 81, 82
                        ],
                        14: [
                            [0, 4], 21, 22, 81
                        ]
                    },
                    22: {
                        0: [0],
                        1: [
                            [0, 6], 12, 22, [81, 83]
                        ],
                        2: [
                            [0, 4], 11, 21, [81, 84]
                        ],
                        3: [
                            [0, 3], 22, 23, 81, 82
                        ],
                        4: [
                            [0, 3], 21, 22
                        ],
                        5: [
                            [0, 3], 21, 23, 24, 81, 82
                        ],
                        6: [
                            [0, 2], 4, 5, [21, 23], 25, 81
                        ],
                        7: [
                            [0, 2],
                            [21, 24], 81
                        ],
                        8: [
                            [0, 2], 21, 22, 81, 82
                        ],
                        24: [
                            [0, 6], 24, 26
                        ]
                    },
                    23: {
                        0: [0],
                        1: [
                            [0, 12], 21, [23, 29],
                            [81, 84]
                        ],
                        2: [
                            [0, 8], 21, [23, 25], 27, [29, 31], 81
                        ],
                        3: [
                            [0, 7], 21, 81, 82
                        ],
                        4: [
                            [0, 7], 21, 22
                        ],
                        5: [
                            [0, 3], 5, 6, [21, 24]
                        ],
                        6: [
                            [0, 6],
                            [21, 24]
                        ],
                        7: [
                            [0, 16], 22, 81
                        ],
                        8: [
                            [0, 5], 11, 22, 26, 28, 33, 81, 82
                        ],
                        9: [
                            [0, 4], 21
                        ],
                        10: [
                            [0, 5], 24, 25, 81, [83, 85]
                        ],
                        11: [
                            [0, 2], 21, 23, 24, 81, 82
                        ],
                        12: [
                            [0, 2],
                            [21, 26],
                            [81, 83]
                        ],
                        27: [
                            [0, 4],
                            [21, 23]
                        ]
                    },
                    31: {
                        0: [0],
                        1: [0, 1, [3, 10],
                            [12, 20]
                        ],
                        2: [0, 30]
                    },
                    32: {
                        0: [0],
                        1: [
                            [0, 7], 11, [13, 18], 24, 25
                        ],
                        2: [
                            [0, 6], 11, 81, 82
                        ],
                        3: [
                            [0, 5], 11, 12, [21, 24], 81, 82
                        ],
                        4: [
                            [0, 2], 4, 5, 11, 12, 81, 82
                        ],
                        5: [
                            [0, 9],
                            [81, 85]
                        ],
                        6: [
                            [0, 2], 11, 12, 21, 23, [81, 84]
                        ],
                        7: [0, 1, 3, 5, 6, [21, 24]],
                        8: [
                            [0, 4], 11, 26, [29, 31]
                        ],
                        9: [
                            [0, 3],
                            [21, 25], 28, 81, 82
                        ],
                        10: [
                            [0, 3], 11, 12, 23, 81, 84, 88
                        ],
                        11: [
                            [0, 2], 11, 12, [81, 83]
                        ],
                        12: [
                            [0, 4],
                            [81, 84]
                        ],
                        13: [
                            [0, 2], 11, [21, 24]
                        ]
                    },
                    33: {
                        0: [0],
                        1: [
                            [0, 6],
                            [8, 10], 22, 27, 82, 83, 85
                        ],
                        2: [0, 1, [3, 6], 11, 12, 25, 26, [81, 83]],
                        3: [

                            [0, 4], 22, 24, [26, 29], 81, 82
                        ],
                        4: [
                            [0, 2], 11, 21, 24, [81, 83]
                        ],
                        5: [
                            [0, 3],
                            [21, 23]
                        ],
                        6: [
                            [0, 2], 21, 24, [81, 83]
                        ],
                        7: [
                            [0, 3], 23, 26, 27, [81, 84]
                        ],
                        8: [
                            [0, 3], 22, 24, 25, 81
                        ],
                        9: [
                            [0, 3], 21, 22
                        ],
                        10: [
                            [0, 4],
                            [21, 24], 81, 82
                        ],
                        11: [
                            [0, 2],
                            [21, 27], 81
                        ]
                    },
                    34: {
                        0: [0],
                        1: [
                            [0, 4], 11, [21, 24], 81
                        ],
                        2: [
                            [0, 4], 7, 8, [21, 23], 25
                        ],
                        3: [
                            [0, 4], 11, [21, 23]
                        ],
                        4: [
                            [0, 6], 21
                        ],
                        5: [
                            [0, 4], 6, [21, 23]
                        ],
                        6: [
                            [0, 4], 21
                        ],
                        7: [
                            [0, 3], 11, 21
                        ],
                        8: [
                            [0, 3], 11, [22, 28], 81
                        ],
                        10: [
                            [0, 4],
                            [21, 24]
                        ],
                        11: [
                            [0, 3], 22, [24, 26], 81, 82
                        ],
                        12: [
                            [0, 4], 21, 22, 25, 26, 82
                        ],
                        13: [
                            [0, 2],
                            [21, 24]
                        ],
                        14: [
                            [0, 2],
                            [21, 24]
                        ],
                        15: [
                            [0, 3],
                            [21, 25]
                        ],
                        16: [
                            [0, 2],
                            [21, 23]
                        ],
                        17: [
                            [0, 2],
                            [21, 23]
                        ],
                        18: [
                            [0, 2],
                            [21, 25], 81
                        ]
                    },
                    35: {
                        0: [0],
                        1: [
                            [0, 5], 11, [21, 25], 28, 81, 82
                        ],
                        2: [
                            [0, 6],
                            [11, 13]
                        ],
                        3: [
                            [0, 5], 22
                        ],
                        4: [
                            [0, 3], 21, [23, 30], 81
                        ],
                        5: [
                            [0, 5], 21, [24, 27],
                            [81, 83]
                        ],
                        6: [
                            [0, 3],
                            [22, 29], 81
                        ],
                        7: [
                            [0, 2],
                            [21, 25],
                            [81, 84]
                        ],
                        8: [
                            [0, 2],
                            [21, 25], 81
                        ],
                        9: [
                            [0, 2],
                            [21, 26], 81, 82
                        ]
                    },
                    36: {
                        0: [0],
                        1: [
                            [0, 5], 11, [21, 24]
                        ],
                        2: [
                            [0, 3], 22, 81
                        ],
                        3: [
                            [0, 2], 13, [21, 23]
                        ],
                        4: [
                            [0, 3], 21, [23, 30], 81, 82
                        ],
                        5: [
                            [0, 2], 21
                        ],
                        6: [
                            [0, 2], 22, 81
                        ],
                        7: [
                            [0, 2],
                            [21, 35], 81, 82
                        ],
                        8: [
                            [0, 3],
                            [21, 30], 81
                        ],
                        9: [
                            [0, 2],
                            [21, 26],
                            [81, 83]
                        ],
                        10: [
                            [0, 2],
                            [21, 30]
                        ],
                        11: [
                            [0, 2],
                            [21, 30], 81
                        ]
                    },
                    37: {
                        0: [0],
                        1: [
                            [0, 5], 12, 13, [24, 26], 81
                        ],
                        2: [
                            [0, 3], 5, [11, 14],
                            [81, 85]
                        ],
                        3: [
                            [0, 6],
                            [21, 23]
                        ],
                        4: [
                            [0, 6], 81
                        ],
                        5: [
                            [0, 3],
                            [21, 23]
                        ],
                        6: [
                            [0, 2],
                            [11, 13], 34, [81, 87]
                        ],
                        7: [
                            [0, 5], 24, 25, [81, 86]
                        ],
                        8: [
                            [0, 2], 11, [26, 32],
                            [81, 83]
                        ],
                        9: [
                            [0, 3], 11, 21, 23, 82, 83
                        ],
                        10: [
                            [0, 2],
                            [81, 83]
                        ],
                        11: [
                            [0, 3], 21, 22
                        ],
                        12: [
                            [0, 3]
                        ],
                        13: [
                            [0, 2], 11, 12, [21, 29]
                        ],
                        14: [
                            [0, 2],
                            [21, 28], 81, 82
                        ],
                        15: [
                            [0, 2],
                            [21, 26], 81
                        ],
                        16: [
                            [0, 2],
                            [21, 26]
                        ],
                        17: [
                            [0, 2],
                            [21, 28]
                        ]
                    },
                    41: {
                        0: [0],
                        1: [
                            [0, 6], 8, 22, [81, 85]
                        ],
                        2: [
                            [0, 5], 11, [21, 25]
                        ],
                        3: [
                            [0, 7], 11, [22, 29], 81
                        ],
                        4: [
                            [0, 4], 11, [21, 23], 25, 81, 82
                        ],
                        5: [
                            [0, 3], 5, 6, 22, 23, 26, 27, 81
                        ],
                        6: [
                            [0, 3], 11, 21, 22
                        ],
                        7: [
                            [0, 4], 11, 21, [24, 28], 81, 82
                        ],
                        8: [
                            [0, 4], 11, [21, 23], 25, [81, 83]
                        ],
                        9: [
                            [0, 2], 22, 23, [26, 28]
                        ],
                        10: [
                            [0, 2],
                            [23, 25], 81, 82
                        ],
                        11: [
                            [0, 4],
                            [21, 23]
                        ],
                        12: [
                            [0, 2], 21, 22, 24, 81, 82
                        ],
                        13: [
                            [0, 3],
                            [21, 30], 81
                        ],
                        14: [
                            [0, 3],
                            [21, 26], 81
                        ],
                        15: [
                            [0, 3],
                            [21, 28]
                        ],
                        16: [
                            [0, 2],
                            [21, 28], 81
                        ],
                        17: [
                            [0, 2],
                            [21, 29]
                        ],
                        90: [0, 1]
                    },
                    42: {
                        0: [0],
                        1: [
                            [0, 7],
                            [11, 17]
                        ],
                        2: [
                            [0, 5], 22, 81
                        ],
                        3: [
                            [0, 3],
                            [21, 25], 81
                        ],
                        5: [
                            [0, 6],
                            [25, 29],
                            [81, 83]
                        ],
                        6: [
                            [0, 2], 6, 7, [24, 26],
                            [82, 84]
                        ],
                        7: [
                            [0, 4]
                        ],
                        8: [
                            [0, 2], 4, 21, 22, 81
                        ],
                        9: [
                            [0, 2],
                            [21, 23], 81, 82, 84
                        ],
                        10: [
                            [0, 3],
                            [22, 24], 81, 83, 87
                        ],
                        11: [
                            [0, 2],
                            [21, 27], 81, 82
                        ],
                        12: [
                            [0, 2],
                            [21, 24], 81
                        ],
                        13: [
                            [0, 3], 21, 81
                        ],
                        28: [
                            [0, 2], 22, 23, [25, 28]
                        ],
                        90: [0, [4, 6], 21]
                    },
                    43: {
                        0: [0],
                        1: [
                            [0, 5], 11, 12, 21, 22, 24, 81
                        ],
                        2: [
                            [0, 4], 11, 21, [23, 25], 81
                        ],
                        3: [
                            [0, 2], 4, 21, 81, 82
                        ],
                        4: [0, 1, [5, 8], 12, [21, 24], 26, 81, 82],
                        5: [
                            [0, 3], 11, [21, 25],
                            [27, 29], 81
                        ],
                        6: [
                            [0, 3], 11, 21, 23, 24, 26, 81, 82
                        ],
                        7: [
                            [0, 3],
                            [21, 26], 81
                        ],
                        8: [
                            [0, 2], 11, 21, 22
                        ],
                        9: [
                            [0, 3],
                            [21, 23], 81
                        ],
                        10: [
                            [0, 3],
                            [21, 28], 81
                        ],
                        11: [
                            [0, 3],
                            [21, 29]
                        ],
                        12: [
                            [0, 2],
                            [21, 30], 81
                        ],
                        13: [
                            [0, 2], 21, 22, 81, 82
                        ],
                        31: [0, 1, [22, 27], 30]
                    },
                    44: {
                        0: [0],
                        1: [
                            [0, 7],
                            [11, 16], 83, 84
                        ],
                        2: [
                            [0, 5], 21, 22, 24, 29, 32, 33, 81, 82
                        ],
                        3: [0, 1, [3, 8]],
                        4: [
                            [0, 4]
                        ],
                        5: [0, 1, [6, 15], 23, 82, 83],
                        6: [0, 1, [4, 8]],
                        7: [0, 1, [3, 5], 81, [83, 85]],
                        8: [
                            [0, 4], 11, 23, 25, [81, 83]
                        ],
                        9: [
                            [0, 3], 23, [81, 83]
                        ],
                        12: [
                            [0, 3],
                            [23, 26], 83, 84
                        ],
                        13: [
                            [0, 3],
                            [22, 24], 81
                        ],
                        14: [
                            [0, 2],
                            [21, 24], 26, 27, 81
                        ],
                        15: [
                            [0, 2], 21, 23, 81
                        ],
                        16: [
                            [0, 2],
                            [21, 25]
                        ],
                        17: [
                            [0, 2], 21, 23, 81
                        ],
                        18: [
                            [0, 3], 21, 23, [25, 27], 81, 82
                        ],
                        19: [0],
                        20: [0],
                        51: [
                            [0, 3], 21, 22
                        ],
                        52: [
                            [0, 3], 21, 22, 24, 81
                        ],
                        53: [
                            [0, 2],
                            [21, 23], 81
                        ]
                    },
                    45: {
                        0: [0],
                        1: [
                            [0, 9],
                            [21, 27]
                        ],
                        2: [
                            [0, 5],
                            [21, 26]
                        ],
                        3: [
                            [0, 5], 11, 12, [21, 32]
                        ],
                        4: [0, 1, [3, 6], 11, [21, 23], 81],
                        5: [
                            [0, 3], 12, 21
                        ],
                        6: [
                            [0, 3], 21, 81
                        ],
                        7: [
                            [0, 3], 21, 22
                        ],
                        8: [
                            [0, 4], 21, 81
                        ],
                        9: [
                            [0, 3],
                            [21, 24], 81
                        ],
                        10: [
                            [0, 2],
                            [21, 31]
                        ],
                        11: [
                            [0, 2],
                            [21, 23]
                        ],
                        12: [
                            [0, 2],
                            [21, 29], 81
                        ],
                        13: [
                            [0, 2],
                            [21, 24], 81
                        ],
                        14: [
                            [0, 2],
                            [21, 25], 81
                        ]
                    },
                    46: {
                        0: [0],
                        1: [0, 1, [5, 8]],
                        2: [0, 1],
                        3: [0, [21, 23]],
                        90: [
                            [0, 3],
                            [5, 7],
                            [21, 39]
                        ]
                    },
                    50: {
                        0: [0],
                        1: [
                            [0, 19]
                        ],
                        2: [0, [22, 38],
                            [40, 43]
                        ],
                        3: [0, [81, 84]]
                    },
                    51: {
                        0: [0],
                        1: [0, 1, [4, 8],
                            [12, 15],
                            [21, 24], 29, 31, 32, [81, 84]
                        ],
                        3: [
                            [0, 4], 11, 21, 22
                        ],
                        4: [
                            [0, 3], 11, 21, 22
                        ],
                        5: [
                            [0, 4], 21, 22, 24, 25
                        ],
                        6: [0, 1, 3, 23, 26, [81, 83]],
                        7: [0, 1, 3, 4, [22, 27], 81],
                        8: [
                            [0, 2], 11, 12, [21, 24]
                        ],
                        9: [
                            [0, 4],
                            [21, 23]
                        ],
                        10: [
                            [0, 2], 11, 24, 25, 28
                        ],
                        11: [
                            [0, 2],
                            [11, 13], 23, 24, 26, 29, 32, 33, 81
                        ],
                        13: [
                            [0, 4],
                            [21, 25], 81
                        ],
                        14: [
                            [0, 2],
                            [21, 25]
                        ],
                        15: [
                            [0, 3],
                            [21, 29]
                        ],
                        16: [
                            [0, 3],
                            [21, 23], 81
                        ],
                        17: [
                            [0, 3],
                            [21, 25], 81
                        ],
                        18: [
                            [0, 3],
                            [21, 27]
                        ],
                        19: [
                            [0, 3],
                            [21, 23]
                        ],
                        20: [
                            [0, 2], 21, 22, 81
                        ],
                        32: [0, [21, 33]],
                        33: [0, [21, 38]],
                        34: [0, 1, [22, 37]]
                    },
                    52: {
                        0: [0],
                        1: [
                            [0, 3],
                            [11, 15],
                            [21, 23], 81
                        ],
                        2: [0, 1, 3, 21, 22],
                        3: [
                            [0, 3],
                            [21, 30], 81, 82
                        ],
                        4: [
                            [0, 2],
                            [21, 25]
                        ],
                        5: [
                            [0, 2],
                            [21, 27]
                        ],
                        6: [
                            [0, 3],
                            [21, 28]
                        ],
                        22: [0, 1, [22, 30]],
                        23: [0, 1, [22, 28]],
                        24: [0, 1, [22, 28]],
                        26: [0, 1, [22, 36]],
                        27: [
                            [0, 2], 22, 23, [25, 32]
                        ]
                    },
                    53: {
                        0: [0],
                        1: [
                            [0, 3],
                            [11, 14], 21, 22, [24, 29], 81
                        ],
                        3: [
                            [0, 2],
                            [21, 26], 28, 81
                        ],
                        4: [
                            [0, 2],
                            [21, 28]
                        ],
                        5: [
                            [0, 2],
                            [21, 24]
                        ],
                        6: [
                            [0, 2],
                            [21, 30]
                        ],
                        7: [
                            [0, 2],
                            [21, 24]
                        ],
                        8: [
                            [0, 2],
                            [21, 29]
                        ],
                        9: [
                            [0, 2],
                            [21, 27]
                        ],
                        23: [0, 1, [22, 29], 31],
                        25: [
                            [0, 4],
                            [22, 32]
                        ],
                        26: [0, 1, [21, 28]],
                        27: [0, 1, [22, 30]],
                        28: [0, 1, 22, 23],
                        29: [0, 1, [22, 32]],
                        31: [0, 2, 3, [22, 24]],
                        34: [0, [21, 23]],
                        33: [0, 21, [23, 25]],
                        35: [0, [21, 28]]
                    },
                    54: {
                        0: [0],
                        1: [
                            [0, 2],
                            [21, 27]
                        ],
                        21: [0, [21, 29], 32, 33],
                        22: [0, [21, 29],
                            [31, 33]
                        ],
                        23: [0, 1, [22, 38]],
                        24: [0, [21, 31]],
                        25: [0, [21, 27]],
                        26: [0, [21, 27]]
                    },
                    61: {
                        0: [0],
                        1: [
                            [0, 4],
                            [11, 16], 22, [24, 26]
                        ],
                        2: [
                            [0, 4], 22
                        ],
                        3: [
                            [0, 4],
                            [21, 24],
                            [26, 31]
                        ],
                        4: [
                            [0, 4],
                            [22, 31], 81
                        ],
                        5: [
                            [0, 2],
                            [21, 28], 81, 82
                        ],
                        6: [
                            [0, 2],
                            [21, 32]
                        ],
                        7: [
                            [0, 2],
                            [21, 30]
                        ],
                        8: [
                            [0, 2],
                            [21, 31]
                        ],
                        9: [
                            [0, 2],
                            [21, 29]
                        ],
                        10: [
                            [0, 2],
                            [21, 26]
                        ]
                    },
                    62: {
                        0: [0],
                        1: [
                            [0, 5], 11, [21, 23]
                        ],
                        2: [0, 1],
                        3: [
                            [0, 2], 21
                        ],
                        4: [
                            [0, 3],
                            [21, 23]
                        ],
                        5: [
                            [0, 3],
                            [21, 25]
                        ],
                        6: [
                            [0, 2],
                            [21, 23]
                        ],
                        7: [
                            [0, 2],
                            [21, 25]
                        ],
                        8: [
                            [0, 2],
                            [21, 26]
                        ],
                        9: [
                            [0, 2],
                            [21, 24], 81, 82
                        ],
                        10: [
                            [0, 2],
                            [21, 27]
                        ],
                        11: [
                            [0, 2],
                            [21, 26]
                        ],
                        12: [
                            [0, 2],
                            [21, 28]
                        ],
                        24: [0, 21, [24, 29]],
                        26: [0, 21, [23, 30]],
                        29: [0, 1, [21, 27]],
                        30: [0, 1, [21, 27]]
                    },
                    63: {
                        0: [0],
                        1: [
                            [0, 5],
                            [21, 23]
                        ],
                        2: [0, 2, [21, 25]],
                        21: [0, [21, 23],
                            [26, 28]
                        ],
                        22: [0, [21, 24]],
                        23: [0, [21, 24]],
                        25: [0, [21, 25]],
                        26: [0, [21, 26]],
                        27: [0, 1, [21, 26]],
                        28: [
                            [0, 2],
                            [21, 23]
                        ]
                    },
                    64: {
                        0: [0],
                        1: [0, 1, [4, 6], 21, 22, 81],
                        2: [
                            [0, 3], 5, [21, 23]
                        ],
                        3: [
                            [0, 3],
                            [21, 24], 81
                        ],
                        4: [
                            [0, 2],
                            [21, 25]
                        ],
                        5: [
                            [0, 2], 21, 22
                        ]
                    },
                    65: {
                        0: [0],
                        1: [
                            [0, 9], 21
                        ],
                        2: [
                            [0, 5]
                        ],
                        21: [0, 1, 22, 23],
                        22: [0, 1, 22, 23],
                        23: [
                            [0, 3],
                            [23, 25], 27, 28
                        ],
                        28: [0, 1, [22, 29]],
                        29: [0, 1, [22, 29]],
                        30: [0, 1, [22, 24]],
                        31: [0, 1, [21, 31]],
                        32: [0, 1, [21, 27]],
                        40: [0, 2, 3, [21, 28]],
                        42: [
                            [0, 2], 21, [23, 26]
                        ],
                        43: [0, 1, [21, 26]],
                        90: [
                            [0, 4]
                        ],
                        27: [
                            [0, 2], 22, 23
                        ]
                    },
                    71: {
                        0: [0]
                    },
                    81: {
                        0: [0]
                    },
                    82: {
                        0: [0]
                    }
                },
                d = parseInt(b.substr(0, 2), 10),
                e = parseInt(b.substr(2, 2), 10),
                f = parseInt(b.substr(4, 2), 10);
            if (!c[d] || !c[d][e]) return !1;
            for (var g = !1, h = c[d][e], i = 0; i < h.length; i++)
                if (a.isArray(h[i]) && h[i][0] <= f && f <= h[i][1] || !a.isArray(h[i]) && f === h[i]) {
                    g = !0;
                    break
                }
            if (!g) return !1;
            var j;
            j = 18 === b.length ? b.substr(6, 8) : "19" + b.substr(6, 6);
            var k = parseInt(j.substr(0, 4), 10),
                l = parseInt(j.substr(4, 2), 10),
                m = parseInt(j.substr(6, 2), 10);
            if (!a.fn.bootstrapValidator.helpers.date(k, l, m)) return !1;
            if (18 === b.length) {
                var n = 0,
                    o = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                for (i = 0; 17 > i; i++) n += parseInt(b.charAt(i), 10) * o[i];
                n = (12 - n % 11) % 11;
                var p = "X" !== b.charAt(17).toUpperCase() ? parseInt(b.charAt(17), 10) : 10;
                return p === n
            }
            return !0
        },
        _cz: function(b) {
            if (!/^\d{9,10}$/.test(b)) return !1;
            var c = 1900 + parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10) % 50 % 20,
                e = parseInt(b.substr(4, 2), 10);
            if (9 === b.length) {
                if (c >= 1980 && (c -= 100), c > 1953) return !1
            } else 1954 > c && (c += 100);
            if (!a.fn.bootstrapValidator.helpers.date(c, d, e)) return !1;
            if (10 === b.length) {
                var f = parseInt(b.substr(0, 9), 10) % 11;
                return 1985 > c && (f %= 10), f + "" === b.substr(9, 1)
            }
            return !0
        },
        _dk: function(b) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(b)) return !1;
            b = b.replace(/-/g, "");
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10);
            switch (!0) {
                case -1 !== "5678".indexOf(b.charAt(6)) && e >= 58:
                    e += 1800;
                    break;
                case -1 !== "0123".indexOf(b.charAt(6)):
                case -1 !== "49".indexOf(b.charAt(6)) && e >= 37:
                    e += 1900;
                    break;
                default:
                    e += 2e3
            }
            return a.fn.bootstrapValidator.helpers.date(e, d, c)
        },
        _ee: function(a) {
            return this._lt(a)
        },
        _es: function(a) {
            if (!/^[0-9A-Z]{8}[-]{0,1}[0-9A-Z]$/.test(a) && !/^[XYZ][-]{0,1}[0-9]{7}[-]{0,1}[0-9A-Z]$/.test(a)) return !1;
            a = a.replace(/-/g, "");
            var b = "XYZ".indexOf(a.charAt(0)); - 1 !== b && (a = b + a.substr(1) + "");
            var c = parseInt(a.substr(0, 8), 10);
            return c = "TRWAGMYFPDXBNJZSQVHLCKE" [c % 23], c === a.substr(8, 1)
        },
        _fi: function(b) {
            if (!/^[0-9]{6}[-+A][0-9]{3}[0-9ABCDEFHJKLMNPRSTUVWXY]$/.test(b)) return !1;
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10),
                f = {
                    "+": 1800,
                    "-": 1900,
                    A: 2e3
                };
            if (e = f[b.charAt(6)] + e, !a.fn.bootstrapValidator.helpers.date(e, d, c)) return !1;
            var g = parseInt(b.substr(7, 3), 10);
            if (2 > g) return !1;
            var h = b.substr(0, 6) + b.substr(7, 3) + "";
            return h = parseInt(h, 10), "0123456789ABCDEFHJKLMNPRSTUVWXY".charAt(h % 31) === b.charAt(10)
        },
        _hr: function(b) {
            return /^[0-9]{11}$/.test(b) ? a.fn.bootstrapValidator.helpers.mod11And10(b) : !1
        },
        _ie: function(a) {
            if (!/^\d{7}[A-W][AHWTX]?$/.test(a)) return !1;
            var b = function(a) {
                for (; a.length < 7;) a = "0" + a;
                for (var b = "WABCDEFGHIJKLMNOPQRSTUV", c = 0, d = 0; 7 > d; d++) c += parseInt(a.charAt(d), 10) * (8 - d);
                return c += 9 * b.indexOf(a.substr(7)), b[c % 23]
            };
            return 9 !== a.length || "A" !== a.charAt(8) && "H" !== a.charAt(8) ? a.charAt(7) === b(a.substr(0, 7)) : a.charAt(7) === b(a.substr(0, 7) + a.substr(8) + "")
        },
        _is: function(b) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{4}$/.test(b)) return !1;
            b = b.replace(/-/g, "");
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10),
                f = parseInt(b.charAt(9), 10);
            if (e = 9 === f ? 1900 + e : 100 * (20 + f) + e, !a.fn.bootstrapValidator.helpers.date(e, d, c, !0)) return !1;
            for (var g = 0, h = [3, 2, 7, 6, 5, 4, 3, 2], i = 0; 8 > i; i++) g += parseInt(b.charAt(i), 10) * h[i];
            return g = 11 - g % 11, g + "" === b.charAt(8)
        },
        _lt: function(b) {
            if (!/^[0-9]{11}$/.test(b)) return !1;
            var c = parseInt(b.charAt(0), 10),
                d = parseInt(b.substr(1, 2), 10),
                e = parseInt(b.substr(3, 2), 10),
                f = parseInt(b.substr(5, 2), 10),
                g = c % 2 === 0 ? 17 + c / 2 : 17 + (c + 1) / 2;
            if (d = 100 * g + d, !a.fn.bootstrapValidator.helpers.date(d, e, f, !0)) return !1;
            for (var h = 0, i = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1], j = 0; 10 > j; j++) h += parseInt(b.charAt(j), 10) * i[j];
            if (h %= 11, 10 !== h) return h + "" === b.charAt(10);
            for (h = 0, i = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3], j = 0; 10 > j; j++) h += parseInt(b.charAt(j), 10) * i[j];
            return h %= 11, 10 === h && (h = 0), h + "" === b.charAt(10)
        },
        _lv: function(b) {
            if (!/^[0-9]{6}[-]{0,1}[0-9]{5}$/.test(b)) return !1;
            b = b.replace(/\D/g, "");
            var c = parseInt(b.substr(0, 2), 10),
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10);
            if (e = e + 1800 + 100 * parseInt(b.charAt(6), 10), !a.fn.bootstrapValidator.helpers.date(e, d, c, !0)) return !1;
            for (var f = 0, g = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9], h = 0; 10 > h; h++) f += parseInt(b.charAt(h), 10) * g[h];
            return f = (f + 1) % 11 % 10, f + "" === b.charAt(10)
        },
        _nl: function(a) {
            for (; a.length < 9;) a = "0" + a;
            if (!/^[0-9]{4}[.]{0,1}[0-9]{2}[.]{0,1}[0-9]{3}$/.test(a)) return !1;
            if (a = a.replace(/\./g, ""), 0 === parseInt(a, 10)) return !1;
            for (var b = 0, c = a.length, d = 0; c - 1 > d; d++) b += (9 - d) * parseInt(a.charAt(d), 10);
            return b %= 11, 10 === b && (b = 0), b + "" === a.charAt(c - 1)
        },
        _ro: function(b) {
            if (!/^[0-9]{13}$/.test(b)) return !1;
            var c = parseInt(b.charAt(0), 10);
            if (0 === c || 7 === c || 8 === c) return !1;
            var d = parseInt(b.substr(1, 2), 10),
                e = parseInt(b.substr(3, 2), 10),
                f = parseInt(b.substr(5, 2), 10),
                g = {
                    1: 1900,
                    2: 1900,
                    3: 1800,
                    4: 1800,
                    5: 2e3,
                    6: 2e3
                };
            if (f > 31 && e > 12) return !1;
            if (9 !== c && (d = g[c + ""] + d, !a.fn.bootstrapValidator.helpers.date(d, e, f))) return !1;
            for (var h = 0, i = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9], j = b.length, k = 0; j - 1 > k; k++) h += parseInt(b.charAt(k), 10) * i[k];
            return h %= 11, 10 === h && (h = 1), h + "" === b.charAt(j - 1)
        },
        _se: function(b) {
            if (!/^[0-9]{10}$/.test(b) && !/^[0-9]{6}[-|+][0-9]{4}$/.test(b)) return !1;
            b = b.replace(/[^0-9]/g, "");
            var c = parseInt(b.substr(0, 2), 10) + 1900,
                d = parseInt(b.substr(2, 2), 10),
                e = parseInt(b.substr(4, 2), 10);
            return a.fn.bootstrapValidator.helpers.date(c, d, e) ? a.fn.bootstrapValidator.helpers.luhn(b) : !1
        },
        _sk: function(a) {
            return this._cz(a)
        },
        _sm: function(a) {
            return /^\d{5}$/.test(a)
        },
        _th: function(a) {
            if (13 !== a.length) return !1;
            for (var b = 0, c = 0; 12 > c; c++) b += parseInt(a.charAt(c), 10) * (13 - c);
            return (11 - b % 11) % 10 === parseInt(a.charAt(12), 10)
        },
        _za: function(b) {
            if (!/^[0-9]{10}[0|1][8|9][0-9]$/.test(b)) return !1;
            var c = parseInt(b.substr(0, 2), 10),
                d = (new Date).getFullYear() % 100,
                e = parseInt(b.substr(2, 2), 10),
                f = parseInt(b.substr(4, 2), 10);
            return c = c >= d ? c + 1900 : c + 2e3, a.fn.bootstrapValidator.helpers.date(c, e, f) ? a.fn.bootstrapValidator.helpers.luhn(b) : !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.identical = a.extend(a.fn.bootstrapValidator.i18n.identical || {}, {
        "default": "Please enter the same value"
    }), a.fn.bootstrapValidator.validators.identical = {
        html5Attributes: {
            message: "message",
            field: "field"
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" === d) return !0;
            var e = a.getFieldElements(c.field);
            return null === e || 0 === e.length ? !0 : d === e.val() ? (a.updateStatus(c.field, a.STATUS_VALID, "identical"), !0) : !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.imei = a.extend(a.fn.bootstrapValidator.i18n.imei || {}, {
        "default": "Please enter a valid IMEI number"
    }), a.fn.bootstrapValidator.validators.imei = {
        validate: function(b, c) {
            var d = c.val();
            if ("" === d) return !0;
            switch (!0) {
                case /^\d{15}$/.test(d):
                case /^\d{2}-\d{6}-\d{6}-\d{1}$/.test(d):
                case /^\d{2}\s\d{6}\s\d{6}\s\d{1}$/.test(d):
                    return d = d.replace(/[^0-9]/g, ""), a.fn.bootstrapValidator.helpers.luhn(d);
                case /^\d{14}$/.test(d):
                case /^\d{16}$/.test(d):
                case /^\d{2}-\d{6}-\d{6}(|-\d{2})$/.test(d):
                case /^\d{2}\s\d{6}\s\d{6}(|\s\d{2})$/.test(d):
                    return !0;
                default:
                    return !1
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.imo = a.extend(a.fn.bootstrapValidator.i18n.imo || {}, {
        "default": "Please enter a valid IMO number"
    }), a.fn.bootstrapValidator.validators.imo = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            if (!/^IMO \d{7}$/i.test(c)) return !1;
            for (var d = 0, e = c.replace(/^.*(\d{7})$/, "$1"), f = 6; f >= 1; f--) d += e.slice(6 - f, -f) * (f + 1);
            return d % 10 === parseInt(e.charAt(6), 10)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.integer = a.extend(a.fn.bootstrapValidator.i18n.integer || {}, {
        "default": "Please enter a valid number"
    }), a.fn.bootstrapValidator.validators.integer = {
        enableByHtml5: function(a) {
            return "number" === a.attr("type") && (void 0 === a.attr("step") || a.attr("step") % 1 === 0)
        },
        validate: function(a, b) {
            if (this.enableByHtml5(b) && b.get(0).validity && b.get(0).validity.badInput === !0) return !1;
            var c = b.val();
            return "" === c ? !0 : /^(?:-?(?:0|[1-9][0-9]*))$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.ip = a.extend(a.fn.bootstrapValidator.i18n.ip || {}, {
        "default": "Please enter a valid IP address",
        ipv4: "Please enter a valid IPv4 address",
        ipv6: "Please enter a valid IPv6 address"
    }), a.fn.bootstrapValidator.validators.ip = {
        html5Attributes: {
            message: "message",
            ipv4: "ipv4",
            ipv6: "ipv6"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            d = a.extend({}, {
                ipv4: !0,
                ipv6: !0
            }, d);
            var f, g = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
                h = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
                i = !1;
            switch (!0) {
                case d.ipv4 && !d.ipv6:
                    i = g.test(e), f = d.message || a.fn.bootstrapValidator.i18n.ip.ipv4;
                    break;
                case !d.ipv4 && d.ipv6:
                    i = h.test(e), f = d.message || a.fn.bootstrapValidator.i18n.ip.ipv6;
                    break;
                case d.ipv4 && d.ipv6:
                default:
                    i = g.test(e) || h.test(e), f = d.message || a.fn.bootstrapValidator.i18n.ip["default"]
            }
            return {
                valid: i,
                message: f
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.isbn = a.extend(a.fn.bootstrapValidator.i18n.isbn || {}, {
        "default": "Please enter a valid ISBN number"
    }), a.fn.bootstrapValidator.validators.isbn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            var d;
            switch (!0) {
                case /^\d{9}[\dX]$/.test(c):
                case 13 === c.length && /^(\d+)-(\d+)-(\d+)-([\dX])$/.test(c):
                case 13 === c.length && /^(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(c):
                    d = "ISBN10";
                    break;
                case /^(978|979)\d{9}[\dX]$/.test(c):
                case 17 === c.length && /^(978|979)-(\d+)-(\d+)-(\d+)-([\dX])$/.test(c):
                case 17 === c.length && /^(978|979)\s(\d+)\s(\d+)\s(\d+)\s([\dX])$/.test(c):
                    d = "ISBN13";
                    break;
                default:
                    return !1
            }
            c = c.replace(/[^0-9X]/gi, "");
            var e, f, g = c.split(""),
                h = g.length,
                i = 0;
            switch (d) {
                case "ISBN10":
                    for (i = 0, e = 0; h - 1 > e; e++) i += parseInt(g[e], 10) * (10 - e);
                    return f = 11 - i % 11, 11 === f ? f = 0 : 10 === f && (f = "X"), f + "" === g[h - 1];
                case "ISBN13":
                    for (i = 0, e = 0; h - 1 > e; e++) i += e % 2 === 0 ? parseInt(g[e], 10) : 3 * parseInt(g[e], 10);
                    return f = 10 - i % 10, 10 === f && (f = "0"), f + "" === g[h - 1];
                default:
                    return !1
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.isin = a.extend(a.fn.bootstrapValidator.i18n.isin || {}, {
        "default": "Please enter a valid ISIN number"
    }), a.fn.bootstrapValidator.validators.isin = {
        COUNTRY_CODES: "AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW",
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            c = c.toUpperCase();
            var d = new RegExp("^(" + this.COUNTRY_CODES + ")[0-9A-Z]{10}$");
            if (!d.test(c)) return !1;
            for (var e = "", f = c.length, g = 0; f - 1 > g; g++) {
                var h = c.charCodeAt(g);
                e += h > 57 ? (h - 55).toString() : c.charAt(g)
            }
            var i = "",
                j = e.length,
                k = j % 2 !== 0 ? 0 : 1;
            for (g = 0; j > g; g++) i += parseInt(e[g], 10) * (g % 2 === k ? 2 : 1) + "";
            var l = 0;
            for (g = 0; g < i.length; g++) l += parseInt(i.charAt(g), 10);
            return l = (10 - l % 10) % 10, l + "" === c.charAt(f - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.ismn = a.extend(a.fn.bootstrapValidator.i18n.ismn || {}, {
        "default": "Please enter a valid ISMN number"
    }), a.fn.bootstrapValidator.validators.ismn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            var d;
            switch (!0) {
                case /^M\d{9}$/.test(c):
                case /^M-\d{4}-\d{4}-\d{1}$/.test(c):
                case /^M\s\d{4}\s\d{4}\s\d{1}$/.test(c):
                    d = "ISMN10";
                    break;
                case /^9790\d{9}$/.test(c):
                case /^979-0-\d{4}-\d{4}-\d{1}$/.test(c):
                case /^979\s0\s\d{4}\s\d{4}\s\d{1}$/.test(c):
                    d = "ISMN13";
                    break;
                default:
                    return !1
            }
            "ISMN10" === d && (c = "9790" + c.substr(1)), c = c.replace(/[^0-9]/gi, "");
            for (var e = c.length, f = 0, g = [1, 3], h = 0; e - 1 > h; h++) f += parseInt(c.charAt(h), 10) * g[h % 2];
            return f = 10 - f % 10, f + "" === c.charAt(e - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.issn = a.extend(a.fn.bootstrapValidator.i18n.issn || {}, {
        "default": "Please enter a valid ISSN number"
    }), a.fn.bootstrapValidator.validators.issn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            if (!/^\d{4}\-\d{3}[\dX]$/.test(c)) return !1;
            c = c.replace(/[^0-9X]/gi, "");
            var d = c.split(""),
                e = d.length,
                f = 0;
            "X" === d[7] && (d[7] = 10);
            for (var g = 0; e > g; g++) f += parseInt(d[g], 10) * (8 - g);
            return f % 11 === 0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.lessThan = a.extend(a.fn.bootstrapValidator.i18n.lessThan || {}, {
        "default": "Please enter a value less than or equal to %s",
        notInclusive: "Please enter a value less than %s"
    }), a.fn.bootstrapValidator.validators.lessThan = {
        html5Attributes: {
            message: "message",
            value: "value",
            inclusive: "inclusive"
        },
        enableByHtml5: function(a) {
            var b = a.attr("type"),
                c = a.attr("max");
            return c && "date" !== b ? {
                value: c
            } : !1
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            if (e = this._format(e), !a.isNumeric(e)) return !1;
            var f = a.isNumeric(d.value) ? d.value : b.getDynamicOption(c, d.value),
                g = this._format(f);
            return e = parseFloat(e), d.inclusive === !0 || void 0 === d.inclusive ? {
                valid: g >= e,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.lessThan["default"], f)
            } : {
                valid: g > e,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.lessThan.notInclusive, f)
            }
        },
        _format: function(a) {
            return (a + "").replace(",", ".")
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.mac = a.extend(a.fn.bootstrapValidator.i18n.mac || {}, {
        "default": "Please enter a valid MAC address"
    }), a.fn.bootstrapValidator.validators.mac = {
        validate: function(a, b) {
            var c = b.val();
            return "" === c ? !0 : /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(c)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.meid = a.extend(a.fn.bootstrapValidator.i18n.meid || {}, {
        "default": "Please enter a valid MEID number"
    }), a.fn.bootstrapValidator.validators.meid = {
        validate: function(b, c) {
            var d = c.val();
            if ("" === d) return !0;
            switch (!0) {
                case /^[0-9A-F]{15}$/i.test(d):
                case /^[0-9A-F]{2}[- ][0-9A-F]{6}[- ][0-9A-F]{6}[- ][0-9A-F]$/i.test(d):
                case /^\d{19}$/.test(d):
                case /^\d{5}[- ]\d{5}[- ]\d{4}[- ]\d{4}[- ]\d$/.test(d):
                    var e = d.charAt(d.length - 1);
                    if (d = d.replace(/[- ]/g, ""), d.match(/^\d*$/i)) return a.fn.bootstrapValidator.helpers.luhn(d);
                    d = d.slice(0, -1);
                    for (var f = "", g = 1; 13 >= g; g += 2) f += (2 * parseInt(d.charAt(g), 16)).toString(16);
                    var h = 0;
                    for (g = 0; g < f.length; g++) h += parseInt(f.charAt(g), 16);
                    return h % 10 === 0 ? "0" === e : e === (2 * (10 * Math.floor((h + 10) / 10) - h)).toString(16);
                case /^[0-9A-F]{14}$/i.test(d):
                case /^[0-9A-F]{2}[- ][0-9A-F]{6}[- ][0-9A-F]{6}$/i.test(d):
                case /^\d{18}$/.test(d):
                case /^\d{5}[- ]\d{5}[- ]\d{4}[- ]\d{4}$/.test(d):
                    return !0;
                default:
                    return !1
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.notEmpty = a.extend(a.fn.bootstrapValidator.i18n.notEmpty || {}, {
        "default": "Please enter a value"
    }), a.fn.bootstrapValidator.validators.notEmpty = {
        enableByHtml5: function(a) {
            var b = a.attr("required") + "";
            return "required" === b || "true" === b
        },
        validate: function(b, c) {
            var d = c.attr("type");
            return "radio" === d || "checkbox" === d ? b.getFieldElements(c.attr("data-bv-field")).filter(":checked").length > 0 : "number" === d && c.get(0).validity && c.get(0).validity.badInput === !0 ? !0 : "" !== a.trim(c.val())
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.numeric = a.extend(a.fn.bootstrapValidator.i18n.numeric || {}, {
        "default": "Please enter a valid float number"
    }), a.fn.bootstrapValidator.validators.numeric = {
        html5Attributes: {
            message: "message",
            separator: "separator"
        },
        enableByHtml5: function(a) {
            return "number" === a.attr("type") && void 0 !== a.attr("step") && a.attr("step") % 1 !== 0
        },
        validate: function(a, b, c) {
            if (this.enableByHtml5(b) && b.get(0).validity && b.get(0).validity.badInput === !0) return !1;
            var d = b.val();
            if ("" === d) return !0;
            var e = c.separator || ".";
            return "." !== e && (d = d.replace(e, ".")), !isNaN(parseFloat(d)) && isFinite(d)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.phone = a.extend(a.fn.bootstrapValidator.i18n.phone || {}, {
        "default": "Please enter a valid phone number",
        countryNotSupported: "The country code %s is not supported",
        country: "Please enter a valid phone number in %s",
        countries: {
            BR: "Brazil",
            CN: "China",
            CZ: "Czech Republic",
            DE: "Germany",
            DK: "Denmark",
            ES: "Spain",
            FR: "France",
            GB: "United Kingdom",
            MA: "Morocco",
            PK: "Pakistan",
            RO: "Romania",
            RU: "Russia",
            SK: "Slovakia",
            TH: "Thailand",
            US: "USA",
            VE: "Venezuela"
        }
    }), a.fn.bootstrapValidator.validators.phone = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        COUNTRY_CODES: ["BR", "CN", "CZ", "DE", "DK", "ES", "FR", "GB", "MA", "PK", "RO", "RU", "SK", "TH", "US", "VE"],
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f = d.country;
            if (("string" != typeof f || -1 === a.inArray(f, this.COUNTRY_CODES)) && (f = b.getDynamicOption(c, f)), !f || -1 === a.inArray(f.toUpperCase(), this.COUNTRY_CODES)) return {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.phone.countryNotSupported, f)
            };
            var g = !0;
            switch (f.toUpperCase()) {
                case "BR":
                    e = a.trim(e), g = /^(([\d]{4}[-.\s]{1}[\d]{2,3}[-.\s]{1}[\d]{2}[-.\s]{1}[\d]{2})|([\d]{4}[-.\s]{1}[\d]{3}[-.\s]{1}[\d]{4})|((\(?\+?[0-9]{2}\)?\s?)?(\(?\d{2}\)?\s?)?\d{4,5}[-.\s]?\d{4}))$/.test(e);
                    break;
                case "CN":
                    e = a.trim(e), g = /^((00|\+)?(86(?:-| )))?((\d{11})|(\d{3}[- ]{1}\d{4}[- ]{1}\d{4})|((\d{2,4}[- ]){1}(\d{7,8}|(\d{3,4}[- ]{1}\d{4}))([- ]{1}\d{1,4})?))$/.test(e);
                    break;
                case "CZ":
                    g = /^(((00)([- ]?)|\+)(420)([- ]?))?((\d{3})([- ]?)){2}(\d{3})$/.test(e);
                    break;
                case "DE":
                    e = a.trim(e), g = /^(((((((00|\+)49[ \-/]?)|0)[1-9][0-9]{1,4})[ \-/]?)|((((00|\+)49\()|\(0)[1-9][0-9]{1,4}\)[ \-/]?))[0-9]{1,7}([ \-/]?[0-9]{1,5})?)$/.test(e);
                    break;
                case "DK":
                    e = a.trim(e), g = /^(\+45|0045|\(45\))?\s?[2-9](\s?\d){7}$/.test(e);
                    break;
                case "ES":
                    e = a.trim(e), g = /^(?:(?:(?:\+|00)34\D?))?(?:9|6)(?:\d\D?){8}$/.test(e);
                    break;
                case "FR":
                    e = a.trim(e), g = /^(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}([ .-]?)(?:\d{2}\1?){3}\d{2}$/.test(e);
                    break;
                case "GB":
                    e = a.trim(e), g = /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/.test(e);
                    break;
                case "MA":
                    e = a.trim(e), g = /^(?:(?:(?:\+|00)212[\s]?(?:[\s]?\(0\)[\s]?)?)|0){1}(?:5[\s.-]?[2-3]|6[\s.-]?[13-9]){1}[0-9]{1}(?:[\s.-]?\d{2}){3}$/.test(e);
                    break;
                case "PK":
                    e = a.trim(e), g = /^0?3[0-9]{2}[0-9]{7}$/.test(e);
                    break;
                case "RO":
                    g = /^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/g.test(e);
                    break;
                case "RU":
                    g = /^((8|\+7|007)[\-\.\/ ]?)?([\(\/\.]?\d{3}[\)\/\.]?[\-\.\/ ]?)?[\d\-\.\/ ]{7,10}$/g.test(e);
                    break;
                case "SK":
                    g = /^(((00)([- ]?)|\+)(420)([- ]?))?((\d{3})([- ]?)){2}(\d{3})$/.test(e);
                    break;
                case "TH":
                    g = /^0\(?([6|8-9]{2})*-([0-9]{3})*-([0-9]{4})$/.test(e);
                    break;
                case "VE":
                    e = a.trim(e), g = /^0(?:2(?:12|4[0-9]|5[1-9]|6[0-9]|7[0-8]|8[1-35-8]|9[1-5]|3[45789])|4(?:1[246]|2[46]))\d{7}$/.test(e);
                    break;
                case "US":
                default:
                    e = e.replace(/\D/g, ""), g = /^(?:(1\-?)|(\+1 ?))?\(?(\d{3})[\)\-\.]?(\d{3})[\-\.]?(\d{4})$/.test(e) && 10 === e.length
            }
            return {
                valid: g,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.phone.country, a.fn.bootstrapValidator.i18n.phone.countries[f])
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.regexp = a.extend(a.fn.bootstrapValidator.i18n.regexp || {}, {
        "default": "Please enter a value matching the pattern"
    }), a.fn.bootstrapValidator.validators.regexp = {
        html5Attributes: {
            message: "message",
            regexp: "regexp"
        },
        enableByHtml5: function(a) {
            var b = a.attr("pattern");
            return b ? {
                regexp: b
            } : !1
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" === d) return !0;
            var e = "string" == typeof c.regexp ? new RegExp(c.regexp) : c.regexp;
            return e.test(d)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.remote = a.extend(a.fn.bootstrapValidator.i18n.remote || {}, {
        "default": "Please enter a valid value"
    }), a.fn.bootstrapValidator.validators.remote = {
        html5Attributes: {
            message: "message",
            name: "name",
            type: "type",
            url: "url",
            data: "data",
            delay: "delay"
        },
        destroy: function(a, b) {
            b.data("bv.remote.timer") && (clearTimeout(b.data("bv.remote.timer")), b.removeData("bv.remote.timer"))
        },
        validate: function(b, c, d) {
            function e() {
                var b = a.ajax({
                    type: k,
                    headers: l,
                    url: j,
                    dataType: "json",
                    data: i
                });
                return b.then(function(a) {
                    a.valid = a.valid === !0 || "true" === a.valid, g.resolve(c, "remote", a)
                }), g.fail(function() {
                    b.abort()
                }), g
            }
            var f = c.val(),
                g = new a.Deferred;
            if ("" === f) return g.resolve(c, "remote", {
                valid: !0
            }), g;
            var h = c.attr("data-bv-field"),
                i = d.data || {},
                j = d.url,
                k = d.type || "GET",
                l = d.headers || {};
            return "function" == typeof i && (i = i.call(this, b)), "string" == typeof i && (i = JSON.parse(i)), "function" == typeof j && (j = j.call(this, b)), i[d.name || h] = f, d.delay ? (c.data("bv.remote.timer") && clearTimeout(c.data("bv.remote.timer")), c.data("bv.remote.timer", setTimeout(e, d.delay)), g) : e()
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.rtn = a.extend(a.fn.bootstrapValidator.i18n.rtn || {}, {
        "default": "Please enter a valid RTN number"
    }), a.fn.bootstrapValidator.validators.rtn = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            if (!/^\d{9}$/.test(c)) return !1;
            for (var d = 0, e = 0; e < c.length; e += 3) d += 3 * parseInt(c.charAt(e), 10) + 7 * parseInt(c.charAt(e + 1), 10) + parseInt(c.charAt(e + 2), 10);
            return 0 !== d && d % 10 === 0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.sedol = a.extend(a.fn.bootstrapValidator.i18n.sedol || {}, {
        "default": "Please enter a valid SEDOL number"
    }), a.fn.bootstrapValidator.validators.sedol = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            if (c = c.toUpperCase(), !/^[0-9A-Z]{7}$/.test(c)) return !1;
            for (var d = 0, e = [1, 3, 1, 7, 3, 9, 1], f = c.length, g = 0; f - 1 > g; g++) d += e[g] * parseInt(c.charAt(g), 36);
            return d = (10 - d % 10) % 10, d + "" === c.charAt(f - 1)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.siren = a.extend(a.fn.bootstrapValidator.i18n.siren || {}, {
        "default": "Please enter a valid SIREN number"
    }), a.fn.bootstrapValidator.validators.siren = {
        validate: function(b, c) {
            var d = c.val();
            return "" === d ? !0 : /^\d{9}$/.test(d) ? a.fn.bootstrapValidator.helpers.luhn(d) : !1
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.siret = a.extend(a.fn.bootstrapValidator.i18n.siret || {}, {
        "default": "Please enter a valid SIRET number"
    }), a.fn.bootstrapValidator.validators.siret = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            for (var d, e = 0, f = c.length, g = 0; f > g; g++) d = parseInt(c.charAt(g), 10), g % 2 === 0 && (d = 2 * d, d > 9 && (d -= 9)), e += d;
            return e % 10 === 0
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.step = a.extend(a.fn.bootstrapValidator.i18n.step || {}, {
        "default": "Please enter a valid step of %s"
    }), a.fn.bootstrapValidator.validators.step = {
        html5Attributes: {
            message: "message",
            base: "baseValue",
            step: "step"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            if (d = a.extend({}, {
                    baseValue: 0,
                    step: 1
                }, d), e = parseFloat(e), !a.isNumeric(e)) return !1;
            var f = function(a, b) {
                    var c = Math.pow(10, b);
                    a *= c;
                    var d = a > 0 | -(0 > a),
                        e = a % 1 === .5 * d;
                    return e ? (Math.floor(a) + (d > 0)) / c : Math.round(a) / c
                },
                g = function(a, b) {
                    if (0 === b) return 1;
                    var c = (a + "").split("."),
                        d = (b + "").split("."),
                        e = (1 === c.length ? 0 : c[1].length) + (1 === d.length ? 0 : d[1].length);
                    return f(a - b * Math.floor(a / b), e)
                },
                h = g(e - d.baseValue, d.step);
            return {
                valid: 0 === h || h === d.step,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.step["default"], [d.step])
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.stringCase = a.extend(a.fn.bootstrapValidator.i18n.stringCase || {}, {
        "default": "Please enter only lowercase characters",
        upper: "Please enter only uppercase characters"
    }), a.fn.bootstrapValidator.validators.stringCase = {
        html5Attributes: {
            message: "message",
            "case": "case"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f = (d["case"] || "lower").toLowerCase();
            return {
                valid: "upper" === f ? e === e.toUpperCase() : e === e.toLowerCase(),
                message: d.message || ("upper" === f ? a.fn.bootstrapValidator.i18n.stringCase.upper : a.fn.bootstrapValidator.i18n.stringCase["default"])
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.stringLength = a.extend(a.fn.bootstrapValidator.i18n.stringLength || {}, {
        "default": "Please enter a value with valid length",
        less: "Please enter less than %s characters",
        more: "Please enter more than %s characters",
        between: "Please enter value between %s and %s characters long"
    }), a.fn.bootstrapValidator.validators.stringLength = {
        html5Attributes: {
            message: "message",
            min: "min",
            max: "max",
            trim: "trim",
            utf8bytes: "utf8Bytes"
        },
        enableByHtml5: function(b) {
            var c = {},
                d = b.attr("maxlength"),
                e = b.attr("minlength");
            return d && (c.max = parseInt(d, 10)), e && (c.min = parseInt(e, 10)), a.isEmptyObject(c) ? !1 : c
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ((d.trim === !0 || "true" === d.trim) && (e = a.trim(e)), "" === e) return !0;
            var f = a.isNumeric(d.min) ? d.min : b.getDynamicOption(c, d.min),
                g = a.isNumeric(d.max) ? d.max : b.getDynamicOption(c, d.max),
                h = function(a) {
                    for (var b = a.length, c = a.length - 1; c >= 0; c--) {
                        var d = a.charCodeAt(c);
                        d > 127 && 2047 >= d ? b++ : d > 2047 && 65535 >= d && (b += 2), d >= 56320 && 57343 >= d && c--
                    }
                    return b
                },
                i = d.utf8Bytes ? h(e) : e.length,
                j = !0,
                k = d.message || a.fn.bootstrapValidator.i18n.stringLength["default"];
            switch ((f && i < parseInt(f, 10) || g && i > parseInt(g, 10)) && (j = !1), !0) {
                case !!f && !!g:
                    k = a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.stringLength.between, [parseInt(f, 10), parseInt(g, 10)]);
                    break;
                case !!f:
                    k = a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.stringLength.more, parseInt(f, 10));
                    break;
                case !!g:
                    k = a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.stringLength.less, parseInt(g, 10))
            }
            return {
                valid: j,
                message: k
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.uri = a.extend(a.fn.bootstrapValidator.i18n.uri || {}, {
        "default": "Please enter a valid URI"
    }), a.fn.bootstrapValidator.validators.uri = {
        html5Attributes: {
            message: "message",
            allowlocal: "allowLocal",
            protocol: "protocol"
        },
        enableByHtml5: function(a) {
            return "url" === a.attr("type")
        },
        validate: function(a, b, c) {
            var d = b.val();
            if ("" === d) return !0;
            var e = c.allowLocal === !0 || "true" === c.allowLocal,
                f = (c.protocol || "http, https, ftp").split(",").join("|").replace(/\s/g, ""),
                g = new RegExp("^(?:(?:" + f + ")://)(?:\\S+(?::\\S*)?@)?(?:" + (e ? "" : "(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})") + "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" + (e ? "?" : "") + ")(?::\\d{2,5})?(?:/[^\\s]*)?$", "i");
            return g.test(d)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.uuid = a.extend(a.fn.bootstrapValidator.i18n.uuid || {}, {
        "default": "Please enter a valid UUID number",
        version: "Please enter a valid UUID version %s number"
    }), a.fn.bootstrapValidator.validators.uuid = {
        html5Attributes: {
            message: "message",
            version: "version"
        },
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f = {
                    3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
                    4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
                    5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
                    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
                },
                g = d.version ? d.version + "" : "all";
            return {
                valid: null === f[g] ? !0 : f[g].test(e),
                message: d.version ? a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.uuid.version, d.version) : d.message || a.fn.bootstrapValidator.i18n.uuid["default"]
            }
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.vat = a.extend(a.fn.bootstrapValidator.i18n.vat || {}, {
        "default": "Please enter a valid VAT number",
        countryNotSupported: "The country code %s is not supported",
        country: "Please enter a valid VAT number in %s",
        countries: {
            AT: "Austria",
            BE: "Belgium",
            BG: "Bulgaria",
            BR: "Brazil",
            CH: "Switzerland",
            CY: "Cyprus",
            CZ: "Czech Republic",
            DE: "Germany",
            DK: "Denmark",
            EE: "Estonia",
            ES: "Spain",
            FI: "Finland",
            FR: "France",
            GB: "United Kingdom",
            GR: "Greek",
            EL: "Greek",
            HU: "Hungary",
            HR: "Croatia",
            IE: "Ireland",
            IS: "Iceland",
            IT: "Italy",
            LT: "Lithuania",
            LU: "Luxembourg",
            LV: "Latvia",
            MT: "Malta",
            NL: "Netherlands",
            NO: "Norway",
            PL: "Poland",
            PT: "Portugal",
            RO: "Romania",
            RU: "Russia",
            RS: "Serbia",
            SE: "Sweden",
            SI: "Slovenia",
            SK: "Slovakia",
            VE: "Venezuela",
            ZA: "South Africa"
        }
    }), a.fn.bootstrapValidator.validators.vat = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        COUNTRY_CODES: ["AT", "BE", "BG", "BR", "CH", "CY", "CZ", "DE", "DK", "EE", "EL", "ES", "FI", "FR", "GB", "GR", "HR", "HU", "IE", "IS", "IT", "LT", "LU", "LV", "MT", "NL", "NO", "PL", "PT", "RO", "RU", "RS", "SE", "SK", "SI", "VE", "ZA"],
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e) return !0;
            var f = d.country;
            if (f ? ("string" != typeof f || -1 === a.inArray(f.toUpperCase(), this.COUNTRY_CODES)) && (f = b.getDynamicOption(c, f)) : f = e.substr(0, 2), -1 === a.inArray(f, this.COUNTRY_CODES)) return {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.vat.countryNotSupported, f)
            };
            var g = ["_", f.toLowerCase()].join("");
            return this[g](e) ? !0 : {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.vat.country, a.fn.bootstrapValidator.i18n.vat.countries[f.toUpperCase()])
            }
        },
        _at: function(a) {
            if (/^ATU[0-9]{8}$/.test(a) && (a = a.substr(2)), !/^U[0-9]{8}$/.test(a)) return !1;
            a = a.substr(1);
            for (var b = 0, c = [1, 2, 1, 2, 1, 2, 1], d = 0, e = 0; 7 > e; e++) d = parseInt(a.charAt(e), 10) * c[e], d > 9 && (d = Math.floor(d / 10) + d % 10), b += d;
            return b = 10 - (b + 4) % 10, 10 === b && (b = 0), b + "" === a.substr(7, 1)
        },
        _be: function(a) {
            if (/^BE[0]{0,1}[0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[0]{0,1}[0-9]{9}$/.test(a)) return !1;
            if (9 === a.length && (a = "0" + a), "0" === a.substr(1, 1)) return !1;
            var b = parseInt(a.substr(0, 8), 10) + parseInt(a.substr(8, 2), 10);
            return b % 97 === 0
        },
        _bg: function(b) {
            if (/^BG[0-9]{9,10}$/.test(b) && (b = b.substr(2)), !/^[0-9]{9,10}$/.test(b)) return !1;
            var c = 0,
                d = 0;
            if (9 === b.length) {
                for (d = 0; 8 > d; d++) c += parseInt(b.charAt(d), 10) * (d + 1);
                if (c %= 11, 10 === c)
                    for (c = 0, d = 0; 8 > d; d++) c += parseInt(b.charAt(d), 10) * (d + 3);
                return c %= 10, c + "" === b.substr(8)
            }
            if (10 === b.length) {
                var e = function(b) {
                        var c = parseInt(b.substr(0, 2), 10) + 1900,
                            d = parseInt(b.substr(2, 2), 10),
                            e = parseInt(b.substr(4, 2), 10);
                        if (d > 40 ? (c += 100, d -= 40) : d > 20 && (c -= 100, d -= 20), !a.fn.bootstrapValidator.helpers.date(c, d, e)) return !1;
                        for (var f = 0, g = [2, 4, 8, 5, 10, 9, 7, 3, 6], h = 0; 9 > h; h++) f += parseInt(b.charAt(h), 10) * g[h];
                        return f = f % 11 % 10, f + "" === b.substr(9, 1)
                    },
                    f = function(a) {
                        for (var b = 0, c = [21, 19, 17, 13, 11, 9, 7, 3, 1], d = 0; 9 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
                        return b %= 10, b + "" === a.substr(9, 1)
                    },
                    g = function(a) {
                        for (var b = 0, c = [4, 3, 2, 7, 6, 5, 4, 3, 2], d = 0; 9 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
                        return b = 11 - b % 11, 10 === b ? !1 : (11 === b && (b = 0), b + "" === a.substr(9, 1))
                    };
                return e(b) || f(b) || g(b)
            }
            return !1
        },
        _br: function(a) {
            if ("" === a) return !0;
            var b = a.replace(/[^\d]+/g, "");
            if ("" === b || 14 !== b.length) return !1;
            if ("00000000000000" === b || "11111111111111" === b || "22222222222222" === b || "33333333333333" === b || "44444444444444" === b || "55555555555555" === b || "66666666666666" === b || "77777777777777" === b || "88888888888888" === b || "99999999999999" === b) return !1;
            for (var c = b.length - 2, d = b.substring(0, c), e = b.substring(c), f = 0, g = c - 7, h = c; h >= 1; h--) f += parseInt(d.charAt(c - h), 10) * g--, 2 > g && (g = 9);
            var i = 2 > f % 11 ? 0 : 11 - f % 11;
            if (i !== parseInt(e.charAt(0), 10)) return !1;
            for (c += 1, d = b.substring(0, c), f = 0, g = c - 7, h = c; h >= 1; h--) f += parseInt(d.charAt(c - h), 10) * g--, 2 > g && (g = 9);
            return i = 2 > f % 11 ? 0 : 11 - f % 11, i === parseInt(e.charAt(1), 10)
        },
        _ch: function(a) {
            if (/^CHE[0-9]{9}(MWST)?$/.test(a) && (a = a.substr(2)), !/^E[0-9]{9}(MWST)?$/.test(a)) return !1;
            a = a.substr(1);
            for (var b = 0, c = [5, 4, 3, 2, 7, 6, 5, 4], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = 11 - b % 11, 10 === b ? !1 : (11 === b && (b = 0), b + "" === a.substr(8, 1))
        },
        _cy: function(a) {
            if (/^CY[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(a) && (a = a.substr(2)), !/^[0-5|9]{1}[0-9]{7}[A-Z]{1}$/.test(a)) return !1;
            if ("12" === a.substr(0, 2)) return !1;
            for (var b = 0, c = {
                    0: 1,
                    1: 0,
                    2: 5,
                    3: 7,
                    4: 9,
                    5: 13,
                    6: 15,
                    7: 17,
                    8: 19,
                    9: 21
                }, d = 0; 8 > d; d++) {
                var e = parseInt(a.charAt(d), 10);
                d % 2 === 0 && (e = c[e + ""]), b += e
            }
            return b = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" [b % 26], b + "" === a.substr(8, 1)
        },
        _cz: function(b) {
            if (/^CZ[0-9]{8,10}$/.test(b) && (b = b.substr(2)), !/^[0-9]{8,10}$/.test(b)) return !1;
            var c = 0,
                d = 0;
            if (8 === b.length) {
                if (b.charAt(0) + "" == "9") return !1;
                for (c = 0, d = 0; 7 > d; d++) c += parseInt(b.charAt(d), 10) * (8 - d);
                return c = 11 - c % 11, 10 === c && (c = 0), 11 === c && (c = 1), c + "" === b.substr(7, 1)
            }
            if (9 === b.length && b.charAt(0) + "" == "6") {
                for (c = 0, d = 0; 7 > d; d++) c += parseInt(b.charAt(d + 1), 10) * (8 - d);
                return c = 11 - c % 11, 10 === c && (c = 0), 11 === c && (c = 1), c = [8, 7, 6, 5, 4, 3, 2, 1, 0, 9, 10][c - 1], c + "" === b.substr(8, 1)
            }
            if (9 === b.length || 10 === b.length) {
                var e = 1900 + parseInt(b.substr(0, 2), 10),
                    f = parseInt(b.substr(2, 2), 10) % 50 % 20,
                    g = parseInt(b.substr(4, 2), 10);
                if (9 === b.length) {
                    if (e >= 1980 && (e -= 100), e > 1953) return !1
                } else 1954 > e && (e += 100);
                if (!a.fn.bootstrapValidator.helpers.date(e, f, g)) return !1;
                if (10 === b.length) {
                    var h = parseInt(b.substr(0, 9), 10) % 11;
                    return 1985 > e && (h %= 10), h + "" === b.substr(9, 1)
                }
                return !0
            }
            return !1
        },
        _de: function(b) {
            return /^DE[0-9]{9}$/.test(b) && (b = b.substr(2)), /^[0-9]{9}$/.test(b) ? a.fn.bootstrapValidator.helpers.mod11And10(b) : !1
        },
        _dk: function(a) {
            if (/^DK[0-9]{8}$/.test(a) && (a = a.substr(2)), !/^[0-9]{8}$/.test(a)) return !1;
            for (var b = 0, c = [2, 7, 6, 5, 4, 3, 2, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 11 === 0
        },
        _ee: function(a) {
            if (/^EE[0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[0-9]{9}$/.test(a)) return !1;
            for (var b = 0, c = [3, 7, 1, 3, 7, 1, 3, 7, 1], d = 0; 9 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 10 === 0
        },
        _es: function(a) {
            if (/^ES[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(a) && (a = a.substr(2)), !/^[0-9A-Z][0-9]{7}[0-9A-Z]$/.test(a)) return !1;
            var b = function(a) {
                    var b = parseInt(a.substr(0, 8), 10);
                    return b = "TRWAGMYFPDXBNJZSQVHLCKE" [b % 23], b + "" === a.substr(8, 1)
                },
                c = function(a) {
                    var b = ["XYZ".indexOf(a.charAt(0)), a.substr(1)].join("");
                    return b = parseInt(b, 10), b = "TRWAGMYFPDXBNJZSQVHLCKE" [b % 23], b + "" === a.substr(8, 1)
                },
                d = function(a) {
                    var b, c = a.charAt(0);
                    if (-1 !== "KLM".indexOf(c)) return b = parseInt(a.substr(1, 8), 10), b = "TRWAGMYFPDXBNJZSQVHLCKE" [b % 23], b + "" === a.substr(8, 1);
                    if (-1 !== "ABCDEFGHJNPQRSUVW".indexOf(c)) {
                        for (var d = 0, e = [2, 1, 2, 1, 2, 1, 2], f = 0, g = 0; 7 > g; g++) f = parseInt(a.charAt(g + 1), 10) * e[g], f > 9 && (f = Math.floor(f / 10) + f % 10), d += f;
                        return d = 10 - d % 10, d + "" === a.substr(8, 1) || "JABCDEFGHI" [d] === a.substr(8, 1)
                    }
                    return !1
                },
                e = a.charAt(0);
            return /^[0-9]$/.test(e) ? b(a) : /^[XYZ]$/.test(e) ? c(a) : d(a)
        },
        _fi: function(a) {
            if (/^FI[0-9]{8}$/.test(a) && (a = a.substr(2)), !/^[0-9]{8}$/.test(a)) return !1;
            for (var b = 0, c = [7, 9, 10, 5, 8, 4, 2, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 11 === 0
        },
        _fr: function(b) {
            if (/^FR[0-9A-Z]{2}[0-9]{9}$/.test(b) && (b = b.substr(2)), !/^[0-9A-Z]{2}[0-9]{9}$/.test(b)) return !1;
            if (!a.fn.bootstrapValidator.helpers.luhn(b.substr(2))) return !1;
            if (/^[0-9]{2}$/.test(b.substr(0, 2))) return b.substr(0, 2) === parseInt(b.substr(2) + "12", 10) % 97 + "";
            var c, d = "0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
            return c = /^[0-9]{1}$/.test(b.charAt(0)) ? 24 * d.indexOf(b.charAt(0)) + d.indexOf(b.charAt(1)) - 10 : 34 * d.indexOf(b.charAt(0)) + d.indexOf(b.charAt(1)) - 100, (parseInt(b.substr(2), 10) + 1 + Math.floor(c / 11)) % 11 === c % 11
        },
        _gb: function(a) {
            if ((/^GB[0-9]{9}$/.test(a) || /^GB[0-9]{12}$/.test(a) || /^GBGD[0-9]{3}$/.test(a) || /^GBHA[0-9]{3}$/.test(a) || /^GB(GD|HA)8888[0-9]{5}$/.test(a)) && (a = a.substr(2)), !(/^[0-9]{9}$/.test(a) || /^[0-9]{12}$/.test(a) || /^GD[0-9]{3}$/.test(a) || /^HA[0-9]{3}$/.test(a) || /^(GD|HA)8888[0-9]{5}$/.test(a))) return !1;
            var b = a.length;
            if (5 === b) {
                var c = a.substr(0, 2),
                    d = parseInt(a.substr(2), 10);
                return "GD" === c && 500 > d || "HA" === c && d >= 500
            }
            if (11 === b && ("GD8888" === a.substr(0, 6) || "HA8888" === a.substr(0, 6))) return "GD" === a.substr(0, 2) && parseInt(a.substr(6, 3), 10) >= 500 || "HA" === a.substr(0, 2) && parseInt(a.substr(6, 3), 10) < 500 ? !1 : parseInt(a.substr(6, 3), 10) % 97 === parseInt(a.substr(9, 2), 10);
            if (9 === b || 12 === b) {
                for (var e = 0, f = [8, 7, 6, 5, 4, 3, 2, 10, 1], g = 0; 9 > g; g++) e += parseInt(a.charAt(g), 10) * f[g];
                return e %= 97, parseInt(a.substr(0, 3), 10) >= 100 ? 0 === e || 42 === e || 55 === e : 0 === e
            }
            return !0
        },
        _gr: function(a) {
            if (/^(GR|EL)[0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[0-9]{9}$/.test(a)) return !1;
            8 === a.length && (a = "0" + a);
            for (var b = 0, c = [256, 128, 64, 32, 16, 8, 4, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = b % 11 % 10, b + "" === a.substr(8, 1)
        },
        _el: function(a) {
            return this._gr(a)
        },
        _hu: function(a) {
            if (/^HU[0-9]{8}$/.test(a) && (a = a.substr(2)), !/^[0-9]{8}$/.test(a)) return !1;
            for (var b = 0, c = [9, 7, 3, 1, 9, 7, 3, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 10 === 0
        },
        _hr: function(b) {
            return /^HR[0-9]{11}$/.test(b) && (b = b.substr(2)), /^[0-9]{11}$/.test(b) ? a.fn.bootstrapValidator.helpers.mod11And10(b) : !1
        },
        _ie: function(a) {
            if (/^IE[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(a) && (a = a.substr(2)), !/^[0-9]{1}[0-9A-Z\*\+]{1}[0-9]{5}[A-Z]{1,2}$/.test(a)) return !1;
            var b = function(a) {
                for (; a.length < 7;) a = "0" + a;
                for (var b = "WABCDEFGHIJKLMNOPQRSTUV", c = 0, d = 0; 7 > d; d++) c += parseInt(a.charAt(d), 10) * (8 - d);
                return c += 9 * b.indexOf(a.substr(7)), b[c % 23]
            };
            return /^[0-9]+$/.test(a.substr(0, 7)) ? a.charAt(7) === b(a.substr(0, 7) + a.substr(8) + "") : -1 !== "ABCDEFGHIJKLMNOPQRSTUVWXYZ+*".indexOf(a.charAt(1)) ? a.charAt(7) === b(a.substr(2, 5) + a.substr(0, 1) + "") : !0
        },
        _is: function(a) {
            return /^IS[0-9]{5,6}$/.test(a) && (a = a.substr(2)), /^[0-9]{5,6}$/.test(a)
        },
        _it: function(b) {
            if (/^IT[0-9]{11}$/.test(b) && (b = b.substr(2)), !/^[0-9]{11}$/.test(b)) return !1;
            if (0 === parseInt(b.substr(0, 7), 10)) return !1;
            var c = parseInt(b.substr(7, 3), 10);
            return 1 > c || c > 201 && 999 !== c && 888 !== c ? !1 : a.fn.bootstrapValidator.helpers.luhn(b)
        },
        _lt: function(a) {
            if (/^LT([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(a) && (a = a.substr(2)), !/^([0-9]{7}1[0-9]{1}|[0-9]{10}1[0-9]{1})$/.test(a)) return !1;
            var b, c = a.length,
                d = 0;
            for (b = 0; c - 1 > b; b++) d += parseInt(a.charAt(b), 10) * (1 + b % 9);
            var e = d % 11;
            if (10 === e)
                for (d = 0, b = 0; c - 1 > b; b++) d += parseInt(a.charAt(b), 10) * (1 + (b + 2) % 9);
            return e = e % 11 % 10, e + "" === a.charAt(c - 1)
        },
        _lu: function(a) {
            return /^LU[0-9]{8}$/.test(a) && (a = a.substr(2)), /^[0-9]{8}$/.test(a) ? parseInt(a.substr(0, 6), 10) % 89 + "" === a.substr(6, 2) : !1
        },
        _lv: function(b) {
            if (/^LV[0-9]{11}$/.test(b) && (b = b.substr(2)), !/^[0-9]{11}$/.test(b)) return !1;
            var c, d = parseInt(b.charAt(0), 10),
                e = 0,
                f = [],
                g = b.length;
            if (d > 3) {
                for (e = 0, f = [9, 1, 4, 8, 3, 10, 2, 5, 7, 6, 1], c = 0; g > c; c++) e += parseInt(b.charAt(c), 10) * f[c];
                return e %= 11, 3 === e
            }
            var h = parseInt(b.substr(0, 2), 10),
                i = parseInt(b.substr(2, 2), 10),
                j = parseInt(b.substr(4, 2), 10);
            if (j = j + 1800 + 100 * parseInt(b.charAt(6), 10), !a.fn.bootstrapValidator.helpers.date(j, i, h)) return !1;
            for (e = 0, f = [10, 5, 8, 4, 2, 1, 6, 3, 7, 9], c = 0; g - 1 > c; c++) e += parseInt(b.charAt(c), 10) * f[c];
            return e = (e + 1) % 11 % 10, e + "" === b.charAt(g - 1)
        },
        _mt: function(a) {
            if (/^MT[0-9]{8}$/.test(a) && (a = a.substr(2)), !/^[0-9]{8}$/.test(a)) return !1;
            for (var b = 0, c = [3, 4, 6, 7, 8, 9, 10, 1], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 37 === 0
        },
        _nl: function(a) {
            if (/^NL[0-9]{9}B[0-9]{2}$/.test(a) && (a = a.substr(2)), !/^[0-9]{9}B[0-9]{2}$/.test(a)) return !1;
            for (var b = 0, c = [9, 8, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b %= 11, b > 9 && (b = 0), b + "" === a.substr(8, 1)
        },
        _no: function(a) {
            if (/^NO[0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[0-9]{9}$/.test(a)) return !1;
            for (var b = 0, c = [3, 2, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = 11 - b % 11, 11 === b && (b = 0), b + "" === a.substr(8, 1)
        },
        _pl: function(a) {
            if (/^PL[0-9]{10}$/.test(a) && (a = a.substr(2)), !/^[0-9]{10}$/.test(a)) return !1;
            for (var b = 0, c = [6, 5, 7, 2, 3, 4, 5, 6, 7, -1], d = 0; 10 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b % 11 === 0
        },
        _pt: function(a) {
            if (/^PT[0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[0-9]{9}$/.test(a)) return !1;
            for (var b = 0, c = [9, 8, 7, 6, 5, 4, 3, 2], d = 0; 8 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = 11 - b % 11, b > 9 && (b = 0), b + "" === a.substr(8, 1)
        },
        _ro: function(a) {
            if (/^RO[1-9][0-9]{1,9}$/.test(a) && (a = a.substr(2)), !/^[1-9][0-9]{1,9}$/.test(a)) return !1;
            for (var b = a.length, c = [7, 5, 3, 2, 1, 7, 5, 3, 2].slice(10 - b), d = 0, e = 0; b - 1 > e; e++) d += parseInt(a.charAt(e), 10) * c[e];
            return d = 10 * d % 11 % 10, d + "" === a.substr(b - 1, 1)
        },
        _ru: function(a) {
            if (/^RU([0-9]{10}|[0-9]{12})$/.test(a) && (a = a.substr(2)), !/^([0-9]{10}|[0-9]{12})$/.test(a)) return !1;
            var b = 0;
            if (10 === a.length) {
                var c = 0,
                    d = [2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
                for (b = 0; 10 > b; b++) c += parseInt(a.charAt(b), 10) * d[b];
                return c %= 11, c > 9 && (c %= 10), c + "" === a.substr(9, 1)
            }
            if (12 === a.length) {
                var e = 0,
                    f = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0],
                    g = 0,
                    h = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8, 0];
                for (b = 0; 11 > b; b++) e += parseInt(a.charAt(b), 10) * f[b], g += parseInt(a.charAt(b), 10) * h[b];
                return e %= 11, e > 9 && (e %= 10), g %= 11, g > 9 && (g %= 10), e + "" === a.substr(10, 1) && g + "" === a.substr(11, 1)
            }
            return !1
        },
        _rs: function(a) {
            if (/^RS[0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[0-9]{9}$/.test(a)) return !1;
            for (var b = 10, c = 0, d = 0; 8 > d; d++) c = (parseInt(a.charAt(d), 10) + b) % 10, 0 === c && (c = 10), b = 2 * c % 11;
            return (b + parseInt(a.substr(8, 1), 10)) % 10 === 1
        },
        _se: function(b) {
            return /^SE[0-9]{10}01$/.test(b) && (b = b.substr(2)), /^[0-9]{10}01$/.test(b) ? (b = b.substr(0, 10), a.fn.bootstrapValidator.helpers.luhn(b)) : !1
        },
        _si: function(a) {
            if (/^SI[0-9]{8}$/.test(a) && (a = a.substr(2)), !/^[0-9]{8}$/.test(a)) return !1;
            for (var b = 0, c = [8, 7, 6, 5, 4, 3, 2], d = 0; 7 > d; d++) b += parseInt(a.charAt(d), 10) * c[d];
            return b = 11 - b % 11, 10 === b && (b = 0), b + "" === a.substr(7, 1)
        },
        _sk: function(a) {
            return /^SK[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(a) && (a = a.substr(2)), /^[1-9][0-9][(2-4)|(6-9)][0-9]{7}$/.test(a) ? parseInt(a, 10) % 11 === 0 : !1
        },
        _ve: function(a) {
            if (/^VE[VEJPG][0-9]{9}$/.test(a) && (a = a.substr(2)), !/^[VEJPG][0-9]{9}$/.test(a)) return !1;
            for (var b = {
                    V: 4,
                    E: 8,
                    J: 12,
                    P: 16,
                    G: 20
                }, c = b[a.charAt(0)], d = [3, 2, 7, 6, 5, 4, 3, 2], e = 0; 8 > e; e++) c += parseInt(a.charAt(e + 1), 10) * d[e];
            return c = 11 - c % 11, (11 === c || 10 === c) && (c = 0), c + "" === a.substr(9, 1)
        },
        _za: function(a) {
            return /^ZA4[0-9]{9}$/.test(a) && (a = a.substr(2)), /^4[0-9]{9}$/.test(a)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.vin = a.extend(a.fn.bootstrapValidator.i18n.vin || {}, {
        "default": "Please enter a valid VIN number"
    }), a.fn.bootstrapValidator.validators.vin = {
        validate: function(a, b) {
            var c = b.val();
            if ("" === c) return !0;
            if (!/^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/i.test(c)) return !1;
            c = c.toUpperCase();
            for (var d = {
                    A: 1,
                    B: 2,
                    C: 3,
                    D: 4,
                    E: 5,
                    F: 6,
                    G: 7,
                    H: 8,
                    J: 1,
                    K: 2,
                    L: 3,
                    M: 4,
                    N: 5,
                    P: 7,
                    R: 9,
                    S: 2,
                    T: 3,
                    U: 4,
                    V: 5,
                    W: 6,
                    X: 7,
                    Y: 8,
                    Z: 9,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7,
                    8: 8,
                    9: 9,
                    0: 0
                }, e = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2], f = 0, g = c.length, h = 0; g > h; h++) f += d[c.charAt(h) + ""] * e[h];
            var i = f % 11;
            return 10 === i && (i = "X"), i + "" === c.charAt(8)
        }
    }
}(window.jQuery),
function(a) {
    a.fn.bootstrapValidator.i18n.zipCode = a.extend(a.fn.bootstrapValidator.i18n.zipCode || {}, {
        "default": "Please enter a valid postal code",
        countryNotSupported: "The country code %s is not supported",
        country: "Please enter a valid postal code in %s",
        countries: {
            AT: "Austria",
            BR: "Brazil",
            CA: "Canada",
            CH: "Switzerland",
            CZ: "Czech Republic",
            DE: "Germany",
            DK: "Denmark",
            FR: "France",
            GB: "United Kingdom",
            IE: "Ireland",
            IT: "Italy",
            MA: "Morocco",
            NL: "Netherlands",
            PT: "Portugal",
            RO: "Romania",
            RU: "Russia",
            SE: "Sweden",
            SG: "Singapore",
            SK: "Slovakia",
            US: "USA"
        }
    }), a.fn.bootstrapValidator.validators.zipCode = {
        html5Attributes: {
            message: "message",
            country: "country"
        },
        COUNTRY_CODES: ["AT", "BR", "CA", "CH", "CZ", "DE", "DK", "FR", "GB", "IE", "IT", "MA", "NL", "PT", "RO", "RU", "SE", "SG", "SK", "US"],
        validate: function(b, c, d) {
            var e = c.val();
            if ("" === e || !d.country) return !0;
            var f = d.country;
            if (("string" != typeof f || -1 === a.inArray(f, this.COUNTRY_CODES)) && (f = b.getDynamicOption(c, f)), !f || -1 === a.inArray(f.toUpperCase(), this.COUNTRY_CODES)) return {
                valid: !1,
                message: a.fn.bootstrapValidator.helpers.format(a.fn.bootstrapValidator.i18n.zipCode.countryNotSupported, f)
            };
            var g = !1;
            switch (f = f.toUpperCase()) {
                case "AT":
                    g = /^([1-9]{1})(\d{3})$/.test(e);
                    break;
                case "BR":
                    g = /^(\d{2})([\.]?)(\d{3})([\-]?)(\d{3})$/.test(e);
                    break;
                case "CA":
                    g = /^(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|X|Y){1}[0-9]{1}(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|W|X|Y|Z){1}\s?[0-9]{1}(?:A|B|C|E|G|H|J|K|L|M|N|P|R|S|T|V|W|X|Y|Z){1}[0-9]{1}$/i.test(e);
                    break;
                case "CH":
                    g = /^([1-9]{1})(\d{3})$/.test(e);
                    break;
                case "CZ":
                    g = /^(\d{3})([ ]?)(\d{2})$/.test(e);
                    break;
                case "DE":
                    g = /^(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})$/.test(e);
                    break;
                case "DK":
                    g = /^(DK(-|\s)?)?\d{4}$/i.test(e);
                    break;
                case "FR":
                    g = /^[0-9]{5}$/i.test(e);
                    break;
                case "GB":
                    g = this._gb(e);
                    break;
                case "IE":
                    g = /^(D6W|[ACDEFHKNPRTVWXY]\d{2})\s[0-9ACDEFHKNPRTVWXY]{4}$/.test(e);
                    break;
                case "IT":
                    g = /^(I-|IT-)?\d{5}$/i.test(e);
                    break;
                case "MA":
                    g = /^[1-9][0-9]{4}$/i.test(e);
                    break;
                case "NL":
                    g = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i.test(e);
                    break;
                case "PT":
                    g = /^[1-9]\d{3}-\d{3}$/.test(e);
                    break;
                case "RO":
                    g = /^(0[1-8]{1}|[1-9]{1}[0-5]{1})?[0-9]{4}$/i.test(e);
                    break;
                case "RU":
                    g = /^[0-9]{6}$/i.test(e);
                    break;
                case "SE":
                    g = /^(S-)?\d{3}\s?\d{2}$/i.test(e);
                    break;
                case "SG":
                    g = /^([0][1-9]|[1-6][0-9]|[7]([0-3]|[5-9])|[8][0-2])(\d{4})$/i.test(e);
                    break;
                case "SK":
                    g = /^(\d{3})([ ]?)(\d{2})$/.test(e);
                    break;
                case "US":
                default:
                    g = /^\d{4,5}([\-]?\d{4})?$/.test(e)
            }
            return {
                valid: g,
                message: a.fn.bootstrapValidator.helpers.format(d.message || a.fn.bootstrapValidator.i18n.zipCode.country, a.fn.bootstrapValidator.i18n.zipCode.countries[f])
            }
        },
        _gb: function(a) {
            for (var b = "[ABCDEFGHIJKLMNOPRSTUWYZ]", c = "[ABCDEFGHKLMNOPQRSTUVWXY]", d = "[ABCDEFGHJKPMNRSTUVWXY]", e = "[ABEHMNPRVWXY]", f = "[ABDEFGHJLNPQRSTUWXYZ]", g = [new RegExp("^(" + b + "{1}" + c + "?[0-9]{1,2})(\\s*)([0-9]{1}" + f + "{2})$", "i"), new RegExp("^(" + b + "{1}[0-9]{1}" + d + "{1})(\\s*)([0-9]{1}" + f + "{2})$", "i"), new RegExp("^(" + b + "{1}" + c + "{1}?[0-9]{1}" + e + "{1})(\\s*)([0-9]{1}" + f + "{2})$", "i"), new RegExp("^(BF1)(\\s*)([0-6]{1}[ABDEFGHJLNPQRST]{1}[ABDEFGHJLNPQRSTUWZYZ]{1})$", "i"), /^(GIR)(\s*)(0AA)$/i, /^(BFPO)(\s*)([0-9]{1,4})$/i, /^(BFPO)(\s*)(c\/o\s*[0-9]{1,3})$/i, /^([A-Z]{4})(\s*)(1ZZ)$/i, /^(AI-2640)$/i], h = 0; h < g.length; h++)
                if (g[h].test(a)) return !0;
            return !1
        }
    }
}(window.jQuery);