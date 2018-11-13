import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

class Item extends Component {
    render() {
        const { id, title, price, image } = this.props.item;
        return (
            <ItemStyles>
                {image && <img src={image} alt={title}/>}
                <Title>
                    <Link href={{ path : '/item', query : { id } }}>
                        <a>{title}</a>
                    </Link>
                    <PriceTag> {formatMoney(price)} </PriceTag>
                </Title>
                <div className="buttonList">
                    <Link href={{pathname : "update", query : { id }}}>
                        <a>Edit</a>
                    </Link>
                    <button>Add to Cart</button>
                    <button>Delete</button>
                </div>
            </ItemStyles>
        );
    }
}

Item.propTypes = {
    item : PropTypes.object.isRequired
};

export default Item;
