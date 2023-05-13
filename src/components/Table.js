import React, { useContext } from 'react';
import MyContextApi from '../context/contextApi';

function Table() {
  const {
    data,
    filters,
  } = useContext(MyContextApi);

  const checkFilterName = ({
    name,
  }) => {
    const nameChecked = new RegExp(`${filters.filterByName.name}`, 'i');
    return nameChecked.test(name);
  };

  const allPlanetsFiltered = (planet) => {
    const quantityFilters = filters.filterByNumericValues.length;
    if (quantityFilters === 0) return true;
    const allPlanetsCheckFilters = [];
    for (let index = 0; index < quantityFilters; index += 1) {
      const { column, comparison, value } = filters.filterByNumericValues[index];
      switch (comparison) {
      case 'maior que':
        allPlanetsCheckFilters.push(+planet[column] > +value);
        break;
      case 'menor que':
        allPlanetsCheckFilters.push(+planet[column] < +value);
        break;
      case 'igual a':
        allPlanetsCheckFilters.push(+planet[column] === +value);
        break;
      default:
        return false;
      }
    }
    return allPlanetsCheckFilters.every((ok) => ok);
  };

  return (
    <main className="main-table">
      <table className="table-table">
        <thead className="thead-table">
          <tr className="tr-table">
            <th>Name</th>
            <th>Population</th>
            <th>Terrain</th>
            <th>Climate</th>
            <th>Diameter</th>
            <th>Gravity</th>
            <th>Orbital Period</th>
            <th>Rotation Period</th>
            <th>Surface Water</th>
            {/* <th>Films</th> */}
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody className="tbody-map">
          { data && data
            .filter((planet) => checkFilterName(planet))
            .filter((planet) => allPlanetsFiltered(planet))
            .map(({
              name,
              population,
              terrain,
              climate,
              diameter,
              gravity,
              orbital_period: orbitalPeriod,
              rotation_period: rotationPeriod,
              surface_water: surfaceWater,
              // films,
              created,
              edited,
              url,
            }, index) => (
              <tr className="tr-map" key={ index + name }>
                <td>{ name }</td>
                <td>{ population }</td>
                <td>{ terrain }</td>
                <td>{ climate }</td>
                <td>{ diameter }</td>
                <td>{ gravity }</td>
                <td>{ orbitalPeriod }</td>
                <td>{ rotationPeriod }</td>
                <td>{ surfaceWater }</td>
                {/* <td>{ films }</td> */}
                <td>{ created }</td>
                <td>{ edited }</td>
                <td>{ url }</td>
              </tr>
            ))}
        </tbody>

      </table>

    </main>
  );
}

export default Table;
