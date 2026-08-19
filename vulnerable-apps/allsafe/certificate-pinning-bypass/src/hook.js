Java.perform(function () {
    var CertificatePinner = Java.use("okhttp3.CertificatePinner");

    CertificatePinner["check$okhttp"].overload('java.lang.String', 'kotlin.jvm.functions.Function0').implementation = function (hostname, certChainFn) {
        console.log("[*] bypassed : " + hostname);
        return;
    };

    console.log("[*] hook installed");
});