# XPENSES APP

## Why ?

This application allows several users to track and share their expenses.

Please notice the first version can manage up to 2 users, as the next versions will be available to more users.

_Some configuration files are deliberately missing._

![Demo](/docs/demo.mov)

## Technologies

- React Native : https://reactnative.dev
- AWS Amplify : https://docs.amplify.aws
- State management : https://github.com/pmndrs/jotai
- Components : https://reactnativeelements.com
- Icons : https://fontawesome.com

## Architecture

![Architecture](/docs/xpenses_architecture.png)

## Back-end services

A handmade serverless api allows the application to use the following AWS services : https://github.com/ths83/-xpenses

- No-SQL DB : https://aws.amazon.com/dynamodb
- Auth / users management : https://aws.amazon.com/cognito

The back-end project uses :

- Python : https://www.python.org
- Serverless Application Framework : https://aws.github.io/chalice/index.html
- SDK : https://boto3.amazonaws.com/v1/documentation/api/latest/index.html
