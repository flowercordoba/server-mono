import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  
  DATABASE_URL: get('DATABASE_URL').required().asString(),
  // MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

  JWT_TOKEN: get('JWT_TOKEN').required().asString(),

  SEND_EMAIL: get('SEND_EMAIL').default('false').asBool(),
  MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),
  MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),
  MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').required().asString(),
  CLIENT_URL: get('CLIENT_URL').required().asString(),
  
  WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString(),

};



