import { NextFunction, Request, Response } from 'express';
import { stripHtml } from 'string-strip-html';

function sanitizeBodyMiddleware(req: Request, res: Response, next: NextFunction) {
    if(req.body) {
        cleanObj(req.body);
    }
    next();
}

function cleanObj(obj: { [key: string]: string}) {
    for (let [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            obj[key] = stripHtml(value.trim()).result;
        }
    }
}

export default sanitizeBodyMiddleware;