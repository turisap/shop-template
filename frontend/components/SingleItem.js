import React, {Component} from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';
import * as CONFIG from '../config';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY ($id : ID!) {
        item (where : {id : $id}) {
            id
            title
            description
            largeImage
        }
    }
`;

class SingleItem extends Component {
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id : this.props.id}}>
                {({ error, loading, data}) => {
                    if(error) return <ErrorMessage error={error}/>
                    if(loading) return <p>Loading..</p>
                    if(!data.item) return <p>No item was found mate..</p>
                    const {title, largeImage, description } = data.item;
                    return (
                        <SingleItemStyles>
                            <Head>
                                <title>{CONFIG.APPLICATION_NAME} | {title}</title>
                            </Head>
                            <img src={largeImage} alt={title} />
                            <div className="details">
                                <h2>Viewing {title}</h2>
                                <p>{description}</p>
                            </div>
                        </SingleItemStyles>
                    )
                }}
            </Query>
        );
    }
}

SingleItem.propTypes = {};

export default SingleItem;
