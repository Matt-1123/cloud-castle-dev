import { type ClientSchema, a, defineData, defineFunction } from "@aws-amplify/backend";
import { postConfirmation } from "../auth/post-confirmation/resource";

const goldHandler = defineFunction({
  entry: './goldHandler/handler.ts'
})

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
  // 2. Define your mutation with the return type and, optionally, arguments
  addGold: a
    .mutation()
    // arguments that this query accepts
    .arguments({
      goldAmount: a.integer()
    })
    // return type of the query
    .returns(a.ref('UserProfile'))
    // only allow signed-in users to call this API
    .authorization(allow => [allow.authenticated()])
    .handler(a.handler.custom({
      dataSource: a.ref('UserProfile'),
      entry: './goldHandler/handler.ts'
    })),
  likePost: a
    .mutation()
    .arguments({ postId: a.id() })
    .returns(a.ref('Post'))
    .authorization(allow => [allow.authenticated()])
    .handler(a.handler.custom({
      dataSource: a.ref('Post'),
      entry: './increment-like.js'
    })),
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
  User: a
    .model({
      name: a.string(),
      bio: a.string(),
      gold: a.integer().default(0).authorization(allow => [allow.owner()]),
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
    ]),
})
.authorization((allow) => [allow.resource(postConfirmation)])


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