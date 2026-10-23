import { Participant } from './recipient.js';

export interface SendEmailBody {
  participants: Array<Participant>;
  gameRules: {
    budget: [number, number];
    useBudget: boolean;
  };
}
