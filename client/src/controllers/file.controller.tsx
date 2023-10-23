import React from "react";

import {fetchCount} from "./entity.controller.tsx";

function fetchFileCount(apiUrl: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  fetchCount(apiUrl, 'file', dispatch);
}

export {
  fetchFileCount
};
