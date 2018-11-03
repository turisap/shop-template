/**
 * This component is for rendering other components which are needed at every page
 * as Header or NavBar
 */

import React, {Component} from 'react';
import Header from './Header';
import Meta from './Meta';

class Page extends Component {
    render() {
        return (
            <div>
                <Meta/>
                <Header/>
                {this.props.children}
            </div>
        );
    }
}


export default Page;
