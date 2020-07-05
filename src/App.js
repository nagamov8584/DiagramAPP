import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Header from './components/header';
import Diagram from './components/chat';
import Footer from './components/footer';

class App extends Component
{
  constructor(props) {
      super(props);
      this.state = { apiResponse: "" };
  }

  callAPI() {
      // fetch("http://localhost:9000/testAPI")
      //     .then(res => res.text())
      //     .then(res => this.setState({ apiResponse: res }));
  }
  componentWillMount() {
      this.callAPI();
  }

  render(){
    return( 
      <div className="App">
        {/* <p className="App-intro">{this.state.apiResponse}</p> */}
        <Header />
        <Diagram />
        <Footer />
      </div>
    );
  };
};
export default App;
