var app = app || {};

app.userController = (function () {

    function UserController (viewBag,model) {
        this.model = model;
        this.viewBag = viewBag;
    }

    UserController.prototype.loadLoginPage = function (selector) {
        this.viewBag.showLoginPage(selector);
    };
    UserController.prototype.login = function (data) {
        return this.model.login(data)
            .then(function(success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['fullName'] = success.fullName;
                sessionStorage['userId'] = success._id;

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/home/'});
                })

                Noty.success("Login successfully!");
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };

    UserController.prototype.loadRegisterPage = function(selector) {
        this.viewBag.showRegisterPage(selector);
    };
    UserController.prototype.register = function(data) {
        this.model.register(data)
            .then(function (success) {
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['fullName'] = success.fullName;
                sessionStorage['userId'] = success._id;

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/home/'});
                })

                Noty.success("Register successfully!");
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };


    UserController.prototype.logout = function() {
        this.model.logout()
            .then(function() {
                sessionStorage.clear();

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/'});
                })

                Noty.success("Logout successfully!");
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };

    return {
        load: function(viewBag,model) {
            return new UserController(viewBag, model);
        }
    }
}());