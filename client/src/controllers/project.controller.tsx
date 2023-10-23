import React from "react";

import {fetchCount} from "./entity.controller.tsx";

function fetchProjectCount(apiUrl: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  fetchCount(apiUrl, 'project', dispatch);
}

export {
  fetchProjectCount
};
