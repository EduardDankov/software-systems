import React from "react";
import axios, {AxiosResponse} from "axios";

import {fetchCount} from "./entity.controller";
import {LogInCredentials} from "../pages/user/login/LogIn";
import {RegisterCredentials} from "../pages/user/register/Register";
import {User} from "../models/user";

function fetchUserCount(apiUrl: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  fetchCount(apiUrl, 'user', dispatch);
}

async function fetchUserLogin(
  apiUrl: string,
  credentials: LogInCredentials,
  dispatch: React.Dispatch<React.SetStateAction<boolean>>,
  setUserData: React.Dispatch<React.SetStateAction<User>>
) {
  await axios
    .post(`${apiUrl}/user/login`, credentials)
    .then((res: AxiosResponse) => {
      setUserData({
        id: res.data[0].id,
        username: res.data[0].username,
        email: credentials.email
      });
      return res;
    })
    .then((res: AxiosResponse) => {
      dispatch(res.data.length > 0);
    });
}

async function fetchIsEmailTaken(
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

async function fetchUserRegister(
  apiUrl: string,
  credentials: RegisterCredentials,
  dispatch: React.Dispatch<React.SetStateAction<boolean>>,
  errorDispatches: {
    emailTaken: React.Dispatch<React.SetStateAction<boolean>>
  }
) {
  await fetchIsEmailTaken(apiUrl, credentials.email, errorDispatches.emailTaken)
    .then(async (res: boolean) => {
      if (!res) {
        await axios
          .post(`${apiUrl}/user/register`, credentials)
          .then((res: AxiosResponse) => {
            dispatch(+res.data[0].id > 0);
          });
      }
    });
}

export {
  fetchUserCount,
  fetchUserLogin,
  fetchUserRegister
};
