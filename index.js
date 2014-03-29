(function() {
    !function() {
        var d3 = {
            version: "3.4.4"
        };
        d3.random = {
            normal: function(µ, σ) {
                var n = arguments.length;
                if (n < 2) σ = 1;
                if (n < 1) µ = 0;
                return function() {
                    var x, y, r;
                    do {
                        x = Math.random() * 2 - 1;
                        y = Math.random() * 2 - 1;
                        r = x * x + y * y;
                    } while (!r || r > 1);
                    return µ + σ * x * Math.sqrt(-2 * Math.log(r) / r);
                };
            },
            logNormal: function() {
                var random = d3.random.normal.apply(d3, arguments);
                return function() {
                    return Math.exp(random());
                };
            },
            bates: function(m) {
                var random = d3.random.irwinHall(m);
                return function() {
                    return random() / m;
                };
            },
            irwinHall: function(m) {
                return function() {
                    for (var s = 0, j = 0; j < m; j++) s += Math.random();
                    return s;
                };
            }
        };
        var d3_arraySlice = [].slice, d3_array = function(list) {
            return d3_arraySlice.call(list);
        };
        var d3_document = document, d3_documentElement = d3_document.documentElement, d3_window = window;
        try {
            d3_array(d3_documentElement.childNodes)[0].nodeType;
        } catch (e) {
            d3_array = function(list) {
                var i = list.length, array = new Array(i);
                while (i--) array[i] = list[i];
                return array;
            };
        }
        var d3_nsPrefix = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        };
        d3.ns = {
            prefix: d3_nsPrefix,
            qualify: function(name) {
                var i = name.indexOf(":"), prefix = name;
                if (i >= 0) {
                    prefix = name.substring(0, i);
                    name = name.substring(i + 1);
                }
                return d3_nsPrefix.hasOwnProperty(prefix) ? {
                    space: d3_nsPrefix[prefix],
                    local: name
                } : name;
            }
        };
        d3.transform = function(string) {
            var g = d3_document.createElementNS(d3.ns.prefix.svg, "g");
            return (d3.transform = function(string) {
                if (string != null) {
                    g.setAttribute("transform", string);
                    var t = g.transform.baseVal.consolidate();
                }
                return new d3_transform(t ? t.matrix : d3_transformIdentity);
            })(string);
        };
        function d3_transform(m) {
            var r0 = [ m.a, m.b ], r1 = [ m.c, m.d ], kx = d3_transformNormalize(r0), kz = d3_transformDot(r0, r1), ky = d3_transformNormalize(d3_transformCombine(r1, r0, -kz)) || 0;
            if (r0[0] * r1[1] < r1[0] * r0[1]) {
                r0[0] *= -1;
                r0[1] *= -1;
                kx *= -1;
                kz *= -1;
            }
            this.rotate = (kx ? Math.atan2(r0[1], r0[0]) : Math.atan2(-r1[0], r1[1])) * d3_degrees;
            this.translate = [ m.e, m.f ];
            this.scale = [ kx, ky ];
            this.skew = ky ? Math.atan2(kz, ky) * d3_degrees : 0;
        }
        d3_transform.prototype.toString = function() {
            return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
        };
        function d3_transformDot(a, b) {
            return a[0] * b[0] + a[1] * b[1];
        }
        function d3_transformNormalize(a) {
            var k = Math.sqrt(d3_transformDot(a, a));
            if (k) {
                a[0] /= k;
                a[1] /= k;
            }
            return k;
        }
        function d3_transformCombine(a, b, k) {
            a[0] += k * b[0];
            a[1] += k * b[1];
            return a;
        }
        var d3_transformIdentity = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: 0,
            f: 0
        };
        if (typeof define === "function" && define.amd) {
            define(d3);
        } else if (typeof module === "object" && module.exports) {
            module.exports = d3;
        } else {
            this.d3 = d3;
        }
    }();
})();