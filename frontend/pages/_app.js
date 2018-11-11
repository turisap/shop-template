/**
 * This component is for persisting application's state,
 * especially between pages reloads
 **/

import App, { Container } from 'next/app';
import NProgress from "nprogress";
import { ApolloProvider } from 'react-apollo';
import WithData from '../lib/withData';
import Router from 'next/router';
import Page from '../components/Page';


/**
 * Registration of events on changing routes along with integrating a progress bar
 */
Router.onRouteChangeStart = () => {
    NProgress.start();
};
Router.onRouteChangeComplete = () => {
    NProgress.done();
};
Router.onRouteChangeError = () => {
    NProgress.done();
};


class MyApp extends App {
    static async geInitialProps({Component, ctx}) {
        let pageProps = {};
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        pageProps.query = ctx.query;
        return pageProps
    }

    render() {
        const { Component, apollo, pageProps } = this.props;
        return (
            <ApolloProvider client={apollo}>
                <Container>
                    <Page>
                        <Component {...pageProps}/>
                    </Page>
                </Container>
            </ApolloProvider>
        )
    }
}

export default WithData(MyApp);