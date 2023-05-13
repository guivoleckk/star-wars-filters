import React, { useContext } from 'react';
import MyContextApi from '../context/contextApi';

function NameSearch() {
  const {
    filters,
    setFilters,
  } = useContext(MyContextApi);

  return (
    <div className="div-name-search">
      <div>
        <h1>Star Wars Filters</h1>
      </div>
      <input
        className="name-search"
        type="text"
        name="name"
        value={ filters.filterByName.name }
        onChange={ ({ target }) => setFilters({
          ...filters, filterByName: { [target.name]: target.value },
        }) }
        data-testid="name-filter"
      />
    </div>
  );
}

export default NameSearch;
