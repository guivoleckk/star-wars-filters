import React, { useContext } from 'react';
import MyContextApi from '../context/contextApi';

function ControlFilters() {
  const {
    filters,
    filters: { filterByNumericValues },
    setFilters,
  } = useContext(MyContextApi);

  const handleDelete = (column) => {
    setFilters({
      ...filters,
      filterByNumericValues: filterByNumericValues
        .filter((option) => option.column !== column),
    });
    if (column === 'remove-all') {
      setFilters({
        ...filters,
        filterByNumericValues: [],
      });
    }
  };

  return (
    <div className="div-button-delete">
      { filterByNumericValues
        && filterByNumericValues.map(({ column, comparison, value }, index) => (
          <h3 key={ index } data-testid="filter">
            { `${column} ${comparison} ${value}` }
            <button
              className="button-one-delete"
              type="button"
              onClick={ () => handleDelete(column) }
            >
              X
            </button>
          </h3>
        )) }
      { filterByNumericValues.length > 0 && (
        <h2>
          Remover todos os filtros
          <button
            type="button"
            className="button-multiple-delete"
            onClick={ () => handleDelete('remove-all') }
            data-testid="button-remove-filters"
          >
            X
          </button>
        </h2>
      ) }
    </div>
  );
}

export default ControlFilters;
