import 'react-native-gesture-handler';
import React,{ Component } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apollo';
import Main from './components/MainComponents';
import { Provider } from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Loading } from './components/LoadingComponent';

const {persistor,store} = ConfigureStore()

class RootComponent extends Component {
 render() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />}
      persistor={persistor}>
        <Main />
      </PersistGate>

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
