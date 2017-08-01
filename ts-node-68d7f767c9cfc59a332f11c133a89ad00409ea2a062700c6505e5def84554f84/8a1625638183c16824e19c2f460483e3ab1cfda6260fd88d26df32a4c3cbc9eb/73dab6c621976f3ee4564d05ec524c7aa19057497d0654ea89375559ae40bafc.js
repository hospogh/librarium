"use strict";
/**
 * Created by hospogh on 7/29/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var express = require("express");
var path_1 = require("path");
var book_1 = require("./book");
var fs_1 = require("fs");
var authorFilePath = path_1.join(__dirname, 'data/authors.db.json');
var Author = (function () {
    function Author(data) {
        this.authorId = common_1.createGUID();
        Object.assign(this, data);
    }
    Author.getAllAuthors = function () {
        return JSON.parse(fs_1.readFileSync(authorFilePath).toString());
    };
    Author.getAllBooks = function (authorId) {
        var allBooks = book_1.Book.getAllBooks();
        return allBooks.filter(function (b) { return b.bookId === authorId; });
    };
    Author.createAuthor = function (data) {
        var author = new Author(data);
        var authors = this.getAllAuthors();
        authors.push(author);
        this.saveAllAuthors(authors);
        return author;
    };
    Author.updateAuthor = function (author) {
        var authors = this.getAllAuthors();
        var authorIndex = authors.findIndex(function (a) { return a.authorId === author.authorId; });
        authors.spliec(authorIndex, 1, author);
        this.saveAllAuthors(authors);
        return author;
    };
    Author.deleteAuthor = function (authorId) {
        var authors = this.getAllAuthors();
        var authorIndex = authors.findIndex(function (a) { return a.authorId === authorId; });
        authors.splice(authorIndex, 1);
        this.saveAllAuthors(authors);
    };
    Author.saveAllAuthors = function (authorList) {
        fs_1.writeFileSync(authorFilePath, JSON.stringify(authorList, null, 2));
    };
    Author.getAuthor = function (authorId) {
        var authors = this.getAllAuthors();
        return authors.find(function (a) { return a.authorId === authorId; });
    };
    return Author;
}());
exports.Author = Author;
exports.AuthorRouter = express.Router();
// get all authors
exports.AuthorRouter.get('/author-list', function (req, res) {
    res.json(Author.getAllAuthors());
});
// get author
exports.AuthorRouter.get('/authorId', function (req, res) {
    res.json(Author.getAuthor(req.params.authorId));
});
// create author
exports.AuthorRouter.post('/', function (req, res) {
    res.json(Author.createAuthor(req.body));
});
// update author
exports.AuthorRouter.post('/:authorId', function (req, res) {
    var data = req.body;
    data.authorId = req.params.authorId;
    res.json(Author.updateAuthor(data));
});
// delete author
exports.AuthorRouter.delete('/:authorId', function (req, res) {
    res.json(Author.deleteAuthor(req.params.authorId));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL2hvbWUvaG9zcG9naC9EZXNrdG9wL2JldFByb2plY3RMaWJyYXJpdW0vbGlicmFyaXVtL3NyYy9zZXJ2ZXItYXBpL2F1dGhvci50cyIsInNvdXJjZXMiOlsiL2hvbWUvaG9zcG9naC9EZXNrdG9wL2JldFByb2plY3RMaWJyYXJpdW0vbGlicmFyaXVtL3NyYy9zZXJ2ZXItYXBpL2F1dGhvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7O0FBRUgsbUNBQW9DO0FBQ3BDLGlDQUFtQztBQUNuQyw2QkFBMEI7QUFDMUIsK0JBQTRCO0FBQzVCLHlCQUErQztBQUcvQyxJQUFNLGNBQWMsR0FBRyxXQUFJLENBQUMsU0FBUyxFQUFFLHNCQUFzQixDQUFDLENBQUM7QUFHL0Q7SUFPRSxnQkFBWSxJQUFJO1FBTmhCLGFBQVEsR0FBVyxtQkFBVSxFQUFFLENBQUM7UUFPOUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLG9CQUFhLEdBQXBCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTSxrQkFBVyxHQUFsQixVQUFtQixRQUFRO1FBQ3pCLElBQU0sUUFBUSxHQUFHLFdBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLG1CQUFZLEdBQW5CLFVBQW9CLElBQUk7UUFDdEIsSUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEMsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JDLE9BQU8sQ0FB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QUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQyxDQUFDO0FBRUgsZ0JBQWdCO0FBQ2hCLG9CQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO0lBQ3pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDckQsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgaG9zcG9naCBvbiA3LzI5LzE3LlxuICovXG5cbmltcG9ydCB7Y3JlYXRlR1VJRH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCB7am9pbn0gZnJvbSAncGF0aCc7XG5pbXBvcnQge0Jvb2t9IGZyb20gJy4vYm9vayc7XG5pbXBvcnQge3JlYWRGaWxlU3luYywgd3JpdGVGaWxlU3luY30gZnJvbSAnZnMnO1xuaW1wb3J0IHtJQXV0aG9yfSBmcm9tICcuLi9hcHAvZGVmaW5lcy9JQXV0aG9yJztcblxuY29uc3QgYXV0aG9yRmlsZVBhdGggPSBqb2luKF9fZGlybmFtZSwgJ2RhdGEvYXV0aG9ycy5kYi5qc29uJyk7XG5cblxuZXhwb3J0IGNsYXNzIEF1dGhvciBpbXBsZW1lbnRzIElBdXRob3Ige1xuICBhdXRob3JJZDogc3RyaW5nID0gY3JlYXRlR1VJRCgpO1xuICBuYW1lOiBzdHJpbmc7XG4gIGJvcm5EYXRlOiBEYXRlO1xuICBkZWF0aERhdGU/OiBEYXRlO1xuICBjb3VudHJ5SWQ/O1xuXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGRhdGEpO1xuICB9XG5cbiAgc3RhdGljIGdldEFsbEF1dGhvcnMoKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKGF1dGhvckZpbGVQYXRoKS50b1N0cmluZygpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBbGxCb29rcyhhdXRob3JJZCkge1xuICAgIGNvbnN0IGFsbEJvb2tzID0gQm9vay5nZXRBbGxCb29rcygpO1xuICAgIHJldHVybiBhbGxCb29rcy5maWx0ZXIoYiA9PiBiLmJvb2tJZCA9PT0gYXV0aG9ySWQpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZUF1dGhvcihkYXRhKSB7XG4gICAgY29uc3QgYXV0aG9yID0gbmV3IEF1dGhvcihkYXRhKTtcbiAgICBjb25zdCBhdXRob3JzID0gdGhpcy5nZXRBbGxBdXRob3JzKCk7XG4gICAgYXV0aG9ycy5wdXNoKGF1dGhvcik7XG4gICAgdGhpcy5zYXZlQWxsQXV0aG9ycyhhdXRob3JzKTtcbiAgICByZXR1cm4gYXV0aG9yO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZUF1dGhvcihhdXRob3I6IEF1dGhvcikge1xuICAgIGNvbnN0IGF1dGhvcnMgPSB0aGlzLmdldEFsbEF1dGhvcnMoKTtcbiAgICBjb25zdCBhdXRob3JJbmRleCA9IGF1dGhvcnMuZmluZEluZGV4KGEgPT4gYS5hdXRob3JJZCA9PT0gYXV0aG9yLmF1dGhvcklkKTtcbiAgICBhdXRob3JzLnNwbGllYyhhdXRob3JJbmRleCwgMSwgYXV0aG9yKTtcbiAgICB0aGlzLnNhdmVBbGxBdXRob3JzKGF1dGhvcnMpO1xuICAgIHJldHVybiBhdXRob3I7XG4gIH1cblxuICBzdGF0aWMgZGVsZXRlQXV0aG9yKGF1dGhvcklkKSB7XG4gICAgY29uc3QgYXV0aG9ycyA9IHRoaXMuZ2V0QWxsQXV0aG9ycygpO1xuICAgIGNvbnN0IGF1dGhvckluZGV4ID0gYXV0aG9ycy5maW5kSW5kZXgoYSA9PiBhLmF1dGhvcklkID09PSBhdXRob3JJZCk7XG4gICAgYXV0aG9ycy5zcGxpY2UoYXV0aG9ySW5kZXgsIDEpO1xuICAgIHRoaXMuc2F2ZUFsbEF1dGhvcnMoYXV0aG9ycyk7XG4gIH1cblxuICBzdGF0aWMgc2F2ZUFsbEF1dGhvcnMoYXV0aG9yTGlzdCkge1xuICAgIHdyaXRlRmlsZVN5bmMoYXV0aG9yRmlsZVBhdGgsIEpTT04uc3RyaW5naWZ5KGF1dGhvckxpc3QsIG51bGwsIDIpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBdXRob3IoYXV0aG9ySWQpIHtcbiAgICBjb25zdCBhdXRob3JzID0gdGhpcy5nZXRBbGxBdXRob3JzKCk7XG4gICAgcmV0dXJuIGF1dGhvcnMuZmluZChhID0+IGEuYXV0aG9ySWQgPT09IGF1dGhvcklkKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQXV0aG9yUm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuLy8gZ2V0IGFsbCBhdXRob3JzXG5BdXRob3JSb3V0ZXIuZ2V0KCcvYXV0aG9yLWxpc3QnLCAocmVxLCByZXMpID0+IHtcbiAgcmVzLmpzb24oQXV0aG9yLmdldEFsbEF1dGhvcnMoKSk7XG59KTtcblxuLy8gZ2V0IGF1dGhvclxuQXV0aG9yUm91dGVyLmdldCgnL2F1dGhvcklkJywgKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5qc29uKEF1dGhvci5nZXRBdXRob3IocmVxLnBhcmFtcy5hdXRob3JJZCkpO1xufSk7XG5cbi8vIGNyZWF0ZSBhdXRob3JcbkF1dGhvclJvdXRlci5wb3N0KCcvJywgKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5qc29uKEF1dGhvci5jcmVhdGVBdXRob3IocmVxLmJvZHkpKTtcbn0pO1xuXG4vLyB1cGRhdGUgYXV0aG9yXG5BdXRob3JSb3V0ZXIucG9zdCgnLzphdXRob3JJZCcsIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCBkYXRhID0gcmVxLmJvZHk7XG4gIGRhdGEuYXV0aG9ySWQgPSByZXEucGFyYW1zLmF1dGhvcklkO1xuICByZXMuanNvbihBdXRob3IudXBkYXRlQXV0aG9yKGRhdGEpKTtcbn0pO1xuXG4vLyBkZWxldGUgYXV0aG9yXG5BdXRob3JSb3V0ZXIuZGVsZXRlKCcvOmF1dGhvcklkJywgKHJlcSwgcmVzKSA9PiB7XG4gIHJlcy5qc29uKEF1dGhvci5kZWxldGVBdXRob3IocmVxLnBhcmFtcy5hdXRob3JJZCkpO1xufSk7XG5cbiJdfQ==