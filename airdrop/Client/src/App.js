import React, { Component } from 'react';
import Main from './components/main';
import './App.css';

import { Layout, Content } from 'react-mdl';
class App extends Component {
  render() {
    return (
      <div className="demo-big-content">
          <Layout>
              <Content>
                  <div className="page-content" />
                  <Main />
              </Content>
          </Layout>
      </div>
    );
  }
}

export default App;

