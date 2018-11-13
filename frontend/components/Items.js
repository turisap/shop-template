import React, {Component} from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';

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
    query ALL_ITEMS_QUERY {
        items {
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
    render() {
        return (
            <Centre>
                <p>Items</p>
                <Query query={ALL_ITEMS_QUERY}>
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
            </Centre>
        );
    }
}


export default Items;
