import { compose } from 'ramda';
import express from 'express';
import controller from './controller';
import router from './router';
import cluster from './cluster';
import config from './src/config';
import logger from './src/logger';
import routes from './src/routes';
import render from './src/render';

export default compose(cluster, router)({
  app: express(),
  config,
  logger,
  routes,
  render,
});
