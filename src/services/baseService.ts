import { apolloClient } from '../index';
import { gql, ApolloQueryResult } from '@apollo/client';
import useStore from '../store';

const useGraphQlWrapper = (): {
  executeQueryWithAuth: (
    queryString: string,
    variables?: Object,
  ) => Promise<ApolloQueryResult<any>>;
} => {
  const userToken = useStore((state) => state.token);
  const executeQueryWithAuth = async (queryString: string, variables?: Object) => {
    return await apolloClient.query({
      query: gql`
        ${queryString}
      `,
      variables: {
        ...variables,
      },
      context: {
        headers: {
          'content-type': 'application/json',
          authorization: userToken,
        },
      },
    });
  };
  return {
    executeQueryWithAuth,
  };
};
export default useGraphQlWrapper;
