import cluster from 'cluster';

export default ({ app, config, logger }) => {
  if (cluster.isMaster) {
    for (let i = 0; i < config.get('WEB_CONCURRENCY'); i++) { // eslint-disable-line no-plusplus
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      logger.warn(`worker ${worker.process.pid} died`);
    });
  } else {
    app.listen(config.get('PORT'), () => {
      logger.info(`The server is running at ${config.get('PROTOCOL')}://${config.get('DOMAIN')}:${config.get('PORT')}`);
    });
  }

  return controller;
};
