import { Query } from 'react-apollo';
import ErrorMessage from './ErrorMessage';
import gql from 'graphql-tag';

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            name
            email
            permissions
        }
    }
`;

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
        {({data, loading, error}) => {
            return (
                <div>
                    <ErrorMessage error={error}/>
                    Hey
                </div>
            )
        }}
    </Query>
);

export default Permissions;