import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import MyContextApi from './contextApi';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
  });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://swapi.dev/api/planets');
      const dataResponse = await response.json();
      const planetsWithoutResidents = dataResponse.results.map((planet) => {
        const { residents, ...starWarPlanet } = planet;
        return starWarPlanet;
      });
      act(() => {
        setData(planetsWithoutResidents);
      });
    }
    fetchData();
  }, []);

  const valueContext = {
    data,
    filters,
    setFilters,
  };

  return (
    <MyContextApi.Provider value={ valueContext }>
      { children }
    </MyContextApi.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
}.isRequired;

export default Provider;
