import Link from 'next/link';

const Nav = props => (
    <div>
        <Link href={'/sell'}>Sell</Link>
        <Link href={'/'}>Home</Link>
    </div>
);

export default Nav;