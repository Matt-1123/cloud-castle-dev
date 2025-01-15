import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { postConfirmation } from "../auth/post-confirmation/resource";

const schema = a.schema({
  UserProfile: a
    .model({
      email: a.string(),
      profileOwner: a.string(),
      gold: a.integer()
    })
    .authorization((allow) => [
      allow.ownerDefinedIn("profileOwner"),
    ]),
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
  User: a
    .model({
      name: a.string(),
      bio: a.string(),
      gold: a.integer().default(0).authorization(allow => [allow.owner().to(['read']),]),
    })
    .authorization((allow) => [allow.publicApiKey().to(['read']), allow.owner(),]),
  Post: a
    .model({
      content: a.string()
    })
    .authorization(allow => [
      // Allow anyone auth'd with an API key to read everyone's posts.
      allow.publicApiKey().to(['read']),
      // Allow signed-in user to create, read, update,
      // and delete their __OWN__ posts.
      allow.owner(),
    ])
})
.authorization((allow) => [allow.resource(postConfirmation)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});