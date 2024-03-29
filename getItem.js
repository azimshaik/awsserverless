const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1"
  });

  let responseBody = "";
  let statusCode = 0;

  //descructuring
  const { id } = event.pathParameters;

  const params = {
    TableName: "users",
    Key: {
      id: id
    }
  };
  try {
    const data = await documentClient.get(params).promise();
    responseBody = JSON.stringify(data.Item);
    statusCode = 200;
  } catch (err) {
    console.log(err);
    responseBody = "Unable to get user data";
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      myheader: "test"
    },
    body: responseBody
  };

  return response;
};
