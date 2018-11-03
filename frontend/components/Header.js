import * as config from '../config';
import NavBar from './NavBar';

const Header = () => {
    return (
        <div>
            <div className="bar">
                <a href="">{config.applicationName}</a>
            </div>
            <NavBar/>
            <div className="sub-bar">
                <p>Search</p>
            </div>
            <div>Cart</div>
        </div>
    );
};

export default Header;
