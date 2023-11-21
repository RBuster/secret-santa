export interface Participant {
  id: number;
  name: string;
  email: string;
}

export interface ParticipantWithReceiver extends Participant {
  receiver: Participant;
}
