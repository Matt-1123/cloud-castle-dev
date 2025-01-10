import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
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
    .authorization((allow) => [allow.publicApiKey().to(['read']), allow.owner(),])
});

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