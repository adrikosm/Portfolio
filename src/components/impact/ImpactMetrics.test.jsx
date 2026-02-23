import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImpactMetrics from "./ImpactMetrics";

describe("Impact metric disclosure", () => {
  it("renders an accessible details disclosure for metric provenance", async () => {
    render(<ImpactMetrics />);

    const disclosureDetails = screen.getByTestId("impact-details-cost_reduction");
    const disclosureButton = within(disclosureDetails).getByLabelText(/more context for snowflake cost reduction/i);
    expect(disclosureDetails).not.toHaveAttribute("open");

    await userEvent.click(disclosureButton);

    expect(disclosureDetails).toHaveAttribute("open");
  });
});
