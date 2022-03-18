export const functions = {
    functionName: {
        handler: './src/actions/example.action.loginAction',
        events: [
            {
                httpApi: {
                    method: 'POST',
                    path: '/loginaction',
                },
            },
        ],
    },
    functionName1: {
        handler: './src/actions/example.action.sumAction',
        events: [
            {
                httpApi: {
                    method: 'POST',
                    path: '/sumaction',
                },
            },
        ],
    },
};
