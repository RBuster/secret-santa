import { Express } from "express";
import { parse } from "vue-eslint-parser";
export class EmailRoutes {

    private _app: Express;

    constructor(app: Express) {
        this._app = app;
    }

    public init() {
        // eslint-disable-next-line
        // @ts-ignore - this is a temporary fix for the express type error
        this._app.get('/api/hello', (req, res) => {
            res.send('Hello World?!');
        });

        this._app.post('/api/sendEmail', (req, res) => {
            parse
            console.log('email body', req.body);
            res.send('Email sent!');
        });
    }
}