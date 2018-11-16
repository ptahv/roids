import {configure} from '@storybook/react';

configure(() => {
    const req = require.context('../stories', true, /\.stories\.js$/);
    req.keys().forEach(filename => req(filename));
}, module);