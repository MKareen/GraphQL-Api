import http from 'http';
import './server/configs/database';
import App from './server/app';

import params from './server/configs/params';

const server = http.createServer(App());

server.listen(params.apiPort, () => {
    console.log(`Listening ${server.address().port} port.`);
});
