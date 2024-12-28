#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TicTacToeBackendCdkStack } from '../lib/tic_tac_toe_backend_cdk-stack';

const app = new cdk.App();
new TicTacToeBackendCdkStack(app, 'TicTacToeBackendCdkStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});