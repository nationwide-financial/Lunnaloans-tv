import React from 'react';
import { AppProps } from 'next/app';
import Navbar from '../components/layout/Navbar';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
