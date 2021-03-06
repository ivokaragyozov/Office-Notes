var app = app || {};

app.notesModel = (function () {
    function NotesModel(requester){
        this.requester = requester;
        this.serviceUrl = requester.baseUrl + 'appdata/' + requester.appId + '/notes/';
    }

    NotesModel.prototype.getNotesForToday = function (deadline) {
        var requestUrl = this.serviceUrl + '?query={"deadline":"' + deadline + '"}&resolve=_acl.creator';
        return this.requester.get(requestUrl, true);
    };

    NotesModel.prototype.getNotesForTodayByPage = function (deadline, page) {
        var requestUrl = this.serviceUrl + '?query={"deadline":"' + deadline + '"}&resolve=_acl.creator&count=1000&limit=10&skip=' + (10 * (page - 1));
        return this.requester.get(requestUrl, true);
    };

    NotesModel.prototype.getNotesByCreatorId = function (creatorId) {
        var requestUrl = this.serviceUrl + '?query={"_acl.creator":"' + creatorId + '"}';
        return this.requester.get(requestUrl, true);
    };

    NotesModel.prototype.getNotesByCreatorIdByPage = function (creatorId, page) {
        var requestUrl = this.serviceUrl + '?query={"_acl.creator":"' + creatorId + '"}&count=1000&limit=10&skip=' + (10 * (page - 1));
        return this.requester.get(requestUrl, true);
    };

    NotesModel.prototype.addNote = function (data) {
        return this.requester.post(this.serviceUrl, data, true);
    };

    NotesModel.prototype.editNote = function (noteId, data) {
        var requestUrl = this.serviceUrl + noteId;
        return this.requester.put(requestUrl, data, true);
    };

    NotesModel.prototype.deleteNote = function (noteId) {
        var requestUrl = this.serviceUrl + noteId;
        return this.requester.delete(requestUrl, true);
    };

    return {
        load: function (requester) {
            return new NotesModel(requester);
        }
    }
}());