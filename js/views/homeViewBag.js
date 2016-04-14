var app = app || {};

app.homeViewBag = (function () {
    function loadHomePage(selector, data) {
        $.get("templates/home.html", function (templ) {
            var renderedData = Mustache.render(templ, data);
            $(selector).html(renderedData);
        });
    }
    function loadWelcomePage(selector) {
        $.get("templates/welcome.html", function (templ) {
            $(selector).html(templ);
        })
    }

    return {
        load: function () {
            return {
                loadHomePage: loadHomePage,
                loadWelcomePage: loadWelcomePage
            }
        }
    }
}());