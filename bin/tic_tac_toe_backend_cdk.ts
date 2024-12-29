#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { TicTacToeBackendCdkStack } from '../lib/tic_tac_toe_backend_cdk-stack';
import { PipelineStack } from '../lib/pipeline/pipeline';
import { S3TestBucketStack } from '../lib/s3/s3_test_stack';

const app = new App();
const ticTacToeStack = new TicTacToeBackendCdkStack(app, 'TicTacToeBackendCdk', {
  env: { account: "955625928616", region: "us-west-2" },//account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

const pipelineStack = new PipelineStack(app, 'TicTacToePipeline');
const s3TestBucketStack = new S3TestBucketStack(app, 'S3TestBucketStack')

pipelineStack.addDependency(ticTacToeStack);
s3TestBucketStack.addDependency(ticTacToeStack);
