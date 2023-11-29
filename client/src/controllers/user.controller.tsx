import React from "react";
import axios, {AxiosResponse} from "axios";
import bcrypt from "bcryptjs-react";

import {fetchCount} from "./entity.controller";
import {LogInCredentials} from "../pages/user/login/UserLogIn.tsx";
import {RegisterCredentials} from "../pages/user/register/UserRegister.tsx";
import {User} from "../models/user";

type UserServerData = {
  user_id: number;
  username: string;
  email: string;
};

const hashRounds: number = 10;

async function fetchUserCount(apiUrl: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  await fetchCount(apiUrl, 'user', dispatch);
}

async function fetchUserData(
  apiUrl: string,
  userId: number,
  dispatch: React.Dispatch<React.SetStateAction<Array<User>>>
): Promise<Array<User>> {
  const users: Array<User> = [];
  await axios
    .get(`${apiUrl}/user/data`, { params: {userId} })
    .then((res: AxiosResponse) => {
      res.data.forEach((user: UserServerData) => {
        users.push({
          id: user.user_id,
          username: user.username,
          email: user.email
        });
      });
      dispatch(users);
    });
  return users;
}

async function fetchUserIsEmailTaken(
  apiUrl: string,
  email: string,
  dispatch: React.Dispatch<React.SetStateAction<boolean>>
): Promise<boolean> {
  let result: boolean = true;
  await axios
    .get(`${apiUrl}/user/email-taken`, { params: {email} })
    .then((res: AxiosResponse) => {
      result = !!+res.data[0].is_email_taken;
      dispatch(result);
    });
  return result;
}

async function fetchUserLogin(
  apiUrl: string,
  credentials: LogInCredentials,
  dispatch: React.Dispatch<React.SetStateAction<boolean>>,
  setUserData: React.Dispatch<React.SetStateAction<User>>
) {
  await axios
    .post(`${apiUrl}/user/login`, {email: credentials.email})
    .then((res: AxiosResponse) => {
      setUserData({
        id: res.data[0].id,
        username: res.data[0].username,
        email: credentials.email
      });
      return res;
    })
    .then((res: AxiosResponse) => {
      bcrypt.compare(credentials.password, res.data[0].password, (err: Error | null, result: boolean) => {
        if (err) {
          window.reportError(err);
        } else {
          dispatch(res.data.length > 0 && result);
        }
      });
    });
}

async function fetchUserRegister(
  apiUrl: string,
  credentials: RegisterCredentials,
  dispatch: React.Dispatch<React.SetStateAction<boolean>>,
  errorDispatches: {
    emailTaken: React.Dispatch<React.SetStateAction<boolean>>
  }
) {
  await fetchUserIsEmailTaken(apiUrl, credentials.email, errorDispatches.emailTaken)
    .then(async (res: boolean) => {
      if (!res) {
        bcrypt.genSalt(hashRounds, async (err: Error | null, salt: string) => {
          if (err) {
            window.reportError(err);
          } else {
            bcrypt.hash(credentials.password, salt, async (err: Error | null, hash: string) => {
              if (err) {
                window.reportError(err);
              } else {
                await axios
                  .post(`${apiUrl}/user/register`, {...credentials, password: hash})
                  .then((res: AxiosResponse) => {
                    dispatch(+res.data[0].id > 0);
                  });
              }
            });
          }
        });
      }
    });
}

async function fetchUserUpdate(
  apiUrl: string,
  userId: number,
  field: string,
  value: string | number | boolean
) {
  let result: boolean = false;

  if (field === 'password') {
    await bcrypt.genSalt(hashRounds)
      .then(async (salt: string) => {
        await bcrypt.hash(value as string, salt)
          .then(async (hash: string) => {
            await axios
              .post(`${apiUrl}/user/update`, {userId, field, value: hash})
              .then((res: AxiosResponse) => {
                result = res.data[0].id === userId;
              });
          });
      });
  } else {
    await axios
      .post(`${apiUrl}/user/update`, {userId, field, value})
      .then((res: AxiosResponse) => {
        result = res.data[0].id === userId;
      });
  }
  return result;
}

async function fetchUserDelete(
  apiUrl: string,
  userId: number
) {
  let result: boolean = false;
  await axios
    .post(`${apiUrl}/user/delete`, {userId})
    .then((res: AxiosResponse) => {
      result = res.data[0].id === userId;
    });
  return result;
}

export {
  fetchUserCount,
  fetchUserData,
  fetchUserIsEmailTaken,
  fetchUserLogin,
  fetchUserRegister,
  fetchUserUpdate,
  fetchUserDelete
};
