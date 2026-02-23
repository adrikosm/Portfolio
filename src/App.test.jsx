import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App theme toggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("persists light theme when toggled from default dark mode", async () => {
    render(<App />);

    expect(screen.getByRole("link", { name: /skip to main content/i })).toHaveAttribute("href", "#main-content");

    const toggleThemeButton = screen.getByRole("button", { name: /toggle theme/i });
    await userEvent.click(toggleThemeButton);

    await waitFor(() => expect(localStorage.getItem("theme")).toBe("light"));
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });
});
