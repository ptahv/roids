import React from 'react';

import createContainer from './kontti/container.jsx';

import createProvider from './kontti/provider.jsx';
import createConsumer from './kontti/consumer.jsx';
import createPureConsumer from './kontti/pureConsumer.jsx';

import createUseKontti from './utils/useKontti.js';

export const container = createContainer;

const GlobalContainer = React.createContext();
export const provider = createProvider(GlobalContainer);
export const Consumer = createConsumer(GlobalContainer);
export const PureConsumer = createPureConsumer(Consumer);

export const useKontti = createUseKontti(GlobalContainer);

export default {
    container,

    provider,
    Consumer,
    PureConsumer,

    useKontti
}
