import { assert } from 'chai';
import supertest from 'supertest';

assert(process.env.ServiceEndpoint, 'ServiceEndpoint is not defined as an environment variable. Aborting.');

export class BaseTest {
    public request = supertest(process.env.ServiceEndpoint);
    public responseBuilder = (response: object): { data: object } => ({
        data: response,
    });
}
