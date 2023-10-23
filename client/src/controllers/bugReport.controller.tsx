import React from "react";

import {fetchCount} from "./entity.controller.tsx";

function fetchBugReportCount(apiUrl: string, dispatch: React.Dispatch<React.SetStateAction<number>>) {
  fetchCount(apiUrl, 'bug-report', dispatch);
}

export {
  fetchBugReportCount
};
