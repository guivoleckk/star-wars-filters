import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Testando se os elementos são renderizados e existem na tela inicial', () => {
  beforeEach(() => {
    render(<App />)
  })
    test('testando a existência do input de name', () => {
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
  })
  test('Verifica a existência do column filter',() => {
    expect(screen.getByTestId('column-filter')).toBeInTheDocument()
    expect(screen.getByTestId('column-filter')).toHaveValue('population');
    screen.getByTestId('column-filter').childNodes.forEach((options) => {
      expect(options).toHaveTextContent(/population|orbital_period|diameter|rotation_period|surface_water/);
    });
})

test('Verifica o comparison filter',() => {
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument()
})

test('Verifica se o filtro numérico é renderizado',() => {
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument()
    expect(screen.getByTestId('comparison-filter')).toHaveValue('maior que');
    screen.getByTestId('comparison-filter').childNodes.forEach((options) => {
      expect(options).toHaveTextContent(/maior que|menor que|igual a/);
    });
})

test('Verifica se o botão FILTRAR é renderizado',() => {
    expect(screen.getByTestId('button-filter')).toBeInTheDocument()
})
})