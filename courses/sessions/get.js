const AWS = require('aws-sdk');

const client = new AWS.DynamoDB.DocumentClient();
  
module.exports.get = async (event, context) => {
    try {
        const userId = event.headers['X-User-Id'];
        const { courseId, sessionId } = event.path;
        const sortKeyValue = `${courseId}-${sessionId}`;
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            KeyConditionExpression: '#id = :id and #sk = :sortKey',
            ProjectionExpression: ['averageScore', 'timeStudied', 'totalModulesStudied'],
            ExpressionAttributeNames: { '#id': 'id', '#sk': 'sk' },
            ExpressionAttributeValues: { ':id': userId, ':sortKey': sortKeyValue},
        };

        const result = await client.query(params).promise();
        return { statusCode: 200, body: result.Items };
    } catch (error) {
        console.error(error);
        // TODO: add better error handling
        return { statusCode: '500', body: error };
    }
};
