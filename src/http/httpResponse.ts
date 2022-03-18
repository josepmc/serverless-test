import { StatusCode } from './statusCodes';

export type ResponseHeader = { [header: string]: string | number | boolean };

export interface IResponseBody {
    result: any;
    message?: string;
}

export interface IResponse {
    statusCode: number;
    headers: ResponseHeader;
    body: string;
}

const RESPONSE_HEADERS: ResponseHeader = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    'Cache-Control': 'no-store', // Ensures none of our responses are cached
};

/**
 * class ResponseModel
 */
export class HttpResponse {
    private body: IResponseBody;
    private code: number;

    /**
     * ResponseModel Constructor
     * @param result
     * @param code
     * @param message
     * @param additionalBodyData
     */
    constructor(result = {}, code = StatusCode.OK, message?: string, additionalBodyData?: object) {
        this.body = {
            result,
            message,
            ...additionalBodyData,
        };
        this.code = code;
    }

    /**
     * Set Result
     * @param result
     */
    setResult = (result: any): void => {
        this.body.result = result;
    };

    /**
     * Set Status Code
     * @param code
     */
    setCode = (code: number): void => {
        this.code = code;
    };

    /**
     * Get Status Code
     * @return {*}
     */
    getCode = (): number => {
        return this.code;
    };

    /**
     * Removes empty values from response body
     * @param obj
     * @returns {Partial<IResponse>}
     */

    protected removeUndefinedProperties(obj: Record<string, any>): Record<string, any> {
        return Object.entries(obj)
            .filter(([, value]) => typeof value !== 'undefined')
            .reduce((accumulator, [key, value]) => ({ ...accumulator, [key]: value }), {});
    }

    /**
     * Generate a response
     * @return {IResponse}
     */
    generate = (): IResponse => {
        return {
            statusCode: this.code,
            headers: RESPONSE_HEADERS,
            body: JSON.stringify(this.removeUndefinedProperties(this.body)),
        };
    };
}
