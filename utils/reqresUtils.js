import http from 'k6/http';
import { check } from 'k6';
import { HEADERS } from './httpUtils.js';
import { ENV } from './env.js';

export function loginReqres() {

    const payload = JSON.stringify({ email: ENV.EMAIL, password: ENV.PASSWORD });

    const res = http.post(`${ENV.BASE_URL_REQRES}/api/login`, payload, {headers: HEADERS});
    
    check(res, {
        'login status 200': (r) => r.status === 200,
        'token exists': (r) => JSON.parse(r.body).token !== undefined,
    });

    const token = JSON.parse(res.body).token;
    return token;
}
