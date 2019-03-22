import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from "./User";

const REMOVE_FROM_CART_MUTATION = gql`
    mutation REMOVE_FROM_CART_MUTATION($id : ID!) {
        removeFromCart(id : $id) {
            id
        }
    }
`;

const StyledButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;
  &:hover {
    color: ${props => props.theme.red};
    cursor: pointer;
  }
`;

class RemoveFromCart extends React.Component {
    static propTypes = {
        itemId : PropTypes.string.isRequired
    };

    render() {
        return (
            <Mutation
                variables={{id : this.props.itemId}}
                mutation={REMOVE_FROM_CART_MUTATION}>
                {(removeFromCart, {loading, error}) => (
                    <StyledButton
                        title="Delete item"
                        disabled={loading}
                        onClick={() => {
                            removeFromCart()
                                ;
                        }}
                    >&times;</StyledButton>
                )}
            </Mutation>
        )
    }
}

export default RemoveFromCart;