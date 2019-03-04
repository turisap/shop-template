import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { CONFIG } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? CONFIG.END_POINT : CONFIG.END_POINT,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
