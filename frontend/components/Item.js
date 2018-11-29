import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteItem from './DeleteItem';

class Item extends Component {
    render() {
        const { id, title, price, image } = this.props.item;
        return (
            <ItemStyles>
                {image && <img src={image} alt={title}/>}
                <Title>
                    <Link href={{ pathname : '/item', query : { id } }}>
                        <a>{title}</a>
                    </Link>
                    <PriceTag> {formatMoney(price)} </PriceTag>
                </Title>
                <div className="buttonList">
                    <Link href={{pathname : "update", query : { id }}}>
                        <a>Edit</a>
                    </Link>
                    <button>Add to Cart</button>
                    <DeleteItem id={id}>Delete this item</DeleteItem>
                </div>
            </ItemStyles>
        );
    }
}

Item.propTypes = {
    item : PropTypes.object.isRequired
};

export default Item;
