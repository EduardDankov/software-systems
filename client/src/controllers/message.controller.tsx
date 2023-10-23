import React from "react";

import {fetchCount} from "./entity.controller.tsx";

function fetchMessageCount(apiUrl: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  fetchCount(apiUrl, 'message', dispatch);
}

export {
  fetchMessageCount
};
