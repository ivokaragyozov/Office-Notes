var app = app || {};

app.notesController = (function () {
    function NotesController(viewBag, model) {
        this.viewBag = viewBag;
        this.model = model;
    }

    NotesController.prototype.loadNotes = function (selector, page) {
        var _this = this;
        var date = new Date().toISOString().substr(0, 10);

        this.model.getNotesForTodayByPage(date, page)
            .then(function (data) {
                var results = {
                    notes: [], 
                    count: 10
                };

                _this.model.getNotesForToday(date)
                    .then(function (data1) {
                        results.count = data1.length;
                        data.forEach(function (note) {
                            results.notes.push({
                                title: note.title,
                                text: note.text,
                                deadline: note.deadline,
                                author: note.author,
                                id: note._id
                            })
                        });

                        _this.viewBag.showNotes(selector, results);
                    });
            } , function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };

    NotesController.prototype.loadMyNotes = function (selector, page) {
        var _this = this;
        var userId = sessionStorage['userId'];

        this.model.getNotesByCreatorIdByPage(userId, page)
            .then(function (data) {
                var results = {
                    notes: [],
                    count: 10
                };

                _this.model.getNotesByCreatorId(userId)
                    .then(function (data1) {
                        results.count = data1.length;

                        data.forEach(function (note) {
                            results.notes.push({
                                title: note.title,
                                text: note.text,
                                deadline: note.deadline,
                                author: note.author,
                                id: note._id
                            })
                        });

                        _this.viewBag.showMyNotes(selector, results);
                    });
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };

    NotesController.prototype.loadAddNote = function (selector) {
        this.viewBag.showAddNote(selector);
    };

    NotesController.prototype.addNote = function (data) {
        var newNote = {
            title: data.title,
            text: data.text,
            deadline: data.deadline,
            author: sessionStorage['username']
        };

        this.model.addNote(newNote)
            .then(function () {
                Noty.success('Note added successfully!', 'top');
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };

    NotesController.prototype.loadEditNote = function (selector, data) {
        this.viewBag.showEditNote(selector, data);
    };

    NotesController.prototype.editNote = function (data) {
        data.author = sessionStorage['username'];

        this.model.editNote(data._id, data)
            .then(function () {
                window.location.reload('#/myNotes/');
                Noty.success('Note edited successfully!', 'top');
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };

    NotesController.prototype.loadDeleteNote = function (selector, data) {
        this.viewBag.showDeleteNote(selector, data);
    };

    NotesController.prototype.deleteNote = function (noteId) {
        this.model.deleteNote(noteId)
            .then(function () {
                window.location.reload('#/myNotes/');
                Noty.success('Note deleted successfully!', 'top');
            }, function (error) {
                Noty.error(error.responseJSON.error, 'top');
            });
    };

    return {
        load: function (viewBag, model) {
            return new NotesController(viewBag, model);
        }
    }
}());