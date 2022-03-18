import { binding, then, when } from 'cucumber-tsflow';
import { Storage } from './storage';
import { BaseTest } from './baseTest';
import { expect } from 'chai';

@binding([Storage])
export class LoginSteps extends BaseTest {
    constructor(public storage: Storage) {
        super();
    }
    @when(/I send a login request with "(.*)" and "(.*)"/)
    public async loginRequest(user: string, password: string) {
        this.storage.lastRequest = await this.request
            .post('/loginaction')
            .set('username', user || '')
            .set('password', password || '')
            .send();
    }
    @then(/I should receive a (\d+) response from the server/)
    public async responseCode(code: number) {
        expect(this.storage.lastRequest.statusCode).to.equal(code);
    }
    @then(/I store the login credentials/)
    public async storeCredentials() {
        this.storage.token = this.storage.lastRequest.body.result;
    }
    @when(/I send a valid login request/)
    public async validLogin() {
        await this.loginRequest('bob', 'P@55w0rd');
        this.storeCredentials();
    }
    @when(/I send an invalid login request/)
    public async invalidLogin() {
        await this.loginRequest('test', 'test');
    }
}
