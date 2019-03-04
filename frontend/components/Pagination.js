import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import { CONFIG } from '../config';
import PropTypes from 'prop-types';
import PaginationStyles from './styles/PaginationStyles';

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`;

const Pagination = props => (
    <Query query={PAGINATION_QUERY}>
        {({data, loading, error}) => {
            const items = data.itemsConnection.aggregate.count;
            const pages = Math.ceil( items / CONFIG.ITEMS_PER_PAGE);
            const page = props.page;
            return (
                <PaginationStyles>
                    <Head>
                        <title>{CONFIG.SHOP_NAME} - Page {page} of {pages}</title>
                    </Head>
                    <Link
                    prefetch
                    href={{
                        pathname : 'items',
                        query : { page : page - 1}
                    }}
                    >
                        <a aria-disabled={page <= 1}>Prev</a>
                    </Link>
                    <p>Page {props.page} of {pages}</p>
                    <p>Items  total : {items}</p>
                    <Link
                        prefetch
                        href={{
                            pathname : 'items',
                            query : { page : page + 1}
                        }}
                    >
                        <a aria-disabled={page >= pages}>Next</a>
                    </Link>
                </PaginationStyles>
            )
        }}
    </Query>
);

Pagination.propTypes = {
    page : PropTypes.number.isRequired
}

export default Pagination;