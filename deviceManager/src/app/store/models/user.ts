export class MinimalUser {
  username: string;
  thumbnail: string;
}

export class User extends MinimalUser {
    email: string;
    firstName: string;
    surname: string;
    phone: string;
    password: string;
}
