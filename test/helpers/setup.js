import path from 'path';
import portfinder from 'portfinder';
import Promise from 'bluebird';
import Hapi from 'hapi';
import Sequelize from 'sequelize';
import * as HapiSequelize from 'hapi-sequelize';
import * as HapiAuthJWT2 from 'hapi-auth-jwt2';

import { secret } from '../../src/setup/config';
import { validateAuth } from '../../src/services/authentications';
import { bootServer } from '../../src/services/commonServices';

const getPort = Promise.promisify(portfinder.getPort);
const srcPath = path.resolve(path.join(__dirname, '..', '..', 'src'));
const modelsPath = path.resolve(path.join(srcPath, 'component'));
const modelsGlob = path.resolve(path.join(modelsPath, '**', '*Model.js'));
const dbName = 'db';

export default async (test) => {
  test.beforeEach('Get an open port', async (t) => {
    // eslint-disable-next-line no-param-reassign
    t.context.port = await getPort();
  });

  test.beforeEach('Setup server', async (t) => {
    // eslint-disable-next-line no-param-reassign
    const sequelize = t.context.sequelize = new Sequelize({
      dialect: 'sqlite',
      logging: false,
    });

    // eslint-disable-next-line no-param-reassign
    const server = t.context.server = new Hapi.Server();
    server.connection({
      host: '0.0.0.0',
      port: t.context.port,
    });

    await server.register({
      register: HapiSequelize,
      options: {
        name: dbName,
        models: [modelsGlob],
        sequelize,
        sync: true,
        forceSync: true,
      },
    });

    await server.register(HapiAuthJWT2);

    server.auth.strategy('jwt', 'jwt', {
      key: secret,
      validateFunc: validateAuth,
      verifyOptions: { algorithms: ['HS256'] },
    });

    await bootServer(server);
  });
};