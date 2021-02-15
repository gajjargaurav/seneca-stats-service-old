# Seneca Stats Service

This service provides an interface defined in [swagger spec](seneca-backend-swagger.yml)

It uses nodejs with Serverless Framework and AWS.

## Prerequisite

* AWS Account

* Serverless Framework

### Setup Locally
1. Since we are going to use AWS for our deployments we will need to configure Serverless to be able to use the AWS. To do that we will need to create a user in `AWS Console` using [the instructions for setting up your AWS user for serverless cli](USERSETUP.md)

2. Run `npm install serverless -g` to install the serverless framework locally.

3. Run `serverless config credentials --provider aws --key xxx --secret yyy -profile serverless-admin`

> NOTE:  
Replace `xxx` with your `Access key ID` and `yyy` with your `Secret access key`.

> If you used any other user name instead of `serverless-admin` then please update the above command accordingly to reflect that. We have used `serverless-admin` for the purposes of this exercise

### Deploying the stack on AWS

Once the configuration is complete you can follow the steps below,

* Run `npm i` to install dependencies
* Open terminal at root of the project and rune `serverless deploy -v`.
    
    That will deploy the stack to AWS and provide you with the endpoint information to invoke them and test it
*  [Postman](https://www.postman.com/) is a good tool to test endpoints.


