import React from "react";
import axios, {AxiosResponse} from "axios";

import {fetchCount} from "./entity.controller";
import {LogInCredentials} from "../pages/user/login/LogIn";

function fetchUserCount(apiUrl: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  fetchCount(apiUrl, 'user', dispatch);
}

function fetchUserLogin(
  apiUrl: string,
  credentials: LogInCredentials,
  dispatch: React.Dispatch<React.SetStateAction<boolean>>
) {
  axios
    .post(`${apiUrl}/user/login`, credentials)
    .then((res: AxiosResponse) => {
      dispatch(!!+res.data[0].is_data_correct)
    })
}

export {
  fetchUserCount,
  fetchUserLogin
};
