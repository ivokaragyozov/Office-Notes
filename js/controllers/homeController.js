var app = app || {};

app.homeController = (function () {

    function HomeController(viewBag) {
        this.viewBag = viewBag;
    }

    HomeController.prototype.loadHomePage = function (selector) {
        var data = {
            fullName: sessionStorage['fullName'],
            username: sessionStorage['username']
        };

        this.viewBag.loadHomePage(selector, data);
    };
    HomeController.prototype.loadWelcomePage = function (selector) {
        this.viewBag.loadWelcomePage(selector);
    };

    return {
        load: function (viewBag) {
            return new HomeController(viewBag);
        }
    }
}());