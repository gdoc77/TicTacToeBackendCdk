import {
    Stack,
    StackProps,
    SecretValue
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // S3 Bucket for Pipeline Artifacts
    const artifactBucket = new s3.Bucket(this, 'TicTacToePipelineArtifactsBucket', {
      versioned: true,
    });

    // Source and Build Artifacts
    const sourceArtifact = new codepipeline.Artifact();
    const buildArtifact = new codepipeline.Artifact();

    // CodeBuild Project for Synth
    const cdkBuildProject = new codebuild.PipelineProject(this, 'TicTacToeCdkBuildProject', {
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_5_0,
      },
      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          install: {
            commands: [
              'npm install',
            ],
          },
          build: {
            commands: [
              'npm run build',
              'npx cdk synth --output dist',
            ],
          },
        },
        artifacts: {
          'base-directory': 'dist',
          files: '**/*',
        },
      }),
    });

    // Define CodePipeline
    const pipeline = new codepipeline.Pipeline(this, 'TicTacToePipeline', {
      pipelineName: 'TicTacToeDeployPipeline',
      artifactBucket: artifactBucket,
    });

    // Source Stage
    pipeline.addStage({
      stageName: 'Source',
      actions: [
        new codepipeline_actions.GitHubSourceAction({
          actionName: 'GitHub_Source',
          output: sourceArtifact,
          oauthToken: SecretValue.secretsManager(
            '/github/tictactoecdk-github-token', { jsonField: "github-token" } // Store GitHub token in Secrets Manager
          ),
          owner: 'gdoc77',
          repo: 'TicTacToeBackendCdk',
          branch: 'main',
        }),
      ],
    });

    // Build Stage
    /*pipeline.addStage({
      stageName: 'Build',
      actions: [
        new codepipeline_actions.CodeBuildAction({
          actionName: 'Build_CDK',
          project: cdkBuildProject,
          input: sourceArtifact,
          outputs: [buildArtifact],
        }),
      ],
    });

    // Deploy Stage
    pipeline.addStage({
      stageName: 'Deploy',
      actions: [
        new codepipeline_actions.CloudFormationCreateUpdateStackAction({
          actionName: 'Deploy_CDK',
          stackName: 'TicTacToeBackendCdk',
          templatePath: buildArtifact.atPath('TicTacToeBackendCdk.template.json'),
          adminPermissions: true,
        }),
      ],
    });*/
  }
}
