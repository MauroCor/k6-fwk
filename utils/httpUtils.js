import { check } from 'k6';
import { ENV } from './env.js';

export const HEADERS = {
    'x-api-key': ENV.API_KEY
};

export function assertStatus(res, name, status) {
    check(res, { [name]: (r) => r.status === status });
}
