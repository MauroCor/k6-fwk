import { options as charactersOptions, getCharactersApi } from '../../apis/futurama/getCharactersApi.js';

export const options = {
    scenarios: {
        get_characters: {
            ...charactersOptions,
            exec: 'getCharactersApi'
        }
    },
    thresholds: {
        'http_req_duration': ['p(95)<500'],
        'http_req_failed': ['rate<0.01'],
    },
};

export { getCharactersApi };
