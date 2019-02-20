import Link from 'next/link';
import NavStyles from './styles/NavStyles'

const Nav = props => (
    <NavStyles>
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