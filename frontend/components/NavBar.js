import React from 'react';
import Link from 'next/link';

const NavBar = () => {
    return (
        <div>
            <Link href={"/sell"}>
                <a>Sell</a>
            </Link>
            <Link href={"/"}>
                <a>HOME</a>
            </Link>
        </div>
    );
};

export default NavBar;
