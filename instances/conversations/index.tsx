import { fifConversations, fifConvoStatements, fifConvoResponses, fifConvoNarrations }
  from './firefly';
import { sndConversations, sndConvoStatements, sndConvoResponses, sndConvoNarrations }
  from './samannoud';
import { ffhConversations, ffhConvoStatements, ffhConvoResponses, ffhConvoNarrations }
  from './foxfire_heretic';
import { auwConversations, auwConvoStatements, auwConvoResponses, auwConvoNarrations }
  from './auspicious_waif';
import { tfsConversations, tfsConvoStatements, tfsConvoResponses, tfsConvoNarrations }
  from './trefoil_sower';
import { scnConversations, scnConvoStatements, scnConvoResponses, scnConvoNarrations }
  from './scarred_navigator';
import { exaConversations, exaConvoStatements, exaConvoResponses, exaConvoNarrations }
  from './exiled_ambassador';
import { droConversations, droConvoStatements, droConvoResponses, droConvoNarrations }
  from './dromedarian';
import { etcConversations, etcConvoStatements, etcConvoResponses, etcConvoNarrations }
  from './etc';

const conversations = { ...sndConversations,
  ...ffhConversations, ...auwConversations, ...tfsConversations,
  ...scnConversations, ...fifConversations, ...exaConversations,
  ...droConversations, ...etcConversations };
const convoStatements = { ...sndConvoStatements,
  ...ffhConvoStatements, ...auwConvoStatements, ...tfsConvoStatements,
  ...scnConvoStatements, ...fifConvoStatements, ...exaConvoStatements,
  ...droConvoStatements, ...etcConvoStatements };
const convoResponses = { ...sndConvoResponses,
  ...ffhConvoResponses, ...auwConvoResponses, ...tfsConvoResponses,
  ...scnConvoResponses, ...fifConvoResponses, ...exaConvoResponses,
  ...droConvoResponses, ...etcConvoResponses };
const convoNarrations = { ...sndConvoNarrations,
  ...ffhConvoNarrations, ...auwConvoNarrations, ...tfsConvoNarrations,
  ...scnConvoNarrations, ...fifConvoNarrations, ...exaConvoNarrations,
  ...droConvoNarrations, ...etcConvoNarrations };

export { conversations, convoStatements, convoResponses, convoNarrations };
