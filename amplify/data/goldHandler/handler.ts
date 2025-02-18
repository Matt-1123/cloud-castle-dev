import { util } from '@aws-appsync/utils';

export function request(ctx: any) {
  return {
    operation: 'UpdateItem',
    key: util.dynamodb.toMapValues({ id: ctx.args.goldAmount}),
    update: {
      expression: 'ADD gold :plusOne',
      expressionValues: { ':plusOne': { N: 1 } },
    }
  }
}

export function response(ctx: any) {
  return ctx.result
}