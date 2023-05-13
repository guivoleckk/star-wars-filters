import React, { useState, useContext } from 'react';
import MyContextApi from '../context/contextApi';
import ControlFilters from './ControlFilters';

function NumberChoosed() {
  const {
    filters,
    filters: { filterByNumericValues },
    setFilters,
  } = useContext(MyContextApi);

  const [numericValue, setNumericValue] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = ({ target }) => setNumericValue({
    ...numericValue, [target.name]: target.value,
  });

  const getPossibleColumnOptions = () => {
    const allOptions = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water'];
    const selectedOptions = filterByNumericValues.map((filter) => filter.column);
    return allOptions.filter((option) => !selectedOptions.includes(option));
  };

  const handleButton = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filterByNumericValues, numericValue,
      ],
    });
    setNumericValue({
      column: getPossibleColumnOptions()[0],
      comparison: 'maior que',
      value: 0,
    });
  };

  return (
    <div className="div-select-input">
      <select
        name="column"
        onChange={ (e) => handleChange(e) }
        data-testid="column-filter"
        className="select-column"
      >
        {
          getPossibleColumnOptions().map((option) => (
            <option
              className="option-select-column"
              key={ option }
              value={ option }
            >
              { option }
            </option>
          ))
        }
      </select>
      <select
        className="select-comparison"
        name="comparison"
        onChange={ (e) => handleChange(e) }
        data-testid="comparison-filter"
      >
        <option className="op-comparison" value="maior que">maior que</option>
        <option className="op-comparison" value="menor que">menor que</option>
        <option className="op-comparison" value="igual a">igual a</option>
      </select>
      <input
        className="input-value"
        type="number"
        name="value"
        value={ numericValue.value }
        onChange={ (e) => handleChange(e) }
        data-testid="value-filter"
      />
      <button
        className="button-filter"
        type="button"
        onClick={ handleButton }
        data-testid="button-filter"
      >
        Filtrar
      </button>
      <ControlFilters />
    </div>
  );
}

export default NumberChoosed;
