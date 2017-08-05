import convict from 'convict';

const config = convict({
  NODE_ENV: {
    doc: 'Type of enviroment.',
    format: [
      'development',
      'production',
    ],
    default: 'development',
    env: 'NODE_ENV',
    arg: 'node-env',
  },
  MONGODB_URL: {
    doc: 'MongoDB URL.',
    format: 'url',
    default: 'mongodb://localhost/couponad',
    env: 'MONGODB_URL',
    arg: 'mongodb-url',
  },
  GRAPHQL_URL: {
    doc: 'GraphQL URL.',
    format: 'url',
    default: 'http://localhost:3000/graphql',
    env: 'GRAPHQL_URL',
    arg: 'graphql-url',
  },
  WEB_CONCURRENCY: {
    doc: 'Number of workers.',
    format: 'nat',
    default: 1,
    env: 'WEB_CONCURRENCY',
    arg: 'web-concurrency',
  },
  PORT: {
    doc: 'Port number.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port',
  },
  STATIC: {
    doc: 'Path to static files.',
    format: String,
    default: 'lib/public',
    env: 'STATIC',
    arg: 'static',
  },
});

export default config;
