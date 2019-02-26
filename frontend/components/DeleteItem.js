import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION ($id : ID!) {
        deleteItem(id : $id){
            id
        }
    }
`;

class DeleteItem extends Component {
    render() {
        return (
            <Mutation
                mutation={DELETE_ITEM_MUTATION}
                variables={{id : this.props.id}}
            >
                {(deleteItem, {error}) => (
                    <button onClick={() => {
                        console.log(this.props.id)
                        if(confirm('Are you sure you wanna delete this item?')) deleteItem();
                    }}>{this.props.children}</button>
                )}
            </Mutation>
        );
    }
}

DeleteItem.propTypes = {};

export default DeleteItem;
