import Joi from 'joi';
import _ from 'lodash';

const RequestValidatorConstants = requireF('services/_core/requestValidators/RequestValidatorConstants.js');

export default class RequestValidatorWhere {
  constructor(models, model) {
    this.model = model;
  }

  build() {
    const modelAttributes = _.keys(this.model.attributes);
    const validAttributes = modelAttributes.reduce((params, attribute) => {
      // TODO: use joi-sequelize
      params[attribute] = Joi.any(); // eslint-disable-line no-param-reassign
      return params;
    }, {});
    return Joi.object().keys({
      ...validAttributes,
      ...RequestValidatorConstants.SEQUELIZE_OPERATORS,
    });
  }
}
