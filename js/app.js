var app = app || {};


(function () {
    var router = Sammy(function () {
        var selector = '#container';
        var requester = app.requster.load('kid_-kUf1yQo1Z', 'b05c84a4eb8d40579c689fc2dfffa1d2', 'https://baas.kinvey.com/');

        var userModel = app.userModel.load(requester);
        var notesModel = app.notesModel.load(requester);

        var userViewBag = app.userViewBag.load();
        var homeViewBag = app.homeViewBag.load();
        var notesViewBag = app.notesViewBag.load();

        var userController = app.userController.load(userViewBag, userModel);
        var homeController = app.homeController.load(homeViewBag);
        var notesController = app.notesController.load(notesViewBag, notesModel);

        this.before({ except: { path: '#\/(login\/|register\/)?' } }, function () {
            if (!sessionStorage['sessionId']) {
                this.redirect('#/');
                return false;
            }
        });

        this.before(function () {
           if(!sessionStorage['sessionId']) {
               $('#menu').hide();
           } else {
               $('#welcomeMenu').text('Welcome, ' + sessionStorage['fullName']);
               $('#menu').show();
           }
        });

        this.get('#/login/', function () {
            userController.loadLoginPage(selector);
        });

        this.get('#/register/', function () {
            userController.loadRegisterPage(selector);
        });

        this.get('#/', function () {
            homeController.loadWelcomePage(selector);
        });

        this.get('#/home/', function () {
            homeController.loadHomePage(selector);
        });

        this.get('#/welcome/', function () {
            homeController.loadWelcomePage(selector);
        });

        this.get('#/logout/', function () {
            userController.logout();
        });

        this.get('#/office/', function () {
            notesController.loadNotes(selector);
        });

        this.get('#/myNotes/', function () {
            notesController.loadMyNotes(selector);
        });

        this.get('#/addNote/', function () {
            notesController.loadAddNote(selector);
        });

        this.bind('redirectUrl', function(ev, data) {
            this.redirect(data.url);
        });

        this.bind('login', function(ev, data) {
            userController.login(data);
        });

        this.bind('register', function(ev, data) {
            userController.register(data);
        });

        this.bind('addNote', function (ev, data) {
            notesController.addNote(data);
        });

        this.bind('showEditNote', function (ev, data) {
            notesController.loadEditNote(selector, data);
        });

        this.bind('editNote', function (ev, data) {
            notesController.editNote(data);
        });

        this.bind('showDeleteNote', function (ev, data) {
            notesController.loadDeleteNote(selector, data);
        });

        this.bind('deleteNote', function (ev, data) {
            notesController.deleteNote(data._id);
        });
    });

    router.run('#/');
}());