Java.perform(function () {
    var a = Java.use("sg.vantagepoint.a.a");

    a.a.overload('[B', '[B').implementation = function (bArr, bArr2) {
        var result = this.a(bArr, bArr2);

        var StringClass = Java.use("java.lang.String");
        var decrypted = StringClass.$new(result);

        console.log("secret string = " + decrypted);

        return result;
    };
});