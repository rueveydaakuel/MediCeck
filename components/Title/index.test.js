import Title from ".";
import { render, screen } from "@testing-library/react";

test("test", () => {
  render(<Title>MediCheck</Title>);
  const element = screen.getByText("MediCheck");
  expect(element).toBeInTheDocument();
});
