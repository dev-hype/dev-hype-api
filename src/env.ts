import * as Joi from 'joi'

export const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  FRONTEND_URL: Joi.string().required(),

  // Database
  DATABASE_URL: Joi.string().required(),

  // Auth
  JWT_SECRET: Joi.string().required(),
  // GITHUB_AUTH_CLIENT_ID: Joi.string().required(),
  // GITHUB_AUTH_CLIENT_SECRET: Joi.string().required(),
})
