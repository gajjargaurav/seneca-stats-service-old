const AWS = require('aws-sdk');

const client = new AWS.DynamoDB.DocumentClient();

module.exports.post = async (event, context) => {
    try {
        // TODO: Data Validation
        // Extract Data from the Event
        const body = event.body;
        const userId = event.headers['X-User-Id'];
        const { courseId } = event.path;
        const { sessionId } = body;

        // Build Parameters for DynamoDB table
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            Item: {
                id: userId,
                sk: `${courseId}-${sessionId}`,
                courseId,
                ...body,
            },
        };

        const result = await client.put(params).promise();
        return { statusCode: '201', body: result };
    } catch (error) {
        console.error(error);
        // TODO: add better error handling
        return { statusCode: '500', body: error };
    }
};
