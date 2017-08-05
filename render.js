import { compose } from 'ramda';
import IsomorphicRouter from 'isomorphic-relay-router';
import { renderToString } from 'react-dom/server';
import components from './lib/components';

const networkLayer = new Relay.DefaultNetworkLayer(config.get('GRAPHQL_URL'));
const render = (res) => {
  return ({ props }) => {
    res.status(200).send(`<!doctype html>${renderApp(props)}`);
  };
};
const renderApp = compose(renderShell, renderContent);
const renderShell = compose(renderToString, components.html, StyleSheetServer.renderStatic);
const renderContent = compose(renderToString, IsomorphicRouter.render);

export default (renderProps, res, next) => {
  IsomorphicRouter.prepareData(renderProps, networkLayer).then(render(res)).catch(next);
};
