import React from "react";

import {fetchCount} from "./entity.controller.tsx";

function fetchTaskCount(apiUrl: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  fetchCount(apiUrl, 'task', dispatch);
}

export {
  fetchTaskCount
};
