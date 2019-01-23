import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Overwatch from './components/Overwatch';
import HeroDetails from './components/HeroDetails';
import NavBar from './components/NavBar';
import Logo from './assets/Logo.png';

import { MainLogo, CenterDiv } from './styling/app';

const client = new ApolloClient({ uri: '/graphql' });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="Application">
            <NavBar />
            <img
              className="main-logo"
              src={Logo}
              alt="overwatch"
              style={{ ...MainLogo, ...CenterDiv }}
            />
            <Route exact path="/" component={Overwatch} />
            <Route exact path="/hero/:heroId" component={HeroDetails} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
