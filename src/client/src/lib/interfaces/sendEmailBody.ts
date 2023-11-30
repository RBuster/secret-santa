import { Participant } from './recipient';

export interface SendEmailBody {
  participants: Array<Participant>;
  gameRules: {
    budget: [number, number];
    useBudget: boolean;
  };
}
