import React, {Component} from 'react';
import Header from './Header';
import Meta from './Meta';

class Page extends Component {
    render() {
        return (
            <div>
                <Meta/>
                <Header/>
                {this.props.chidren}
            </div>
        );
    }
}

Page.propTypes = {};

export default Page;
