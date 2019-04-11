import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { format } from 'date-fns';
import Head from 'next/head';
import Error from './ErrorMessage';
import OrderStyles from './styles/OrderStyles';

class Order extends React.Component {
    static propTypes = {
        id : PropTypes.string.isRequired
    };

    render(){
        return(
            <p>ID is {this.props.id}</p>
        )
    }
}

export default Order;