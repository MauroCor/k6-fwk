import { check } from 'k6';

export const BASE_URL = 'https://reqres.in';

export const HEADERS = {
    'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1'
};

export function assertStatus(res, name, status) {
    check(res, { [name]: (r) => r.status === status });
}
