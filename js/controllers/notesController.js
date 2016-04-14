var app = app || {};

app.notesController = (function () {
    function NotesController(viewBag, model) {
        this.viewBag = viewBag;
        this.model = model;
    }

    NotesController.prototype.loadNotes = function (selector) {
        var _this = this;
        var date = new Date().toISOString().substr(0, 10);

        this.model.getNotesForToday(date)
            .then(function (data) {
                var results = {
                    notes: []
                };

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
    };

    NotesController.prototype.loadMyNotes = function (selector) {
        var _this = this;
        var userId = sessionStorage['userId'];

        this.model.getNotesByCreatorId(userId)
            .then(function (data) {
                var results = {
                    notes: []
                };

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
            .then(function (seccess) {
                console.log(success);
            });
    };

    NotesController.prototype.loadEditNote = function (selector, data) {
        this.viewBag.showEditNote(selector, data);
    };

    NotesController.prototype.editNote = function (data) {
        data.author = sessionStorage['username'];

        this.model.editNote(data._id, data)
            .then(function (seccess) {
                console.log(success);
            });
    };

    NotesController.prototype.loadDeleteNote = function (selector, data) {
        this.viewBag.showDeleteNote(selector, data);
    };

    NotesController.prototype.deleteNote = function (noteId) {
        this.model.deleteNote(noteId)
            .then(function (seccess) {
                console.log(success);
            });
    };

    return {
        load: function (viewBag, model) {
            return new NotesController(viewBag, model);
        }
    }
}());