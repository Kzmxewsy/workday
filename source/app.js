var app = new Vue({
    el: "#app",
    data: {
        hour: 0,
        minute: 0,
        standard_h: 7,
        standard_m: 15,
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
        tip: '',
        isReadOnly: false,
    },
    methods: {
        gettime: function () {
            var b = this.checkdata();
            if (!b) {
                return false
            }

            var a = this.convert(this.hour, this.minute);
            this.result_d = a[0];
            this.result_h = a[1];
            this.result_m = a[2];
            this.addhistory();
            this.isReadOnly = true;
            this.getsum();
        }, convert: function (h, m) {
            var s = parseInt(this.standard_h) * 60 + parseInt(this.standard_m), e = Math.floor(h * 60),
                d = Math.floor(m),
                c = (e + d) / s, a,
                f, g, i;

            f = Math.floor(c);
            a = (e + d) - (f * s);
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
            if (this.standard_h == 0 && this.standard_m == 0) {
                this.tip = '时间基准不能为零';
                this.seen = true;
                return false
            }

            if (parseInt(this.hour) != parseFloat(this.hour) || parseInt(this.minute) != parseFloat(this.minute)) {
                this.result_d = 0;
                this.result_h = 0;
                this.result_m = 0;
                this.tip = '请输入整数';
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
            this.isReadOnly = false;
            this.getsum();
        }, getsum: function () {
            var a = this.convert(this.hours, this.minutes);
            this.result_ds = a[0];
            this.result_hs = a[1];
            this.result_ms = a[2];
        }
    }
});