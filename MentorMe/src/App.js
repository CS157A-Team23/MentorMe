import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';

//function App() {
//   return (
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload. I made a change.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>
//     <Router>
//     <Route path="/Login" component={Login} />
//   </Router>
//   );
// }



//export default App;

class App extends Component {
  state = {
      data: null
    };


render() {
  return (
    <Router>
      <Route path="/Login" component={Login} />
    </Router>
    
  );
}
}

export default App;
