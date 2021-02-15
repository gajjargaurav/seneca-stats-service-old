const AWS = require('aws-sdk');

const client = new AWS.DynamoDB.DocumentClient();
const aggregateCourseResults = require('../helpers/aggregator');

module.exports.get = async (event, context) => {
    try {
        const userId = event.headers['X-User-Id'];
        const { courseId } = event.path;
        const params = {
            TableName: process.env.DYNAMODB_TABLE,
            KeyConditionExpression: '#id = :id and begins_with ( #sk, :courseId )',
            ProjectionExpression: ['averageScore', 'timeStudied', 'totalModulesStudied'],
            ExpressionAttributeNames: { '#id': 'id', '#sk': 'sk' },
            ExpressionAttributeValues: { ':id': userId, ':courseId': courseId },
        };

        const result = await client.query(params).promise();
        return { statusCode: 200, body: aggregateCourseResults(result)};
    } catch (error) {
        return { statusCode: '500', body: error };
    }
};
