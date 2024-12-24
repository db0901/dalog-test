import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test/utils";
import CreateTodo from "./CreateTodo";

describe("CreateTodo", () => {
  it("disables submit button when input is empty", () => {
    renderWithProviders(<CreateTodo />);
    const submitButton = screen.getByText("Add");
    expect(submitButton).toBeDisabled();
  });

  it("enables submit button when input has value", async () => {
    renderWithProviders(<CreateTodo />);
    const input = screen.getByLabelText("New Todo");
    await userEvent.type(input, "New Todo Item - From Testing");
    const submitButton = screen.getByText("Add");
    expect(submitButton).toBeEnabled();
  });

  it("clears input after successful submission", async () => {
    renderWithProviders(<CreateTodo />);
    const input = screen.getByLabelText("New Todo");
    await userEvent.type(input, "New Todo Item");
    await userEvent.click(screen.getByText("Add"));
    expect(input).toHaveValue("");
  });
});
