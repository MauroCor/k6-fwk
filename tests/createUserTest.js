import { options as createUserOptions, createUserApi } from '../apis/createUserApi.js';
import { login } from '../utils/login.js';

export const options = {
    scenarios: {
        create_user: { 
            ...createUserOptions, 
            exec: 'createUserApi' 
        }
    },
    thresholds: {
        'http_req_duration': ['p(95)<500'],
        'http_req_failed': ['rate<0.01'],
    },
};

export function setup() {  // Función especial de k6 que se ejecuta antes de los escenarios para preparar datos (setup)
    const token = login();
    console.log("LOGIN");
    return { token };
}

export { createUserApi };
