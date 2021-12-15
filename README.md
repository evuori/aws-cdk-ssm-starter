# AWS CDK - Guide to SSM Parameters

A repository for an article on
[ernovuori.com](http://localhost:3000/aws-cdk-typescript-getting-started)

## How to Use

1. Clone the repository

2. Install the dependencies

```bash
npm install
```

3. Create the secure string parameter we'll import the stack:

```bash
aws ssm put-parameter \
	--name "/my-app/some" \
	--value "myvalue" \
	--type "SecureString"
```

4. Create the CDK stack

```bash
npx cdk deploy \
  --outputs-file ./cdk-outputs.json
```

5. Open the AWS CloudFormation Console and the stack should be created in your
   default region

6. Cleanup - delete the stack and the secure SSM parameter:

```bash
npx cdk destroy

aws ssm delete-parameter \
	--name "/my-app/some"
```
