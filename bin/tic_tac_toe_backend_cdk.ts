#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline/pipeline';
import { TicTacToeBackendCdkStack } from '../lib/tic_tac_toe_backend_cdk-stack';

const app = new App();
const ticTacToeStack = new TicTacToeBackendCdkStack(app, 'TicTacToeBackendCdk', {
  env: { account: "955625928616", region: "us-west-2" },//account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});

const pipelineStack = new PipelineStack(app, 'PipelineStack', {
  env: { account: "955625928616", region: "us-west-2" },
})
