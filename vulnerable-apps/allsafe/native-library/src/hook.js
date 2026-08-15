var checkPassAddr = DebugSymbol.fromName("_Z9checkPassP7_JNIEnvP8_jstring").address;

Interceptor.attach(checkPassAddr, {
    onLeave: function (retval) {
        console.log("원래 리턴값: " + retval);
        retval.replace(1);
        console.log("조작된 리턴값: " + retval);
    }
});