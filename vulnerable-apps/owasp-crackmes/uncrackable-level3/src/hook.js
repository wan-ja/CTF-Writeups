Java.perform(function () {
    // 1. Root Detection 클래스의 세 메소드 모두 false 리턴하도록 강제
    var RootDetection = Java.use("sg.vantagepoint.util.RootDetection");
    RootDetection.checkRoot1.overload().implementation = function () { return false; };
    RootDetection.checkRoot2.overload().implementation = function () { return false; };
    RootDetection.checkRoot3.overload().implementation = function () { return false; };

    // 2. IntegrityCheck.isDebuggable도 false로
    var IntegrityCheck = Java.use("sg.vantagepoint.util.IntegrityCheck");
    IntegrityCheck.isDebuggable.overload("android.content.Context").implementation = function (ctx) { return false; };

    // 3. Debug.isDebuggerConnected 자체를 후킹 (Frida attach 감지 무력화)
    var Debug = Java.use("android.os.Debug");
    Debug.isDebuggerConnected.overload().implementation = function () { return false; };
});