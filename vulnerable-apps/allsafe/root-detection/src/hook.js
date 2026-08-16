Java.perform(function () {
    var RootBeer = Java.use("com.scottyab.rootbeer.RootBeer");
    RootBeer.isRooted.overload().implementation = function () {
        console.log("Hooked!");
        return false;
    };
});