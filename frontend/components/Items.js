import React, {Component} from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import * as CONFIG from '../config';

const Centre = styled.div`
    text-align: center;
`;

const ItemList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 60px;
    max-width: ${props => props.theme.maxWidth}
    margin: 0 auto;
`;

const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip : Int = 0, $first : Int = ${CONFIG.PERPAGE}) {
        items(first : $first, skip : $skip, orderBy : createdAt_DESC) {
            id
            title
            price
            description
            image
            largeImage
        }        
    }
`;


class Items extends Component {

    /**
     * Gets the number of items to skip for pagination
     * @returns {number}
     */
    itemsToSkip = () => (
        this.props.page * CONFIG.PERPAGE - CONFIG.PERPAGE
    )

    render() {
        return (
            <Centre>
                <Pagination  page={this.props.page}/>
                <Query query={ALL_ITEMS_QUERY} variables={{skip : this.itemsToSkip(), first : CONFIG.PERPAGE}}>
                    {payload => {
                            const {data, error, loading} = payload;
                            if (loading) return <p>Loading...</p>;
                            if (error) return <p>Error: {error}</p>;
                            return  <ItemList>
                                        {data.items.map(item => <Item item={item} key={item.id}/>)}
                                    </ItemList>
                        }
                    }
                </Query>
                <Pagination  page={this.props.page}/>
            </Centre>
        );
    }
}


export default Items;
export { ALL_ITEMS_QUERY };
