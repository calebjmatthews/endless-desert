import { fifConversations, fifConvoStatements, fifConvoResponses, fifConvoNarrations }
  from './firefly';
import { sndConversations, sndConvoStatements, sndConvoResponses, sndConvoNarrations }
  from './samannoud';
import { sreConversations, sreConvoStatements, sreConvoResponses, sreConvoNarrations }
  from './shuddering_refuge';
import { ffhConversations, ffhConvoStatements, ffhConvoResponses, ffhConvoNarrations }
  from './foxfire_heretic';
import { auwConversations, auwConvoStatements, auwConvoResponses, auwConvoNarrations }
  from './auspicious_waif';
import { tfsConversations, tfsConvoStatements, tfsConvoResponses, tfsConvoNarrations }
  from './trefoil_sower';
import { scnConversations, scnConvoStatements, scnConvoResponses, scnConvoNarrations }
  from './scarred_navigator';
import { etcConversations, etcConvoStatements, etcConvoResponses, etcConvoNarrations }
  from './etc';

const conversations = { ...sndConversations, ...sreConversations,
  ...ffhConversations, ...auwConversations, ...tfsConversations,
  ...scnConversations, ...fifConversations, ...etcConversations };
const convoStatements = { ...sndConvoStatements, ...sreConvoStatements,
  ...ffhConvoStatements, ...auwConvoStatements, ...tfsConvoStatements,
  ...scnConvoStatements, ...fifConvoStatements, ...etcConvoStatements };
const convoResponses = { ...sndConvoResponses, ...sreConvoResponses,
  ...ffhConvoResponses, ...auwConvoResponses, ...tfsConvoResponses,
  ...scnConvoResponses, ...fifConvoResponses, ...etcConvoResponses };
const convoNarrations = { ...sndConvoNarrations, ...sreConvoNarrations,
  ...ffhConvoNarrations, ...auwConvoNarrations, ...tfsConvoNarrations,
  ...scnConvoNarrations, ...fifConvoNarrations, ...etcConvoNarrations };

export { conversations, convoStatements, convoResponses, convoNarrations };
