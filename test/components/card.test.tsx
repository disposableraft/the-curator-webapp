import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Card from "../../components/card";

describe("Card", () => {
  it("renders a card with a name and image", async () => {
    render(<Card artist="Helen Frankenthaler" />);
    await waitFor(() => {
      const card = screen.getByTestId("test-card");
      expect(card).toHaveTextContent("Helen Frankenthaler");
      expect(card).toHaveAttribute(
        "style",
        `background-image: url(https://example.com/first.jpg);`
      );
    });
  });

  it("handles a quota error", async () => {
    render(<Card artist="quota_error" />);
    const card = await screen.findByTestId("test-card");
    expect(card).toHaveAttribute(
      "style",
      `background-image: url(http://example.com/missing.jpg);`
    );
    const heading = await screen.findByRole("heading");
    expect(heading).toHaveTextContent(/resource_exhausted/gi);
  });

  it("onClick a new image is loaded", async () => {
    render(<Card artist="Helen_Frankenthaler" />);
    const card = await screen.findByTestId("test-card");
    fireEvent.click(card);
    const updatedCard = await screen.findByTestId("test-card");
    expect(card).toHaveAttribute(
      "style",
      `background-image: url(https://example.com/second.jpg);`
    );
  });
});
