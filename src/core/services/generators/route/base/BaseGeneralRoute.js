import _ from 'lodash';

const BaseRoute = requireF('core/services/generators/route/base/BaseRoute');

export default class BaseGeneralRoute extends BaseRoute {
  constructor({
    handler,
    methodName,
    model,
  }) {
    const methodConf = conf.get(`models:${model.name}:methods:${methodName}`);

    super({
      handler,
      methodConf,
      model,
    });

    this.parsers = methodName;
    this.permissions = [`${model.name}:${methodName}`, `${model.name}:own:${methodName}`];
    this.requestValidators = [`${model.name}.${methodName}`];

    _.set(this.identifier, 'name', methodName);
    _.set(this.identifier, 'preHandlerValidators', [`${model.name}.${methodName}`]);
  }
}
