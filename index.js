import express from 'express';
import UniversalRouter from 'universal-router'; // eslint-disable-line import/extensions
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import components from 'yalo-components';
import cluster from 'cluster';
import routes from './lib/routes';
import config from './lib/config';

const app = express();

app.get('*', async (req, res, next) => {
  try {
    const route = await UniversalRouter.resolve(routes, {
      path: req.path,
      query: req.query,
    });
    const data = { ...route };

    data.children = renderToString(route.component);

    const html = renderToStaticMarkup(components.html(data));

    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

if (cluster.isMaster) {
  for (let i = 0; i < config.get('WEB_CONCURRENCY'); i++) { // eslint-disable-line no-plusplus
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    /* eslint-disable no-console */
    console.log(`worker ${worker.process.pid} died`);
    /* eslint-enable no-console */
  });
} else {
  app.listen(config.get('PORT'), () => {
    /* eslint-disable no-console */
    console.log(`The server is running at http://localhost:${config.get('PORT')}/`);
    /* eslint-enable no-console */
  });
}

export default app;
