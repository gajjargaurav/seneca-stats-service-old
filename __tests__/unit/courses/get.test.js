const { get } = require('../../../courses/get');
const AWS = require('aws-sdk-mock');

describe('Get Course States', () => {
    describe('When get Request is correct', () => {
        it('should invoke get handlers correctly', async () => {
            // arrange
            const courseId = '123';
            const userId = 'user123';
            process.env.DYNAMODB_TABLE = 'testTable';
            process.env.AWS_REGION = 'eu-west-2'
            const getRequest = { path: { courseId }, headers: { 'X-User-Id': userId } };
            const expected = {
                "statusCode": 200,
                "body": [
                    {
                        "timeStudied": 20,
                        "averageScore": 15,
                        "totalModulesStudied": 10
                    }
                ]
            } 
            AWS.mock('DynamoDB.DocumentClient', 'query', function (params){
                return expected;
              });
            
            // act
            const acutal = await get(getRequest);

            // assert
            expect(acutal).toEqual(expected)
        });
    });
});
