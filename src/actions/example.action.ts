import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { HttpResponse, StatusCode } from '../http/';

// Utils

export const loginAction = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log(event);
        let data;
        if ((data = event.headers)) {
            if (data.username && data.username === 'bob') {
                return new HttpResponse('G7T0K3N', StatusCode.OK).generate();
            }
        }
        return new HttpResponse('You are not Authorized', StatusCode.UNAUTHORIZED).generate();
    } catch (error) {
        console.log('====>' + error);
        return new HttpResponse({ error: true }, StatusCode.ERROR).generate();
    }
};

export const sumAction = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        console.log(event);
        let bodyData;
        let headerData;
        if (event.body !== null && event.headers !== null && (bodyData = JSON.parse(event.body)) && (headerData = event.headers)) {
            if (headerData.token === 'G7T0K3N') {
                const total = Number(bodyData.first) + Number(bodyData.second);
                return new HttpResponse(total, StatusCode.OK).generate();
            } else {
                return new HttpResponse(StatusCode.UNAUTHORIZED, StatusCode.UNAUTHORIZED).generate();
            }
        }
        return new HttpResponse('Missing Body', StatusCode.ERROR).generate();
    } catch (error) {
        console.log('====>' + error);
        return new HttpResponse({ error: true }, StatusCode.ERROR).generate();
    }
};
