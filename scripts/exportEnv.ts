import { CloudFormation, AWSError } from 'aws-sdk';
import { readAsync } from 'node-yaml-config';

const path = require('path');
const fs = require('fs');

const commandLineArgs = require('command-line-args');

const commandLineArgDefinitions = [
    { name: 'stage', alias: 's', type: String },
    { name: 'output', alias: 'o', type: String },
];
const options = commandLineArgs(commandLineArgDefinitions);

const getStackOutputs = (stack: string, region: string): Promise<CloudFormation.Types.DescribeStacksOutput> => {
    const cloudFormation = new CloudFormation({ region });
    const params = {
        StackName: stack,
    };
    return new Promise((resolve, reject) => {
        cloudFormation.describeStacks(params, (err: AWSError, data: CloudFormation.Types.DescribeStacksOutput) => {
            if (err) {
                console.error(err.message);
                process.exit(1);
            }
            resolve(data);
        });
    });
};

async function main() {
    // load the serverless yaml file
    const slsConfig = await readAsync(path.join(__dirname, '..', 'serverless.yml'));
    if (!slsConfig.service) {
        throw new Error('no service name specified in serverless.yml');
    }
    if (!slsConfig.provider.region) {
        throw new Error('no region specified in serverless.yml');
    }
    // load stack name and region
    const serviceName = slsConfig.service;
    const stageName = options.stage || 'dev';
    const stack = `${serviceName}-${stageName}`;
    const region = slsConfig.provider.region;
    const envFileOutput = options.output || './.test-stage-env';

    console.log('Environment:');
    console.log(`Region: ${region}`);
    console.log(`Stage: ${stageName}`);
    console.log(`Service: ${serviceName}`);
    console.log(`Stack: ${stack}`);
    console.log();
    // load stage

    const stackDescription = await getStackOutputs(stack, region);
    const outputs: { [key: string]: string } = {};

    if (stackDescription.Stacks) {
        stackDescription.Stacks.forEach((s) => {
            if (s.Outputs) {
                s.Outputs.forEach((output) => {
                    if (output.OutputKey) {
                        outputs[output.OutputKey] = output.OutputValue || '';
                    }
                });
            }
        });
    }

    console.log('Variables:');
    let output = '';
    Object.keys(outputs).forEach((k) => {
        console.log(`${k} = ${outputs[k]}`);
        output += `${k}="${outputs[k]}"\r\n`;
    });
    console.log();
    console.log(`Exporting to '${envFileOutput}'`);
    fs.writeFileSync(envFileOutput, output);
}
main();
