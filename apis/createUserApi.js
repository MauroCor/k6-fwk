import http from 'k6/http';
import { sleep } from 'k6';
import { assertStatus, BASE_URL, HEADERS } from '../utils/httpUtils.js';

export const options = {
    executor: 'ramping-vus',
    startVUs: 1,
    stages: [
        { duration: '10s', target: 5 },
        { duration: '5s', target: 1 },
    ]
};

export function createUserApi(data) {
    console.log("data", data);

    const payload = {
        "name": "morpheus",
        "job": "leader"
    };

    const authHeaders = {
        ...HEADERS,
        Authorization: `Bearer ${data.token}`,
    };
    console.log("authHeaders", authHeaders);

    const res = http.post(`${BASE_URL}/api/users`, JSON.stringify(payload), { headers: authHeaders });
    console.log("CREATE", res);
    assertStatus(res, 'create_user: status 201', 201);
    sleep(1);
}
