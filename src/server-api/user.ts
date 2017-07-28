import * as express from 'express';
import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import {createGUID} from './common/';

const filePath = join(__dirname, './data/users.db.json');

class User {
  id: string = createGUID();
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phoneNumber?: string;

  constructor(data) {
    // copies every property of data to this
    Object.assign(this, data);
  }

  static getAllUsers(): User[] {
    return JSON.parse(readFileSync(filePath).toString());
  }

  static getUser(id: string): User {
    return this.getAllUsers().find(u => u.id === id);
  }

  static createUser(data) {
    const user = new User(data);
    const users = this.getAllUsers();
    users.push(user);
    this.saveAllUsers(users);
    return user;
  }

  static updateUser(data) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === data.id);
    users.splice(userIndex, 1, data);
    this.saveAllUsers(users);
    return data;
  }

  static deleteUser(id) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === id);
    users.splice(userIndex, 1);
    this.saveAllUsers(users);
  }

  static saveAllUsers(userList) {
    writeFileSync(filePath, JSON.stringify(userList, null, 2));
  }
}

export const UserRouter = express.Router();

UserRouter.get('/user-list', (req, res) => {
  res.json(User.getAllUsers());
});

UserRouter.get('/:id', (req, res) => {
  res.json(User.getUser(req.params.id));
});

// create user
UserRouter.post('/', (req, res) => {
  res.json(User.createUser(req.body));
});

// update user
UserRouter.post('/:id', (req, res) => {
  const data = req.body;
  data.id = req.params.id;
  res.json(User.updateUser(data));
});

// delete user
UserRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  res.json(User.deleteUser(id));
});


