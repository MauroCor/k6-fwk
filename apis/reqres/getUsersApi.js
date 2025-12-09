import http from 'k6/http';
import { check, sleep } from 'k6';
import { assertStatus, HEADERS } from '../../utils/httpUtils.js';
import { ENV } from '../../utils/env.js';

export const options = {
    executor: 'ramping-vus',
    startVUs: 1,
    stages: [
        { duration: '10s', target: 1 },
        // { duration: '1m', target: 20 },
        // { duration: '1m', target: 30 },
        // { duration: '1m', target: 40 },
        // { duration: '1m', target: 50 }
    ]
};

export function getUsersApi() {
    const res = http.get(`${ENV.BASE_URL_REQRES}/api/users`, { headers: HEADERS });
    console.log("USERS", res);
    assertStatus(res, 'get_users: status 200', 200);
    check(res, {
        'data no vacía': (r) => JSON.parse(r.body).data?.length > 0
    });
    sleep(1);
}
