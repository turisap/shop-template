/**
 * All meta data including third-parties CSS, favicons, charset, viewport and default title
 */

import Head from 'next/head';
import * as config from '../config';

const Meta = () => (
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/static/favicon.png" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <title>{config.applicationName}</title>
    </Head>
);

export default Meta;