declare global {
    interface Window{
        webClient: WebClientController
    }
}
declare var webClient:WebClientController;

import WebClientController from '../controller/main';
import WebClientModel from '../model/main';
import view from '../view/main';

const model = new WebClientModel({
    localStorage: 'ls',
    endpoint: 'https://test-api.xiaotu.io/api/v2/',
    headers: {}
})

const controller = new WebClientController(view, model);
controller.mount('#container');
