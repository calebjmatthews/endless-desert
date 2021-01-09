import Fortuity from '../models/fortuity';
import Memo from '../models/memo';
import { FortuityState } from '../models/fortuity_state';
import { FORTUITIES } from '../enums/fortuities';
import { LEADER_TYPES } from '../enums/leader_types';
import { INTRO_STATES } from '../enums/intro_states';

let fortuities: { [name: string] : Fortuity } = {};

fortuities[FORTUITIES.FAMILIAR_FIGURE] = new Fortuity({
  name: FORTUITIES.FAMILIAR_FIGURE,
  openLine: 'Someone familiar is waiting to speak to you',
  memos: [
    new Memo({
      name: (FORTUITIES.FAMILIAR_FIGURE + '0'),
      title: 'Someone familiar',
      text: ('Samannoud: "Yeah, I followed you all the way out here. What, did you '
        + 'think I was just going to let you run off into the desert after Dani '
        + 'and end up dead? Gods knew what you were thinking, although your '
        + 'clumsy trail was easy enough to follow."')
    }),
    new Memo({
      name: (FORTUITIES.FAMILIAR_FIGURE + '1'),
      title: 'Someone familiar',
      text: ('Samannoud: "From now on it\'ll be me doing the exploring, and '
        + 'you doing the reading and counting and such. '
        + 'Less likely you\'ll get yourself killed that way."')
    })
  ],
  type: 'Conversation',
  repeatable: false,
  weight: 1000,
  leaderJoins: LEADER_TYPES.SAMANNOUD,
  available: (fState: FortuityState) => {
    if (fState.account) {
      const iState = fState.account.introState;
      if (iState == INTRO_STATES.REFURBISH_HUTS || iState == INTRO_STATES.DONE) {
        return true;
      }
    }
    return false;
  }
});

export { fortuities };
