"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by voska_000 on 28.07.2017.
 */
var express = require("express");
var fs_1 = require("fs");
var path_1 = require("path");
var _1 = require("./common/");
var filePath = path_1.join(__dirname, './data/book-series.db.json');
var BookSeries = (function () {
    // countOfDownloads: number;
    function BookSeries(data) {
        this.id = _1.createGUID();
        Object.assign(this, data);
    }
    BookSeries.getAllBookSeries = function () {
        return JSON.parse(fs_1.readFileSync(filePath).toString());
    };
    BookSeries.getBookSeries = function (id) {
        return this.getAllBookSeries().find(function (b) { return b.id === id; });
    };
    BookSeries.createBookSeries = function (data) {
        var bookSeries = new BookSeries(data);
        var books = this.getAllBookSeries();
        books.push(bookSeries);
        this.saveAllBookSeries(books);
        return bookSeries;
    };
    BookSeries.updateBookSeries = function (data) {
        var books = this.getAllBookSeries();
        var booksIndex = books.findIndex(function (b) { return b.id === data.id; });
        books.splice(booksIndex, 1, data);
        this.saveAllBookSeries(books);
        return data;
    };
    BookSeries.deleteBookSeries = function (id) {
        var books = this.getAllBookSeries();
        var bookIndex = books.findIndex(function (b) { return b.id === id; });
        books.splice(bookIndex, 1);
        this.saveAllBookSeries(books);
    };
    BookSeries.saveAllBookSeries = function (bookList) {
        fs_1.writeFileSync(filePath, JSON.stringify(bookList, null, 2));
    };
    return BookSeries;
}());
exports.BookSeriesRouter = express.Router();
exports.BookSeriesRouter.get('/book-series-list', function (req, res) {
    res.json(BookSeries.getAllBookSeries());
});
exports.BookSeriesRouter.post('/:countryId', function (req, res) {
    res.json(BookSeries.getBookSeries(req.params.id));
});
// create book-series
exports.BookSeriesRouter.post('/', function (req, res) {
    res.json(BookSeries.createBookSeries(req.body));
});
// update book-series
exports.BookSeriesRouter.post('/:countryId', function (req, res) {
    var data = req.body;
    data.id = req.params.id;
    res.json(BookSeries.updateBookSeries(data));
});
// delete book-series
exports.BookSeriesRouter.delete('/:countryId', function (req, res) {
    var id = req.params.id;
    res.json(BookSeries.deleteBookSeries(id));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvaG9zcG9naC9EZXNrdG9wL2JldFByb2plY3RMaWJyYXJpdW0vbGlicmFyaXVtL3NyYy9zZXJ2ZXItYXBpL2Jvb2stc2VyaWVzLnRzIiwic291cmNlcyI6WyIvaG9tZS9ob3Nwb2doL0Rlc2t0b3AvYmV0UHJvamVjdExpYnJhcml1bS9saWJyYXJpdW0vc3JjL3NlcnZlci1hcGkvYm9vay1zZXJpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILGlDQUFtQztBQUNuQyx5QkFBK0M7QUFDL0MsNkJBQTBCO0FBQzFCLDhCQUFxQztBQUdyQyxJQUFNLFFBQVEsR0FBRyxXQUFJLENBQUMsU0FBUyxFQUFFLDRCQUE0QixDQUFDLENBQUM7QUFFL0Q7SUFPRSw0QkFBNEI7SUFFNUIsb0JBQVksSUFBSTtRQVJoQixPQUFFLEdBQVcsYUFBVSxFQUFFLENBQUM7UUFTeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLDJCQUFnQixHQUF2QjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRU0sd0JBQWEsR0FBcEIsVUFBcUIsRUFBVTtRQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLDJCQUFnQixHQUF2QixVQUF3QixJQUFJO1FBQzFCLElBQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxD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QUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUMsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgdm9za2FfMDAwIG9uIDI4LjA3LjIwMTcuXG4gKi9cbmltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQge3JlYWRGaWxlU3luYywgd3JpdGVGaWxlU3luY30gZnJvbSAnZnMnO1xuaW1wb3J0IHtqb2lufSBmcm9tICdwYXRoJztcbmltcG9ydCB7Y3JlYXRlR1VJRH0gZnJvbSAnLi9jb21tb24vJztcbmltcG9ydCB7Qm9va30gZnJvbSAnLi9ib29rJztcblxuY29uc3QgZmlsZVBhdGggPSBqb2luKF9fZGlybmFtZSwgJy4vZGF0YS9ib29rLXNlcmllcy5kYi5qc29uJyk7XG5cbmNsYXNzIEJvb2tTZXJpZXMge1xuICBpZDogc3RyaW5nID0gY3JlYXRlR1VJRCgpO1xuICBib29rSWRzOiBzdHJpbmdbXTsgLy8gOiBCb29rW11cbiAgYm9va1Nlcmllc05hbWU6IHN0cmluZztcbiAgYXV0aG9ySWRzOiBzdHJpbmdbXTsgLy8gOiBBdXRob3JcbiAgY2F0ZWdvcnlJZHM6IHN0cmluZ1tdO1xuICBsYW5ndWFnZT86IHN0cmluZztcbiAgLy8gY291bnRPZkRvd25sb2FkczogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG5cbiAgc3RhdGljIGdldEFsbEJvb2tTZXJpZXMoKTogQm9va1Nlcmllc1tdIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMoZmlsZVBhdGgpLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgc3RhdGljIGdldEJvb2tTZXJpZXMoaWQ6IHN0cmluZyk6IEJvb2tTZXJpZXMge1xuICAgIHJldHVybiB0aGlzLmdldEFsbEJvb2tTZXJpZXMoKS5maW5kKGIgPT4gYi5pZCA9PT0gaWQpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUJvb2tTZXJpZXMoZGF0YSkge1xuICAgIGNvbnN0IGJvb2tTZXJpZXMgPSBuZXcgQm9va1NlcmllcyhkYXRhKTtcbiAgICBjb25zdCBib29rcyA9IHRoaXMuZ2V0QWxsQm9va1NlcmllcygpO1xuICAgIGJvb2tzLnB1c2goYm9va1Nlcmllcyk7XG4gICAgdGhpcy5zYXZlQWxsQm9va1Nlcmllcyhib29rcyk7XG4gICAgcmV0dXJuIGJvb2tTZXJpZXM7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlQm9va1NlcmllcyhkYXRhKSB7XG4gICAgY29uc3QgYm9va3MgPSB0aGlzLmdldEFsbEJvb2tTZXJpZXMoKTtcbiAgICBjb25zdCBib29rc0luZGV4ID0gYm9va3MuZmluZEluZGV4KGIgPT4gYi5pZCA9PT0gZGF0YS5pZCk7XG4gICAgYm9va3Muc3BsaWNlKGJvb2tzSW5kZXgsIDEsIGRhdGEpO1xuICAgIHRoaXMuc2F2ZUFsbEJvb2tTZXJpZXMoYm9va3MpO1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgc3RhdGljIGRlbGV0ZUJvb2tTZXJpZXMoaWQpIHtcbiAgICBjb25zdCBib29rcyA9IHRoaXMuZ2V0QWxsQm9va1NlcmllcygpO1xuICAgIGNvbnN0IGJvb2tJbmRleCA9IGJvb2tzLmZpbmRJbmRleChiID0+IGIuaWQgPT09IGlkKTtcbiAgICBib29rcy5zcGxpY2UoYm9va0luZGV4LCAxKTtcbiAgICB0aGlzLnNhdmVBbGxCb29rU2VyaWVzKGJvb2tzKTtcbiAgfVxuXG4gIHN0YXRpYyBzYXZlQWxsQm9va1Nlcmllcyhib29rTGlzdCkge1xuICAgIHdyaXRlRmlsZVN5bmMoZmlsZVBhdGgsIEpTT04uc3RyaW5naWZ5KGJvb2tMaXN0LCBudWxsLCAyKSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEJvb2tTZXJpZXNSb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5Cb29rU2VyaWVzUm91dGVyLmdldCgnL2Jvb2stc2VyaWVzLWxpc3QnLCAocmVxLCByZXMpID0+IHtcbiAgcmVzLmpzb24oQm9va1Nlcmllcy5nZXRBbGxCb29rU2VyaWVzKCkpO1xufSk7XG5cbkJvb2tTZXJpZXNSb3V0ZXIucG9zdCgnLzpjb3VudHJ5SWQnLCAocmVxLCByZXMpID0+IHtcbiAgcmVzLmpzb24oQm9va1Nlcmllcy5nZXRCb29rU2VyaWVzKHJlcS5wYXJhbXMuaWQpKTtcbn0pO1xuXG4vLyBjcmVhdGUgYm9vay1zZXJpZXNcbkJvb2tTZXJpZXNSb3V0ZXIucG9zdCgnLycsIChyZXEsIHJlcykgPT4ge1xuICByZXMuanNvbihCb29rU2VyaWVzLmNyZWF0ZUJvb2tTZXJpZXMocmVxLmJvZHkpKTtcbn0pO1xuXG4vLyB1cGRhdGUgYm9vay1zZXJpZXNcbkJvb2tTZXJpZXNSb3V0ZXIucG9zdCgnLzpjb3VudHJ5SWQnLCAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgZGF0YSA9IHJlcS5ib2R5O1xuICBkYXRhLmlkID0gcmVxLnBhcmFtcy5pZDtcbiAgcmVzLmpzb24oQm9va1Nlcmllcy51cGRhdGVCb29rU2VyaWVzKGRhdGEpKTtcbn0pO1xuXG4vLyBkZWxldGUgYm9vay1zZXJpZXNcbkJvb2tTZXJpZXNSb3V0ZXIuZGVsZXRlKCcvOmNvdW50cnlJZCcsIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCBpZCA9IHJlcS5wYXJhbXMuaWQ7XG4gIHJlcy5qc29uKEJvb2tTZXJpZXMuZGVsZXRlQm9va1NlcmllcyhpZCkpO1xufSk7XG4iXX0=