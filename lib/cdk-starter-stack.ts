import * as ssm from '@aws-cdk/aws-ssm';
import * as cdk from '@aws-cdk/core';

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stringParam = new ssm.StringParameter(this, 'some-string-param', {
      parameterName: '/my-app/some-string-param',
      stringValue: 'email@example.com',
      description: 'the email is some string param',
      type: ssm.ParameterType.STRING,
      tier: ssm.ParameterTier.STANDARD,
      allowedPattern: '.*',
    });

    const stringListParam = new ssm.StringListParameter(
      this,
      'string-list-param',
      {
        parameterName: '/my-app/some-string-list-param',
        stringListValue: ['dev', 'test', 'prod'],
        tier: ssm.ParameterTier.ADVANCED,
      },
    );

    const importedParam1 = ssm.StringParameter.fromStringParameterAttributes(
      this,
      'imported-param-1',
      {
        parameterName: stringParam.parameterName,
        simpleName: false,
      },
    );

    const importedParam2 = ssm.StringParameter.fromStringParameterAttributes(
      this,
      'imported-param-2',
      {
        parameterName: stringListParam.parameterName,
        simpleName: false,
      },
    );

    new cdk.CfnOutput(this, 'imported-param-1-value', {
      value: importedParam1.stringValue,
    });

    new cdk.CfnOutput(this, 'imported-param-2-value', {
      value: importedParam2.stringValue,
    });

  }
}
