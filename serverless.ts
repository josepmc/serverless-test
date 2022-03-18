/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

import { functions } from './resources';

const serverlessConfiguration: AWS = {
    service: 'serverless-template',
    frameworkVersion: '3',
    plugins: ['serverless-offline', 'serverless-offline-lambda', 'serverless-webpack'],
    package: {
        individually: true,
    },
    useDotenv: true,
    variablesResolutionMode: '20210326',
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        stage: 'dev',
        region: 'eu-west-1',
        lambdaHashingVersion: '20201221',
        timeout: 6,
        httpApi: {
            shouldStartNameWithService: true,
            disableDefaultEndpoint: false,
            metrics: true,
        },
        logs: {
            httpApi: true,
        },
        environment: {
            SERVICE_NAME: '${self:service}',
        },
    },
    custom: {
        webpack: {
            includeModules: true,
        },
    },
    functions: { ...functions },
    resources: {
        Resources: {},
        Outputs: {},
    },
};

module.exports = serverlessConfiguration;
