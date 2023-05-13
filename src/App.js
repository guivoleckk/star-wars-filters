import React from 'react';
import './App.css';
import FormFilters from './components/FormFilters';
import Table from './components/Table';
import Provider from './context/contextProvider';

function App() {
  return (
    <Provider>
      <FormFilters />
      <Table />
    </Provider>
  );
}

export default App;
