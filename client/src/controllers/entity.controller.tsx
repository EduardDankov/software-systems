import React from "react";
import axios, {AxiosResponse} from "axios";
import {formatKebabCase} from "../utils/format/string/formatKebabCase.tsx";

function fetchCount(apiUrl: string, entity: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  axios
    .get(`${apiUrl}/${formatKebabCase(entity)}/count`)
    .then((res: AxiosResponse) => dispatch(res.data))
    .catch((err) => {
      console.error(err);
    });
}

export {
  fetchCount
};
