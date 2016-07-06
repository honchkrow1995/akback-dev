/**
 * Created by carlosrenato on 06-27-16.
 */
demoApp.filter('ByTab', function () {

    return function (items, name) {

        var arrayToReturn = [];
        for (var i in items) {
            if (items[i].Tab == name) {
                arrayToReturn.push(items[i]);
            }
        }

        return arrayToReturn;
    };
});

demoApp.filter('ByCol', function () {

    return function (items, name) {

        var arrayToReturn = [];
        for (var i in items) {
            if (items[i].Column == name) {
                arrayToReturn.push(items[i]);
            }
        }

        return arrayToReturn;
    };
});