import {
  Participant,
  ParticipantWithReceiver,
} from "../../client/src/lib/interfaces/recipient";

export class EmailUtil {
  private shuffle(array: Participant[]) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  public assignReceivers(
    participants: Participant[]
  ): ParticipantWithReceiver[] {
    const shuffledParticipants = this.shuffle(participants);
    const participantsWithReceivers = shuffledParticipants.map(
      (participant, index) => {
        const receiverIndex =
          index === shuffledParticipants.length - 1 ? 0 : index + 1;
        return {
          ...participant,
          receiver: shuffledParticipants[receiverIndex],
        };
      }
    );
    return participantsWithReceivers;
  }
}
