import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../../pages/index";

describe("Homepage", () => {
  it("renders the title", () => {
    render(<HomePage />);
    const titleElement = screen.getByText("MediCheck");
    expect(titleElement).toBeInTheDocument();
  });
});
