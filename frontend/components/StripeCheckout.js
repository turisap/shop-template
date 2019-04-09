import React from 'react';
import { Mutation } from 'react-apollo';
import StripeCheckOut from 'react-stripe-checkout';
import Router from 'next/router';
import NProgress from 'nprogress';
import Proptypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY} from "./User";
import { CONFIG } from '../config';

class CheckOut extends React.Component {

    totalItems = cart => cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);

    onToken = res => {
        console.log(res);
    }

    render() {
        return (
            <User>
                {({data : { me }}) => <StripeCheckOut
                    amount={calcTotalPrice(me.cart)}
                    name={CONFIG.SHOP_NAME}
                    description={`Order of ${this.totalItems(me.cart)} items`}
                    image={me.cart[0].item && me.cart[0].item.image}
                    stripeKey={CONFIG.STRIPE_PUBLISHABLE_KEY}
                    currency={CONFIG.CURRENCY}
                    email={me.email}
                    token={console.log}
                >{this.props.children}</StripeCheckOut>}
            </User>
        )
    }
}

export default CheckOut;