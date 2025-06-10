import http from 'k6/http';
import { check, sleep } from 'k6';
import { assertStatus, BASE_URL, HEADERS } from '../utils/httpUtils.js';

export const options = {
    executor: 'ramping-vus',
    startVUs: 1,
    stages: [
        { duration: '10s', target: 5 },
        { duration: '5s', target: 1 },
    ]
};

export function getUsersApi() {
    const res = http.get(`${BASE_URL}/api/users`, { headers: HEADERS });
    // console.log("USERS", res);
    assertStatus(res, 'get_users: status 200', 200);
    check(res, {
        'data no vacía': (r) => JSON.parse(r.body).data?.length > 0
    });
    sleep(1);
}
