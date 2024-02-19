import * as Joi from 'joi';
import {
  CONFIG_DATABASE_HOST,
  CONFIG_DATABASE_LOGGING_ENABLED,
  CONFIG_DATABASE_NAME,
  CONFIG_DATABASE_PASSWORD,
  CONFIG_DATABASE_PATH,
  CONFIG_DATABASE_PORT,
  CONFIG_DATABASE_SYNCHRONIZE,
  CONFIG_DATABASE_TYPE,
  CONFIG_DATABASE_USERNAME,
  CONFIG_ENVIRONMENT,
  CONFIG_HOST,
  CONFIG_PORT
} from '../constants';

export const validationSchema = Joi.object({
  [CONFIG_HOST]: Joi.string().default('localhost'),
  [CONFIG_PORT]: Joi.number().default(3333),

  [CONFIG_DATABASE_TYPE]: Joi.string().default('sqlite'),
  [CONFIG_DATABASE_HOST]: Joi.when(CONFIG_DATABASE_TYPE, {
    is: 'sqlite',
    then: Joi.optional(),
    otherwise: Joi.string().required(),
  }),
  [CONFIG_DATABASE_PORT]: Joi.when(CONFIG_DATABASE_TYPE, {
    is: 'sqlite',
    then: Joi.optional(),
    otherwise: Joi.number().required(),
  }),
  [CONFIG_DATABASE_USERNAME]: Joi.when(CONFIG_DATABASE_TYPE, {
    is: 'sqlite',
    then: Joi.optional(),
    otherwise: Joi.string().required(),
  }),
  [CONFIG_DATABASE_PASSWORD]: Joi.when(CONFIG_DATABASE_TYPE, {
    is: 'sqlite',
    then: Joi.optional(),
    otherwise: Joi.string().required(),
  }),
  [CONFIG_DATABASE_NAME]: Joi.when(CONFIG_DATABASE_TYPE, {
    is: 'sqlite',
    then: Joi.optional(),
    otherwise: Joi.string().required(),
  }),
  [CONFIG_DATABASE_PATH]: Joi.when(CONFIG_DATABASE_TYPE, {
    is: 'sqlite',
    then: Joi.string().required(),
    otherwise: Joi.optional(),
  }),
  [CONFIG_DATABASE_LOGGING_ENABLED]: Joi.boolean().optional().default(false),
  [CONFIG_DATABASE_SYNCHRONIZE]: Joi.boolean().default(true),

  [CONFIG_ENVIRONMENT]: Joi.string()
    .allow('development', 'production', 'local', 'test')
    .default('development'),
});
