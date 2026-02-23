import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Projects from "./Projects";

describe("Projects modal interactions", () => {
  it("opens and closes the project dialog with keyboard support", async () => {
    render(<Projects />);

    const firstProjectTrigger = screen.getByRole("button", {
      name: /open details for enterprise data warehouse platform/i
    });
    await userEvent.click(firstProjectTrigger);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe("");
    expect(firstProjectTrigger).toHaveFocus();
  });
});
