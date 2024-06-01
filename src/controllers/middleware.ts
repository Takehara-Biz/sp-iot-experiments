import { Express, Request, Response, NextFunction } from "express";

export const addMiddleware = ((app: Express): void => {

  /**
   * for logging
   */
  app.use(function (req: Request, _res: Response, next: NextFunction) {
    console.log('aaaaa!!!!')
    console.info("[BEGIN] (AOP) Logging : " + req.method + " " + req.url +
      ",\nreq.query=" + JSON.stringify(req.query) +
      ",\nreq.params=" + JSON.stringify(req.params) +
      ",\nreq.body=" + JSON.stringify(req.body));

    next();

    console.debug("[  END] (AOP) Logging : " + req.method + " " + req.url);
  });
});