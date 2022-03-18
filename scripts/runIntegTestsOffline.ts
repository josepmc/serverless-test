import { spawn } from 'child_process';

const mockServer = spawn('yarn', ['run:local'], { shell: true });
const timeout = 1000 * 40; // 40 seconds
let integTestsStarted = false;

mockServer.stdout.on('data', (serverOutput) => {
    console.log(serverOutput.toString());

    if (serverOutput.includes('└──────────────────────────────────────────────────────────────────────────────┘')) {
        const integTester = spawn('yarn', ['test:local'], { stdio: 'inherit', shell: true });
        integTestsStarted = true;

        integTester.on('close', (code) => {
            mockServer.kill('SIGINT');
            process.exit(code || 0);
        });
    }
});

setTimeout(() => {
    if (!integTestsStarted) {
        mockServer.kill('SIGINT');
        console.error('Run offline tests timeout out after 40 seconds.');
        process.exit(1);
    }
}, timeout);
