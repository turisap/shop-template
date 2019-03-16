import { Query } from 'react-apollo';
import ErrorMessage from './ErrorMessage';
import gql from 'graphql-tag';
import Table from './styles/Table';
import { PERMISSIONS } from '../../backend/src/PermissionTypes';
import SickButton from './styles/SickButton';

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
        {({data, loading, error}) =>  (
            <div>
                <ErrorMessage error={error}/>
                <h2>Manage permissions</h2>
                <Table>
                    <thead>
                        <th>Name</th>
                        <th>Email</th>
                        {Object.keys(PERMISSIONS).map(permisssion => <th>{permisssion}</th>)}
                        <th>S</th>
                    </thead>
                    <tbody>
                    {data.users.map(user => <User user={user}/>)}
                    </tbody>
                </Table>
            </div>
        )}
    </Query>
);


class User extends React.Component {
    render (){
        const user = this.props.user;
        return (
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {Object.keys(PERMISSIONS).map(permission => (
                    <td>
                        <label htmlFor={`${user.id}-permission-${permission}`}>
                            <input type={"checkbox"}/>
                        </label>
                    </td>
                ))}
                <td>
                    <SickButton>Update</SickButton>
                </td>
            </tr>
        )
    }
}

export default Permissions;