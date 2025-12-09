import { options as createUserOptions, createUserApi } from '../../apis/reqres/createUserApi.js';
import { getUsersApi } from '../../apis/reqres/getUsersApi.js';
import { loginReqres } from '../../utils/reqresUtils.js';

export const options = {
    scenarios: {
        get_users: {
            executor: 'constant-arrival-rate',
            rate: 2,                // requests por segundo
            duration: '15s',        // duración total del escenario
            preAllocatedVUs: 1,     // VUs iniciales reservados
            maxVUs: 10,             // máximo de VUs escalables
            exec: 'getUsersApi',
            startTime: '0s'
        },
        create_user: {
            ...createUserOptions,
            exec: 'createUserApi',
            startTime: '15s'
        }
    },
    thresholds: {
        'http_req_duration': ['p(95)<500'],
        'http_req_failed': ['rate<0.01'],
    },
};


export function setup() {
    const token = loginReqres();
    console.log("LOGIN");
    return { token };
}

export { getUsersApi, createUserApi };
