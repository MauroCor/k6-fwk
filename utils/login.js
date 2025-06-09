import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL, HEADERS } from './httpUtils.js';

export function login() {
    // Lee las credenciales desde variables de entorno
    const email = __ENV.EMAIL;
    const password = __ENV.PASS;

    if (!email || !password) {
        throw new Error("Falta EMAIL o PASS");
        // Debes definir las variables de entorno antes de ejecutar el test:
        // En Linux/macOS (bash): EMAIL=tu@email PASS=tuPass k6 run script.js
        
        // En PowerShell (Windows): $env:EMAIL='tu@email'; $env:PASS='tuPass'; k6 run script.js
       
        // En CMD (Windows): set EMAIL=tu@email
        //                   set PASS=tuPass
        //                   k6 run script.js
    }
    
    const payload = JSON.stringify({ email, password });

    const res = http.post(`${BASE_URL}/api/login`, payload, {headers: HEADERS});
    
    check(res, {
        'login status 200': (r) => r.status === 200,
        'token exists': (r) => JSON.parse(r.body).token !== undefined,
    });

    const token = JSON.parse(res.body).token;
    return token;
}
