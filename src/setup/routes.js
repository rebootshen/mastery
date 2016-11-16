import path from 'path';
import glob from 'glob';
import _ from 'lodash';

export default async (models) => {
  const routesPath = path.resolve(path.join(__dirname, '..', 'component'));
  const routesGlob = path.resolve(path.join(routesPath, '**', '*Routes.js'));

  // retrieve all available routes from /component/**/*Routes.js
  const routesComponent = glob.sync(routesGlob);

  // merge all routes in an array
  const allRoutes = [];
  _.each(routesComponent, (filePath) => {
    const routes = require(filePath)(models); // eslint-disable-line
    allRoutes.push(...routes);
  });

  return allRoutes;
};