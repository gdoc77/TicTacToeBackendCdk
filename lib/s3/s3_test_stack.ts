import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class S3TestBucketStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an S3 Bucket
    new s3.Bucket(this, 'MyTestBucket', {
      bucketName: 'my-test-bucket-cdk-test', // Customize or remove for a unique name
      versioned: true, // Enable versioning
      publicReadAccess: false, // Disable public access
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Automatically delete during stack removal
    });
  }
}