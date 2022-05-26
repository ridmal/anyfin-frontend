import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Config from './config';

export const apolloClient = new ApolloClient({
  uri: Config.graphQLServer,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={Config.authProviderDomain}
      clientId={Config.authProviderClientId}
      redirectUri={window.location.origin}
      audience={Config.authProviderAudience}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
