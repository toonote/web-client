declare global {
    interface Window{
        webClient: WebClientController
    }
}
declare var webClient:WebClientController;

import WebClientController from '../controller/main';
import WebClientModel from '../model/main';
import view from '../view/main';

declare var process:any;

const BASE_URL = process.env.NODE_ENV === 'production' ?
            'https://api.xiaotu.io':
            'https://test-api.xiaotu.io';

const model = new WebClientModel({
    localStorage: 'ls',
    endpoint: BASE_URL + '/api/v2/',
    headers: {}
})

const controller = new WebClientController(view, model);
controller.mount('#container');
