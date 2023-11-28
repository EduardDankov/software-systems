import React from "react";
import axios, {AxiosResponse} from "axios";
import {formatKebabCase} from "../utils/format/string/formatKebabCase";

async function fetchCount(apiUrl: string, entity: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  axios
    .get(`${apiUrl}/${formatKebabCase(entity)}/count`)
    .then((res: AxiosResponse) => dispatch(res.data[0].count))
    .catch((err) => {
      window.reportError(err);
    });
}

export {
  fetchCount
};
