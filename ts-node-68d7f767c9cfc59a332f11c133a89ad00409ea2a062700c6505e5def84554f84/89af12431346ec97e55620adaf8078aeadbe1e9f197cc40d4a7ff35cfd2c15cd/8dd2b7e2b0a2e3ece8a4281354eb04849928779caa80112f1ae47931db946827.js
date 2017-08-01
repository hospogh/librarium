"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fs_1 = require("fs");
var path_1 = require("path");
var _1 = require("./common/");
var filePath = path_1.join(__dirname, './data/books.db.json');
var Book = (function () {
    function Book() {
        this.id = _1.createGUID(); // consider using guid
    }
    // countOfDownloads: number;
    Book.getAllBooks = function () {
        return JSON.parse(fs_1.readFileSync(filePath).toString());
    };
    Book.getBook = function (id) {
        return this.getAllBooks().find(function (u) { return u.id === id; });
    };
    return Book;
}());
exports.BookRouter = express.Router();
exports.BookRouter.get('/book-list', function (req, res) {
    res.json(Book.getAllBooks());
});
exports.BookRouter.post('/:userId', function (req, res) {
    res.json(Book.getBook(req.params.id));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvaG9zcG9naC9EZXNrdG9wL2JldFByb2plY3RMaWJyYXJpdW0vbGlicmFyaXVtL3NyYy9zZXJ2ZXItYXBpL2Jvb2sudHMiLCJzb3VyY2VzIjpbIi9ob21lL2hvc3BvZ2gvRGVza3RvcC9iZXRQcm9qZWN0TGlicmFyaXVtL2xpYnJhcml1bS9zcmMvc2VydmVyLWFwaS9ib29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQW1DO0FBQ25DLHlCQUFnQztBQUNoQyw2QkFBMEI7QUFDMUIsOEJBQXFDO0FBR3JDLElBQU0sUUFBUSxHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztBQUV6RDtJQUFBO1FBQ0UsT0FBRSxHQUFXLGFBQVUsRUFBRSxDQUFDLENBQUMsc0JBQXNCO0lBY25ELENBQUM7SUFUQyw0QkFBNEI7SUFFckIsZ0JBQVcsR0FBbEI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLFlBQU8sR0FBZCxVQUFlLEVBQVU7UUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBWCxDQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUFmRCxJQWVDO0FBRVksUUFBQSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRTNDLGtCQUFVLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO0lBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUNuQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7cmVhZEZpbGVTeW5jfSBmcm9tICdmcyc7XG5pbXBvcnQge2pvaW59IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHtjcmVhdGVHVUlEfSBmcm9tICcuL2NvbW1vbi8nO1xuXG5cbmNvbnN0IGZpbGVQYXRoID0gam9pbihfX2Rpcm5hbWUsICcuL2RhdGEvYm9va3MuZGIuanNvbicpO1xuXG5jbGFzcyBCb29rIHtcbiAgaWQ6IHN0cmluZyA9IGNyZWF0ZUdVSUQoKTsgLy8gY29uc2lkZXIgdXNpbmcgZ3VpZFxuICBib29rTmFtZTogc3RyaW5nO1xuICBhdXRob3JOYW1lOiBzdHJpbmc7XG4gIGNhdGVnb3J5OiBzdHJpbmc7XG4gIGVkaXRpb25ZZWFyOiBEYXRlO1xuICAvLyBjb3VudE9mRG93bmxvYWRzOiBudW1iZXI7XG5cbiAgc3RhdGljIGdldEFsbEJvb2tzKCk6IEJvb2tbXSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKGZpbGVQYXRoKS50b1N0cmluZygpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRCb29rKGlkOiBzdHJpbmcpOiBCb29rIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBbGxCb29rcygpLmZpbmQodSA9PiB1LmlkID09PSBpZCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEJvb2tSb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5Cb29rUm91dGVyLmdldCgnL2Jvb2stbGlzdCcsIChyZXEsIHJlcykgPT4ge1xuICByZXMuanNvbihCb29rLmdldEFsbEJvb2tzKCkpO1xufSk7XG5cbkJvb2tSb3V0ZXIucG9zdCgnLzp1c2VySWQnLCAocmVxLCByZXMpID0+IHtcbiAgcmVzLmpzb24oQm9vay5nZXRCb29rKHJlcS5wYXJhbXMuaWQpKTtcbn0pO1xuXG4iXX0=