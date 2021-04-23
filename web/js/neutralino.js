var Neutralino = function (e) {
    var t = {};

    function n(i) {
        if (t[i]) return t[i].exports;
        var o = t[i] = {i: i, l: !1, exports: {}};
        return e[i].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }

    return n.m = e, n.c = t, n.d = function (e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: i})
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) n.d(i, o, function (t) {
            return e[t]
        }.bind(null, o));
        return i
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 2)
}([function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.request = t.RequestType = void 0, function (e) {
        e.GET = "GET", e.POST = "POST"
    }(t.RequestType || (t.RequestType = {})), t.request = function (e) {
        return new Promise((t, n) => {
            let i = "", o = function () {
                let e;
                return e = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP"), e
            }();
            o.onreadystatechange = () => {
                if (4 == o.readyState && 200 == o.status) {
                    let e = null, i = o.responseText;
                    i && (e = JSON.parse(i)), e && e.success && t(e), e && e.error && n(e.error)
                } else 4 == o.readyState && n("Neutralino server is offline. Try restarting the application")
            }, e.isNativeMethod && (e.url = "/__nativeMethod_" + e.url), e.data && (i = JSON.stringify(e.data)), "GET" == e.type && (o.open("GET", e.url, !0), o.setRequestHeader("Authorization", "Basic " + window.NL_TOKEN), o.send()), "POST" == e.type && (o.open("POST", e.url, !0), o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), o.setRequestHeader("Authorization", "Basic " + window.NL_TOKEN), o.send(i))
        })
    }
}, function (e, t, n) {
    "use strict";
    var i = this && this.__awaiter || function (e, t, n, i) {
        return new (n || (n = Promise))((function (o, r) {
            function u(e) {
                try {
                    s(i.next(e))
                } catch (e) {
                    r(e)
                }
            }

            function a(e) {
                try {
                    s(i.throw(e))
                } catch (e) {
                    r(e)
                }
            }

            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(u, a)
            }

            s((i = i.apply(e, t || [])).next())
        }))
    };
    Object.defineProperty(t, "__esModule", {value: !0}), t.open = t.getConfig = t.keepAlive = t.exit = void 0;
    const o = n(0);
    t.exit = function () {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "app.exit", type: o.RequestType.POST, isNativeMethod: !0})
        }))
    }, t.keepAlive = function () {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "app.keepAlive", type: o.RequestType.GET, isNativeMethod: !0})
        }))
    }, t.getConfig = function () {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "app.getConfig", type: o.RequestType.GET, isNativeMethod: !0})
        }))
    }, t.open = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "app.open", type: o.RequestType.POST, data: e, isNativeMethod: !0})
        }))
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.init = t.app = t.debug = t.storage = t.computer = t.os = t.filesystem = void 0, t.filesystem = n(3), t.os = n(4), t.computer = n(5), t.storage = n(6), t.debug = n(7), t.app = n(1);
    var i = n(8);
    Object.defineProperty(t, "init", {
        enumerable: !0, get: function () {
            return i.init
        }
    })
}, function (e, t, n) {
    "use strict";
    var i = this && this.__awaiter || function (e, t, n, i) {
        return new (n || (n = Promise))((function (o, r) {
            function u(e) {
                try {
                    s(i.next(e))
                } catch (e) {
                    r(e)
                }
            }

            function a(e) {
                try {
                    s(i.throw(e))
                } catch (e) {
                    r(e)
                }
            }

            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(u, a)
            }

            s((i = i.apply(e, t || [])).next())
        }))
    };
    Object.defineProperty(t, "__esModule", {value: !0}), t.readDirectory = t.removeFile = t.readFile = t.writeFile = t.removeDirectory = t.createDirectory = void 0;
    const o = n(0);
    t.createDirectory = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({
                url: "filesystem.createDirectory",
                type: o.RequestType.POST,
                data: e,
                isNativeMethod: !0
            })
        }))
    }, t.removeDirectory = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({
                url: "filesystem.removeDirectory",
                type: o.RequestType.POST,
                data: e,
                isNativeMethod: !0
            })
        }))
    }, t.writeFile = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "filesystem.writeFile", type: o.RequestType.POST, data: e, isNativeMethod: !0})
        }))
    }, t.readFile = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "filesystem.readFile", type: o.RequestType.POST, data: e, isNativeMethod: !0})
        }))
    }, t.removeFile = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({
                url: "filesystem.removeFile",
                type: o.RequestType.POST,
                data: e,
                isNativeMethod: !0
            })
        }))
    }, t.readDirectory = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({
                url: "filesystem.readDirectory",
                type: o.RequestType.POST,
                data: e,
                isNativeMethod: !0
            })
        }))
    }
}, function (e, t, n) {
    "use strict";
    var i = this && this.__awaiter || function (e, t, n, i) {
        return new (n || (n = Promise))((function (o, r) {
            function u(e) {
                try {
                    s(i.next(e))
                } catch (e) {
                    r(e)
                }
            }

            function a(e) {
                try {
                    s(i.throw(e))
                } catch (e) {
                    r(e)
                }
            }

            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(u, a)
            }

            s((i = i.apply(e, t || [])).next())
        }))
    };
    Object.defineProperty(t, "__esModule", {value: !0}), t.showMessageBox = t.showNotification = t.showDialogSave = t.showDialogOpen = t.getEnvar = t.execCommand = t.MessageBoxType = void 0;
    const o = n(0);
    !function (e) {
        e.WARN = "WARN", e.ERROR = "ERROR", e.INFO = "INFO", e.QUESTION = "QUESTION"
    }(t.MessageBoxType || (t.MessageBoxType = {})), t.execCommand = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "os.execCommand", type: o.RequestType.POST, data: e, isNativeMethod: !0})
        }))
    }, t.getEnvar = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "os.getEnvar", type: o.RequestType.POST, data: e, isNativeMethod: !0})
        }))
    }, t.showDialogOpen = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "os.dialogOpen", type: o.RequestType.POST, data: e, isNativeMethod: !0})
        }))
    }, t.showDialogSave = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "os.dialogSave", type: o.RequestType.POST, data: e, isNativeMethod: !0})
        }))
    }, t.showNotification = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "os.showNotification", type: o.RequestType.POST, data: e, isNativeMethod: !0})
        }))
    }, t.showMessageBox = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "os.showMessageBox", type: o.RequestType.POST, data: e, isNativeMethod: !0})
        }))
    }
}, function (e, t, n) {
    "use strict";
    var i = this && this.__awaiter || function (e, t, n, i) {
        return new (n || (n = Promise))((function (o, r) {
            function u(e) {
                try {
                    s(i.next(e))
                } catch (e) {
                    r(e)
                }
            }

            function a(e) {
                try {
                    s(i.throw(e))
                } catch (e) {
                    r(e)
                }
            }

            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(u, a)
            }

            s((i = i.apply(e, t || [])).next())
        }))
    };
    Object.defineProperty(t, "__esModule", {value: !0}), t.getRamUsage = void 0;
    const o = n(0);
    t.getRamUsage = function () {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "computer.getRamUsage", type: o.RequestType.GET, isNativeMethod: !0})
        }))
    }
}, function (e, t, n) {
    "use strict";
    var i = this && this.__awaiter || function (e, t, n, i) {
        return new (n || (n = Promise))((function (o, r) {
            function u(e) {
                try {
                    s(i.next(e))
                } catch (e) {
                    r(e)
                }
            }

            function a(e) {
                try {
                    s(i.throw(e))
                } catch (e) {
                    r(e)
                }
            }

            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(u, a)
            }

            s((i = i.apply(e, t || [])).next())
        }))
    };
    Object.defineProperty(t, "__esModule", {value: !0}), t.getData = t.putData = void 0;
    const o = n(0);
    t.putData = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "storage.putData", type: o.RequestType.POST, data: e, isNativeMethod: !0})
        }))
    }, t.getData = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "storage.getData", type: o.RequestType.POST, data: e, isNativeMethod: !0})
        }))
    }
}, function (e, t, n) {
    "use strict";
    var i = this && this.__awaiter || function (e, t, n, i) {
        return new (n || (n = Promise))((function (o, r) {
            function u(e) {
                try {
                    s(i.next(e))
                } catch (e) {
                    r(e)
                }
            }

            function a(e) {
                try {
                    s(i.throw(e))
                } catch (e) {
                    r(e)
                }
            }

            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(u, a)
            }

            s((i = i.apply(e, t || [])).next())
        }))
    };
    Object.defineProperty(t, "__esModule", {value: !0}), t.log = t.LoggerType = void 0;
    const o = n(0);
    !function (e) {
        e.WARN = "WARN", e.ERROR = "ERROR", e.INFO = "INFO"
    }(t.LoggerType || (t.LoggerType = {})), t.log = function (e) {
        return i(this, void 0, void 0, (function* () {
            return yield o.request({url: "debug.log", type: o.RequestType.POST, data: e, isNativeMethod: !0})
        }))
    }
}, function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {value: !0}), t.init = void 0;
    const i = n(9), o = n(10);
    t.init = function () {
        if (window.NL_MODE && "browser" == window.NL_MODE && i.ping.start(), void 0 !== window.NL_ARGS) for (let e = 0; e < window.NL_ARGS.length; e++) if ("--debug-mode" == window.NL_ARGS[e]) {
            o.devClient.start();
            break
        }
    }
}, function (e, t, n) {
    "use strict";
    var i = this && this.__awaiter || function (e, t, n, i) {
        return new (n || (n = Promise))((function (o, r) {
            function u(e) {
                try {
                    s(i.next(e))
                } catch (e) {
                    r(e)
                }
            }

            function a(e) {
                try {
                    s(i.throw(e))
                } catch (e) {
                    r(e)
                }
            }

            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(u, a)
            }

            s((i = i.apply(e, t || [])).next())
        }))
    };
    Object.defineProperty(t, "__esModule", {value: !0}), t.ping = void 0;
    const o = n(1);
    t.ping = {
        start: () => {
            setInterval(() => i(void 0, void 0, void 0, (function* () {
                yield o.keepAlive()
            })), 5e3)
        }
    }
}, function (e, t, n) {
    "use strict";
    var i = this && this.__awaiter || function (e, t, n, i) {
        return new (n || (n = Promise))((function (o, r) {
            function u(e) {
                try {
                    s(i.next(e))
                } catch (e) {
                    r(e)
                }
            }

            function a(e) {
                try {
                    s(i.throw(e))
                } catch (e) {
                    r(e)
                }
            }

            function s(e) {
                var t;
                e.done ? o(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                    e(t)
                }))).then(u, a)
            }

            s((i = i.apply(e, t || [])).next())
        }))
    };
    Object.defineProperty(t, "__esModule", {value: !0}), t.devClient = void 0;
    const o = n(0);
    t.devClient = {
        start: function () {
            setInterval(() => i(this, void 0, void 0, (function* () {
                try {
                    (yield o.request({
                        url: "http://localhost:5050",
                        type: o.RequestType.GET
                    })).needsReload && location.reload()
                } catch (e) {
                    console.error("Unable to communicate with neu devServer")
                }
            })), 1e3)
        }
    }
}]);