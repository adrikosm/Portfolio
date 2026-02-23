import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Contact from "./Contact";

describe("Contact form validation", () => {
  it("shows required-field errors when submitting an empty form", async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const subjectInput = screen.getByLabelText("Subject");
    const messageInput = screen.getByLabelText("Message");

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(subjectInput).toBeRequired();
    expect(messageInput).toBeRequired();

    const submitButton = screen.getByRole("button", { name: /send message/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Subject is required")).toBeInTheDocument();
    expect(screen.getByText("Message is required")).toBeInTheDocument();
    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(emailInput).toHaveAttribute("aria-invalid", "true");
    expect(subjectInput).toHaveAttribute("aria-invalid", "true");
    expect(messageInput).toHaveAttribute("aria-invalid", "true");
  });
});
