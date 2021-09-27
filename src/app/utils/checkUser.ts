import { User } from '../interface/user';

export const checkUser = (db: User[], user: User) =>{
  db.map((us) => {
    if (us.email === user.email) {
      return true;
    }
  });
  return false;
};

export const getUser = (db: User[], user: User) => db.find((us) => us.email === user.email);

