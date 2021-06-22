import createApp from './createApp';
import { setData } from './dataInjector';

const { app } = createApp();

export interface WebClientView {
    app: any,
    setData: Function,
}

const webClientView:WebClientView = {
    app,
    setData,
};

export default webClientView;
