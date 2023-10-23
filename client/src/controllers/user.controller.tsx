import React from "react";

import {fetchCount} from "./entity.controller.tsx";

function fetchUserCount(apiUrl: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  fetchCount(apiUrl, 'user', dispatch);
}

export {
  fetchUserCount
};
