import { NextFunction, Request, Response } from 'express';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toLocaleString('es-AR');
  console.log(
    `[${timestamp}] Estás ejecutando un método ${req.method} en la ruta ${req.url}`,
  );
  next();
}
