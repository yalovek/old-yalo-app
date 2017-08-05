import queries from '../../queries';

export default {
  path: '/:name',
  async action(ctx, { name }) {
    return await queries.page(name);
  },
};
