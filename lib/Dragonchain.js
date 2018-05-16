var promisify = require('util').promisify;
const AWS = require('./AWS')
var dynamodb = new AWS.DynamoDB.DocumentClient();
var scan = promisify(dynamodb.scan).bind(dynamodb);

module.exports = class Dragonchain {
  static async all(stage, email) {
    const params = {
      dynamo: { TableName: `hopper_dragonchains_${stage || 'dev'}` },
      stage,
      email
    }
    try {
      return await Dragonchain.recursivelyScan(params);
    } catch(e) {
      console.log('FAIL')
    }
  }

  static async recursivelyScan(params, array=[]) {
    try {
      const scanResponse = await scan(params.dynamo);
      scanResponse.Items.forEach((Item) => {
        // if(params.stage)
        array.push(new DragonchainDynamoObject(Item));
      });

      if (typeof scanResponse.LastEvaluatedKey != "undefined") {
          params.ExclusiveStartKey = scanResponse.LastEvaluatedKey;
          return recursivelyScan(params, array);
      } else {
        return array;
      }
    } catch (e) {

      console.error(e)
    }
  }
}


class DragonchainDynamoObject {
  constructor(Item) {
    this.email = Item.email;
    this.version = (Item.version ? Item.version : 'Unknown'); // Remove this ternary after version is inserted when initializing.
    this.status = Item.status;
    this.id = Item.id;
    this.proofScheme = Item.proofScheme;
    this.name = Item.name;
  }
}