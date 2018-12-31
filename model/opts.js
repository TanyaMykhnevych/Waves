let opts = {
    D: 2,                           // triangle size for 3d visualize
    N: 500,                         // 3 * 167 = 501
    OMEGA: (0.2 /(2 * Math.PI)).toFixed(4),  // 0.2 < OMEGA < 0.8
    W: 0.99,
    Kvis: 2**9,                     // visualise coefficient
    _3d: 1,
    _1d: 0,

    stringify() {
        return `"D": ${this.D},
"N": ${this.N},
"W": ${this.W},
"OMEGA": ${this.OMEGA},
"Kvis": ${this.Kvis},
"_3d": ${this._3d},
"_1d": ${this._1d}`;
    },

    parse() {
        let obj = JSON.parse("{" + optsArea.value + "}");
        obj.N = Math.round(obj.N / obj.D) * obj.D;
        obj.OMEGA = obj.OMEGA.toFixed(4);

        let resetNeeded =
            this._3d !== obj._3d ||
            this.N !== obj.N ||
            this.D !== obj.D;
        Object.assign(this, obj);
        return resetNeeded;
    }
};
