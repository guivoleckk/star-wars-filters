import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { mockData } from "./mock/mockData";

describe("Testando renderização filtros", () => {
  beforeEach(async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("verifica se tem filtro depois de clicar", () => {
    render(<App />);
    expect(screen.getByTestId("button-filter")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("button-filter"));
    expect(screen.getByText(/population maior que 0/i)).toBeInTheDocument();
  });
  test("verifica se funciona com mais de um", () => {
    render(<App />);
    expect(screen.getByTestId("button-filter")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("button-filter"));
    expect(screen.getByText(/population maior que 0/i)).toBeInTheDocument();
  });
  test("Verifica se filtra por nome", async () => {
    render(<App />);
    userEvent.type(screen.getByTestId("name-filter"), "a");
    userEvent.click(screen.getByTestId("button-filter"));
  });
  test("filtro por comparação", async () => {
    render(<App />);
    userEvent.type(screen.getByTestId("value-filter"), 3000);
    userEvent.selectOptions(screen.getByTestId("column-filter"), "population");
    userEvent.selectOptions( screen.getByTestId("comparison-filter"), "menor que" );
    userEvent.click(screen.getByTestId("button-filter"));
    userEvent.selectOptions(
      screen.getByTestId("column-filter"),
      "orbital_period"
    );
    userEvent.selectOptions(
      screen.getByTestId("comparison-filter"),
      "maior que"
    );
    userEvent.click(screen.getByTestId("button-filter"));
    userEvent.clear(screen.getByTestId("value-filter"));
    userEvent.selectOptions(
      screen.getByTestId("column-filter"),
      "surface_water"
    );
    userEvent.selectOptions(screen.getByTestId("comparison-filter"), "igual a");
    userEvent.type(screen.getByTestId("value-filter"), 1);
    userEvent.click(screen.getByTestId("button-filter"));
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
  });
  test('',async() => {
    render(<App />);
    userEvent.selectOptions(screen.getByTestId("column-filter"), "surface_water");
    userEvent.selectOptions( screen.getByTestId("comparison-filter"), "igual a" );
    userEvent.type(screen.getByTestId("value-filter"), 1);
    userEvent.click(screen.getByTestId("button-filter"));
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
  })
  test('', async() => {
    render(<App />);
    userEvent.selectOptions(screen.getByTestId("column-filter"), "diameter");
    userEvent.selectOptions( screen.getByTestId("comparison-filter"), "maior que" );
    userEvent.type(screen.getByTestId("value-filter"), 1);
    userEvent.click(screen.getByTestId("button-filter"));
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
  })
  test("Verifica se renderiza o botão de remover apenas um filtro", () => {
    render(<App />);
    userEvent.type(screen.getByTestId("value-filter"), 3000);
    userEvent.selectOptions(screen.getByTestId("column-filter"), "population");
    userEvent.selectOptions(screen.getByTestId("comparison-filter"),"menor que" );
    userEvent.selectOptions(screen.getByTestId("column-filter"), "population");
    userEvent.selectOptions(screen.getByTestId("comparison-filter"),"maior que" );
    userEvent.selectOptions(screen.getByTestId("column-filter"), "population");
    userEvent.selectOptions(screen.getByTestId("comparison-filter"),"igual a" );
    userEvent.click(screen.getByTestId('button-filter'))
    userEvent.selectOptions(screen.getByTestId("column-filter"), "diameter");
    userEvent.selectOptions(screen.getByTestId("comparison-filter"),"maior que" );
    userEvent.click(screen.getByTestId('button-filter'))
    userEvent.selectOptions(screen.getByTestId("column-filter"), "orbital_period");
    userEvent.selectOptions(screen.getByTestId("comparison-filter"),"igual a" );
    userEvent.click(screen.getByTestId('button-filter'))
    expect(screen.getAllByRole("button", { name: /x/i })[0]).toBeInTheDocument();
     userEvent.click(screen.getAllByRole("button", { name: /x/i })[0])    
     userEvent.click(screen.getAllByRole("button", { name: /x/i })[1])    

  });
  test('verifica funcionalidade da remoção de todos os filtros',() => {
    render(<App />);
    userEvent.type(screen.getByTestId("value-filter"), 3000);
    userEvent.selectOptions(screen.getByTestId("column-filter"), "population");
    userEvent.selectOptions( screen.getByTestId("comparison-filter"),"maior que" );
    userEvent.click(screen.getByTestId('button-filter'))
    const buttonRemove = screen.getByTestId('button-remove-filters')
    expect(screen.getByRole('heading', { name: /population maior que 0/i })).toBeInTheDocument()
    userEvent.click(buttonRemove)   
  })
});