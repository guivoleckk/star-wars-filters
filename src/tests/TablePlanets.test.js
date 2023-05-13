import App from "../App";
import { render, screen, waitFor } from "@testing-library/react";

describe("Testando a table separadamente", () => {
  test("verifica se a tabela é renderizada corretamente", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("table")).toBeInTheDocument();
      
    });
  });   
});