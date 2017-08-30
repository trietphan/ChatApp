// client/src/app.js
import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { PricingCard } from 'react-native-elements';

import { ApolloProvider } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8008/graphql',
});

const client = new ApolloClient({
  networkInterface,
});

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  {},
  composeWithDevTools(
    applyMiddleware(client.middleware()),
  ),
);

export default class App extends Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <View>
          <PricingCard
            color="#4f9deb"
            title="Free"
            price="$0"
            info={['1 User', 'Basic Support', 'All Core Features']}
            button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
          />
        </View>
      </ApolloProvider>
    );
  }
}
