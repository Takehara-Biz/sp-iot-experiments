import { Express, Request, Response, NextFunction } from "express";
import { LogUtil } from "../utils/logUtil";

export const addMiddleware = ((app: Express): void => {

  /**
   * for logging
   */
  app.use(function (req: Request, _res: Response, next: NextFunction) {
    LogUtil.debug("[BEGIN] (AOP) Logging : " + req.method + " " + req.baseUrl +
      ",\nreq.query=" + JSON.stringify(req.query) +
      ",\nreq.params=" + JSON.stringify(req.params) +
      ",\nreq.body=" + JSON.stringify(req.body));

    next();

    LogUtil.debug("[  END] (AOP) Logging : " + req.method + " " + req.url);
  });
});