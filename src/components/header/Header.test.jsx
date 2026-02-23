import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

const sectionIds = [
  "about",
  "skills",
  "experience",
  "projects",
  "certifications",
  "interests",
  "contact"
];

describe("Header navigation", () => {
  beforeEach(() => {
    Object.defineProperty(window, "pageYOffset", {
      value: 200,
      writable: true,
      configurable: true
    });
    Object.defineProperty(window, "scrollY", {
      value: 200,
      writable: true,
      configurable: true
    });
  });

  it("smooth-scrolls to the selected section with header offset", async () => {
    render(
      <>
        {sectionIds.map((id) => (
          <section key={id} id={id} data-testid={`section-${id}`} />
        ))}
        <Header isDarkMode={true} toggleDarkMode={jest.fn()} />
      </>
    );

    sectionIds.forEach((id, index) => {
      const top = 400 + index * 100;
      const section = screen.getByTestId(`section-${id}`);
      Object.defineProperty(section, "offsetTop", {
        value: top,
        configurable: true
      });
      section.getBoundingClientRect = () => ({
        x: 0,
        y: top,
        top,
        left: 0,
        bottom: top + 120,
        right: 1200,
        width: 1200,
        height: 120,
        toJSON: () => ({})
      });
    });

    const projectsLink = screen.getByRole("link", { name: "Projects" });
    await userEvent.click(projectsLink);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 820,
      behavior: "smooth"
    });
  });

  it("closes mobile menu with Escape and returns focus to toggle button", async () => {
    render(<Header isDarkMode={true} toggleDarkMode={jest.fn()} />);

    const toggleMenuButton = screen.getByRole("button", { name: /toggle menu/i });
    await userEvent.click(toggleMenuButton);

    expect(screen.getByRole("dialog", { name: /mobile navigation menu/i })).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("dialog", { name: /mobile navigation menu/i })).not.toBeInTheDocument();
    expect(toggleMenuButton).toHaveFocus();
  });
});
