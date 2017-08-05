import fetch from 'isomorphic-fetch';
import components from 'yalo-components';
import config from '../config';

export default {
  async page(name) {
    const res = await fetch(config.get('QRAPHQL_URL'), {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          page(name: "${name}") {
            title
            description
            components {
              name
              data
            }
          }
        }`,
      }),
      credentials: 'include',
    });
    const { data } = await res.json();

    if (!data || !data.page) return undefined;

    return {
      title: data.page.title,
      description: data.page.description,
      component: components.page(data.page.components),
    };
  },
};
