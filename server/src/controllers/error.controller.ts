import {Request, Response} from "express";

function dropApiCallNotFound(req: Request, res: Response) {
  res.status(404).json({
    error: 'API Call Not Found'
  });
}

export {
  dropApiCallNotFound
};
