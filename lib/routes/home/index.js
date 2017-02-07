import queries from '../../queries';

export default {
  path: '/',
  async action() {
    return await queries.page('home');
  },
};
