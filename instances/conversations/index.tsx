import { fifConversations, fifConvoStatements, fifConvoResponses }
  from './firefly';
import { sndConversations, sndConvoStatements, sndConvoResponses }
  from './samannoud';
import { sreConversations, sreConvoStatements, sreConvoResponses }
  from './shuddering_refuge';
import { ffhConversations, ffhConvoStatements, ffhConvoResponses }
  from './foxfire_heretic';
import { auwConversations, auwConvoStatements, auwConvoResponses }
  from './auspicious_waif';
import { tfsConversations, tfsConvoStatements, tfsConvoResponses }
  from './trefoil_sower';
import { scnConversations, scnConvoStatements, scnConvoResponses }
  from './scarred_navigator';

const conversations = { ...sndConversations, ...sreConversations,
  ...ffhConversations, ...auwConversations, ...tfsConversations,
  ...scnConversations, ...fifConversations };
const convoStatements = { ...sndConvoStatements, ...sreConvoStatements,
  ...ffhConvoStatements, ...auwConvoStatements, ...tfsConvoStatements,
  ...scnConvoStatements, ...fifConvoStatements };
const convoResponses = { ...sndConvoResponses, ...sreConvoResponses,
  ...ffhConvoResponses, ...auwConvoResponses, ...tfsConvoResponses,
  ...scnConvoResponses, ...fifConvoResponses };

export { conversations, convoStatements, convoResponses };
