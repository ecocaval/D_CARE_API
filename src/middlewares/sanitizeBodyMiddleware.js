import { stripHtml } from 'string-strip-html';

function sanitizeBodyMiddleware(req, res, next) {
    if(req.body) {
        cleanObj(req.body)
    }
    next();
}

function cleanObj(obj) {
    for (let [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            obj[key] = stripHtml(value.trim()).result;
        }
    }
}

export default sanitizeBodyMiddleware;