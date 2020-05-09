import React from 'react';
import './App.css';
import Dictaphone from './Dictaphone';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div>react-speech</div>
      <Dictaphone />
    </div>
  );
};

export default App;
