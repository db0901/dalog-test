import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../test/utils";
import TodoItem from "./TodoItem";

const mockTodo = {
  id: 1,
  title: "Test Todo",
  status: "Todo" as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("TodoItem", () => {
  it("renders todo item correctly", () => {
    renderWithProviders(<TodoItem todo={mockTodo} />);
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
  });

  it("enters edit mode when edit button is clicked", async () => {
    renderWithProviders(<TodoItem todo={mockTodo} />);
    const editButton = screen.getByLabelText("Edit todo");
    await userEvent.click(editButton);
    expect(screen.getByLabelText("Edit todo title input")).toBeInTheDocument();
  });

  it("shows approval dialog when changing status to Done", async () => {
    renderWithProviders(<TodoItem todo={mockTodo} />);

    const select = screen.getByRole("combobox");
    await userEvent.click(select);

    await waitFor(() => {
      expect(
        document.querySelector('[role="presentation"]')
      ).toBeInTheDocument();
    });

    const doneOption = screen.getByRole("option", { name: "Done" });
    await userEvent.click(doneOption);

    expect(screen.getByText(/Are you sure/)).toBeInTheDocument();
  });
});
