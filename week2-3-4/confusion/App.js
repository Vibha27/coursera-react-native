import 'react-native-gesture-handler';
import React,{ Component } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo';
import Main from './components/MainComponents';
import { Provider } from 'react-redux';
import {ConfigureStore} from './redux/configureStore';

const store = ConfigureStore()

class RootComponent extends Component {
 render() {
  return (
    <Provider store={store}>
        <Main />

    </Provider>
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
