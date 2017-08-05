import { match } from 'react-router';

export default ({ app, config, logger, routes, render }) => {
  app.get('*', (req, res, next) => {
    match({
      routes,
      location: req.url,
    }, (error, redirectLocation, renderProps) => {
      if (error) {
        logger.error(`500 ${error.message}`);

        res.status(500).send(error.message);
      } else if (redirectLocation) {
        const url = redirectLocation.pathname + redirectLocation.search;

        logger.info(`302 ${url}`);

        res.redirect(302, url);
      } else if (renderProps) {
        logger.info(`200 ${req.url}`);

        render(renderProps, res, next);
      } else {
        logger.warn(`404 ${req.url}`);

        res.status(404).send(`${config.get('STATIC')}/404.html`);
      }
    });
  });

  return app;
};
