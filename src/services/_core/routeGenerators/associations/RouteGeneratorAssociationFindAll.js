import path from 'path';

const RouteGeneratorBaseAssociation = requireF('services/_core/routeGenerators/base/RouteGeneratorBaseAssociation');
const HandlerGeneratorAssociationFindAll = requireF('services/_core/handlerGenerators/associations/HandlerGeneratorAssociationFindAll');

export default class RouteGeneratorAssociationFindAll extends RouteGeneratorBaseAssociation {
  constructor(model, association) {
    const methodName = 'findAllOneToMany';
    const methodAlias = 'findAll';
    const handlerGenerator = new HandlerGeneratorAssociationFindAll(model, association);

    super({
      association,
      handler: handlerGenerator.handler,
      methodAlias,
      methodName,
      model,
    });

    this.method = 'GET';
    this.path = path.join(model.name, '{pk}', association.as);
  }
}