import 'react-native-gesture-handler';
import React,{ Component } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo';
import Main from './components/MainComponents';

class RootComponent extends Component {
 render() {
  return (
      <Main />
  )
 }
  
}

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <RootComponent />
    </ApolloProvider>
  );
}
