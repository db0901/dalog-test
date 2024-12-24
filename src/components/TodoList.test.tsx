import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test/utils";
import TodoList from "./TodoList";

describe("TodoList", () => {
  it("shows loading skeleton initially", () => {
    renderWithProviders(<TodoList />);
    expect(screen.getByTestId("loading-skeleton")).toBeInTheDocument();
  });
});
