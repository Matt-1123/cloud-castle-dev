import { defineAuth, secret } from '@aws-amplify/backend';
import { postConfirmation } from './post-confirmation/resource';


export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  triggers: {
    postConfirmation
  }
});