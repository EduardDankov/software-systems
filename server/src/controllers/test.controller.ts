import {Request, Response} from "express";

function getApiInfo(req: Request, res: Response) {
  res.status(200).json({
    title: 'software-systems',
    version: 1
  });
}

export {
  getApiInfo
};
