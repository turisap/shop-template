import Link from 'next/link';
import NavStyles from './styles/NavStyles'
import User from './User';

const Nav = props => (
    <NavStyles>
        <User>
            {({data : {me}}) => {
                if(me) {
                    return <p>{me.name}</p>;
                }
                return null;
            }}
        </User>
        <Link href="/">
            <a>Shop</a>
        </Link>
        <Link href="/sell">
            <a>Sell</a>
        </Link>
        <Link href="/signup">
            <a>SignUp</a>
        </Link>
        <Link href="/orders">
            <a>Orders</a>
        </Link>
        <Link href="/account">
            <a>Account</a>
        </Link>
    </NavStyles>
);

export default Nav;