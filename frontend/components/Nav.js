import Link from 'next/link';
import { Mutation } from 'react-apollo';
import NavStyles from './styles/NavStyles';
import User from './User';
import SignOut from './SignOut';
import { TOGGLE_CART_MUTATION } from "./Cart";

const Nav = props => (
    <User>
        {({data : {me}}) => (
            <NavStyles>
                {me && (
                    <>
                        <Link href="/orders">
                            <a>Orders</a>
                        </Link>
                        <Link href="/account">
                            <a>Account</a>
                        </Link>
                        <Link href="/sell">
                            <a>Sell</a>
                        </Link>
                        <SignOut/>
                        <Mutation mutation={TOGGLE_CART_MUTATION}>
                            {(toggleCart) => (
                                <button onClick={toggleCart}>My Cart</button>
                            )}
                        </Mutation>
                    </>
                )}

                {!me && (
                    <>
                        <Link href="/">
                            <a>Shop</a>
                        </Link>
                        <Link href="/signup">
                            <a>SignUp</a>
                        </Link>
                    </>
                )}
            </NavStyles>
        )}
    </User>
);

export default Nav;