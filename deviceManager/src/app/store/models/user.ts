export class MinimalUser {
  username: string;
  thumbnail: string;
}

export class User extends MinimalUser {
    name: string;
    firstName: string;
    email: string;
    surname: string;
    phone: string;
    password: string;

    constructor(username, password) {
      super();
      this.username = username;
      this.password = password;
    }
}
