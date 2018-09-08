var app = new Vue({
    el: "#app",
    data: {
        hour: 0,
        minute: 0,
        standard: 7.25,
        result_d: 0,
        result_h: 0,
        result_m: 0,
        result_ds: 0,
        result_hs: 0,
        result_ms: 0,
        seen: false,
        history: [],
        hours: 0,
        minutes: 0,
        count: 0,
    },
    methods: {
        gettime: function () {
            var a = this.convert(this.hour, this.minute);
            this.result_d = a[0];
            this.result_h = a[1];
            this.result_m = a[2];
            this.addhistory();
            this.getsum();
        }, convert: function (h, m) {
            var e = Math.floor(h * 60), d = Math.floor(m), c = (e + d) / (this.standard * 60), a, b,
                f, g, i;
            b = this.checkdata();
            if (!b) {
                return false
            }
            f = Math.floor(c);
            a = (e + d) - (f * this.standard * 60);
            g = Math.floor(a / 60);
            i = Math.floor(a % 60);
            return [f, g, i]
        }, addhistory: function () {
            this.hours += parseInt(this.hour);
            this.minutes += parseInt(this.minute);
            this.history.unshift({
                input: parseInt(this.hour) + " 小时 " + parseInt(this.minute) + " 分钟",
                text: this.result_d + " 天 " + this.result_h + " 小时 " + this.result_m + " 分钟"
            });
            this.count = this.history.length;
        }, checkdata: function () {
            if (parseInt(this.hour) != parseFloat(this.hour) || parseInt(this.minute) != parseFloat(this.minute)) {
                this.result_d = 0;
                this.result_h = 0;
                this.result_m = 0;
                this.seen = true;
                return false
            }
            this.seen = false;
            return true
        }, clearhistory: function () {
            this.hour = 0;
            this.minute = 0;
            this.count = 0;
            this.hours = 0;
            this.minutes = 0;
            this.history = [];
            this.getsum();
        }, getsum: function () {
            var a = this.convert(this.hours, this.minutes);
            this.result_ds = a[0];
            this.result_hs = a[1];
            this.result_ms = a[2];
        }
    }
});