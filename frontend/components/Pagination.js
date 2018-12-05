import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import * as CONFIG from '../config';
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
        {({data, loading, error}) =>   {
            if (loading) return <p>Loading..</p>;
            if (error) return <p>{error}</p>;
            const count = data.itemsConnection.aggregate.count;
            const numberOfPages = Math.ceil( count / CONFIG.PERPAGE);
            return (
                <PaginationStyles>
                    <Head>
                        <title>{CONFIG.APPLICATION_NAME} - Page {props.page} of {numberOfPages}</title>
                    </Head>
                    <Link
                        prefetch
                        href={{
                            pathname : 'items',
                            query : { page : props.page - 1}
                        }}
                    >
                        <a aria-disabled={props.page <= 1}>Prev</a>
                    </Link>
                    <p>Page {props.page} of {numberOfPages}</p>
                    <p>Total items : {count}</p>
                    <Link
                        prefetch
                        href={{
                            pathname : 'items',
                            query : { page : props.page + 1}
                        }}
                    >
                        <a aria-disabled={props.page >= numberOfPages}>Next</a>
                    </Link>
                </PaginationStyles>
            )
        }}
    </Query>
);

export default Pagination;