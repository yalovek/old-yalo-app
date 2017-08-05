import page from './page';
import home from './home';
import error from './error';

export default {
  path: '/',
  children: [
    page,
    home,
    error,
  ],
  async action({ next }) {
    let route;

    do {
      route = await next();
    } while (!route);

    return route;
  },
};
