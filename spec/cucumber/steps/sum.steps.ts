import { binding, when } from 'cucumber-tsflow';
import { Storage } from './storage';
import { BaseTest } from './baseTest';
import { expect } from 'chai';

@binding([Storage])
export class SumSteps extends BaseTest {
    constructor(public storage: Storage) {
        super();
    }
    /**
     * Convenience method to parse a value and convert into a payload
     * @param value the value to be parsed
     */
    public parseNumber(value: string) {
        switch (value) {
            case 'MAX_SAFE_INTEGER':
                return Number.MAX_SAFE_INTEGER.toString();
            case 'MAX_SAFE_INTEGER+2':
                return '9007199254740993';
            default:
                return value;
        }
    }
    @when(/I sum "(.*)" and "(.*)"/)
    public async sumRequest(value1: string, value2: string) {
        this.storage.lastRequest = await this.request
            .post('/sumaction')
            .set('token', this.storage.token || '')
            .send({
                first: this.parseNumber(value1),
                second: this.parseNumber(value2),
            });
    }
    @when(/I sum with a custom payload "(.*)" and "(.*)"/)
    public async sumCustomPayload(value1: string, value2: string) {
        const payload: { first?: string; second?: string } = {
            first: this.parseNumber(value1),
            second: this.parseNumber(value2),
        };
        if (value1 === 'false') delete payload.first;
        if (value2 === 'false') delete payload.second;
        this.storage.lastRequest = await this.request
            .post('/sumaction')
            .set('token', this.storage.token || '')
            .send(payload);
    }
    @when(/I should receive "(.*)" as the total of the sum/)
    public async totalSum(value: string) {
        expect(this.storage.lastRequest.body.result, `No result was sent in body ${JSON.stringify(this.storage.lastRequest.body)}`).to.not.be.null;
        expect(this.storage.lastRequest.body.result.toString()).to.equal(this.parseNumber(value));
    }
    @when(/I should receive an error as the total of the sum/)
    public async errorWhileSumming() {
        expect(this.storage.lastRequest.body.result).to.be.null;
    }
}
