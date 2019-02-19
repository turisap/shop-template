import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items'

const DELETE_ITEM = gql`
    mutation DELETE_ITEM_MUTATION($id : ID!) {
        deleteItem(id : $id) {
            id
        }
    }
`

class DeleteItem extends Component {
    /**
     * This method is for updating Apollo Client cash to match the server DB
     * @returns {*}
     */
    update = (cache, payload) => {
        // get all items from cache
        const data = cache.readQuery({ query : ALL_ITEMS_QUERY });
        // filter out the deleted item
        data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
        // put the items back into the cache
        cache.writeQuery({ query : ALL_ITEMS_QUERY, data });
    };

    render() {
        return (
            <Mutation
                mutation={DELETE_ITEM}
                variables={{id : this.props.id}}
                update={this.update}
            >
                {
                    (deleteItem, { error }) => (
                        <button onClick={() => {
                            if(confirm('Are you sure you want to delete this item')) deleteItem()
                        }}>
                            {this.props.children}
                        </button>
                    )
                }

            </Mutation>
        );
    }
}

DeleteItem.propTypes = {};

export default DeleteItem;
