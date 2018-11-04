/**
 * This component is for persisting application's state,
 * especially between pages reloads
 **/

import App, { Container } from 'next/app';
import NProgress from "nprogress";
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
    render() {
        const { Component } = this.props;
        return (
            <Container>
                <Page>
                    <Component/>
                </Page>
            </Container>
        )
    }
}

export default MyApp;