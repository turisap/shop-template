/**
 * This component is for rendering other components which are needed at every page
 * as Header or NavBar
 */

import React, {Component} from 'react';
import styled, {ThemeProvider, injectGlobal} from 'styled-components';
import Header from './Header';
import Meta from './Meta';



/**
 * Theme object for styled components
 */
const theme = {
    red: '#FF0000',
    black: '#393939',
    grey: '#3A3A3A',
    lightgrey: '#E1E1E1',
    offWhite: '#EDEDED',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};



/**
 * Global styles (all resets, fonts, etc)
 */
injectGlobal`
    @font-face {
        font-family: radnika-next;
        src: url('/static/radnikanext-medium-webfont.woff2');
        format: ('woff2');
        font-weight: normal;
        font-style: normal;
    }
    html {
        font-family: radnika-next;
        box-sizing: border-box;
        font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        padding: 0px;
        margin: 0px;
        font-size: 1.5rem;
        line-height: 2;
    }
    a {
        text-decoration: none;
        color: ${theme.black};
    }
`;



const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    padding: 2rem;
    margin: 0 auto;
    max-width: ${props => props.theme.maxWidth};
`;



class Page extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta/>
                    <Header/>
                    <Inner>{this.props.children}</Inner>
                </StyledPage>
            </ThemeProvider>
        );
    }
}


export default Page;
