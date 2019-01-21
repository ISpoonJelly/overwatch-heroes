import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Heroes from './components/Heroes';
import HeroDetails from './components/HeroDetails';
import NavBar from './components/NavBar';
import Logo from './assets/Logo.png';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="Application">
            <NavBar />
            <Route />
            <img
              className="main-logo"
              src={Logo}
              alt="overwatch"
              style={{ width: 300, display: 'block', margin: 'auto', 'margin-top': 30 }}
            />
            <Route exact path='/' component={Heroes} />
            <Route exact path='/hero/:heroId' component={HeroDetails}/>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
