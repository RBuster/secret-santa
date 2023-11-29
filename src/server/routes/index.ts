import { Express } from 'express';
import { EmailRA } from '../resource-access/email';
import { Participant } from '../../client/src/lib/interfaces/recipient';
import { EmailUtil } from '../utils/email';

interface SendEmailBody {
  participants: Participant[];
  gameRules: {
    budget: [number, number];
    useBudget: boolean;
  };
}

export class EmailRoutes {
  private _app: Express;
  private _emailRA: EmailRA;
  private _emailUtil: EmailUtil;

  constructor(app: Express) {
    this._app = app;
    this._emailRA = new EmailRA();
    this._emailUtil = new EmailUtil();
  }

  public init() {
    // eslint-disable-next-line
    // @ts-ignore - this is a temporary fix for the express type error
    this._app.get('/api/hello', (req, res) => {
      res.send('Hello World?!');
    });

    this._app.post('/api/sendEmails', (req, res) => {
      const body = req.body as SendEmailBody;
      const shuffledParticipants = this._emailUtil.assignReceivers(body.participants);
      const responses: boolean[] = [];
      shuffledParticipants.map(async (recipient) => {
        responses.push(await this._emailRA.sendEmail(recipient, body.gameRules));
      });
      if (responses.includes(false)) {
        res.status(500);
        res.send('One or more emails failed to send');
        return;
      }
      res.status(200);
      res.send('Email sent!');
    });
  }
}
