import { Response } from 'supertest';

export class Storage {
    public lastRequest!: Response;
    public token!: string;
}
