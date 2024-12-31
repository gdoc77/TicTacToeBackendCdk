import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { PipelineStack } from './pipeline/pipeline';
import { S3TestBucketStack } from './s3/s3_test_stack';

export class TicTacToeBackendCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const s3TestBucketStack = new S3TestBucketStack(this, 'S3TestBucketStack');
  }
}
