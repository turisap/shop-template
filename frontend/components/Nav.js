import Link from 'next/link';
import NavStyles from './styles/NavStyles'
import User from './User';
import SignOut from './SignOut';

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