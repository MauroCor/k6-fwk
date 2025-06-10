import { options as userOptions, getUsersApi } from '../apis/getUsersApi.js';

export const options = {
    scenarios: {
        get_users: {
            ...userOptions, //  operador spread: copia todas las propiedades
            exec: 'getUsersApi'
        }
    },
    thresholds: {
        'http_req_duration': ['p(95)<500'],
        'http_req_failed': ['rate<0.01'],
    },
};

export { getUsersApi };
