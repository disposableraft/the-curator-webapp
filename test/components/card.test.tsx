import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Card from "../../components/card";
import searchData from "../data/search-result.json";

describe("Card", () => {
  it("renders a card with a name and image", async () => {
    render(<Card searchResult={searchData} name="Helen Frankenthaler" />);
    await waitFor(() => {
      const card = screen.getByTestId("test-card");
      expect(card).toHaveTextContent("Helen Frankenthaler");
      expect(card).toHaveAttribute(
        "style",
        `background-image: url(https://example.com/first.jpg);`
      );
    });
  });

  it("onClick a new image is loaded", async () => {
    render(<Card searchResult={searchData} name="Helen_Frankenthaler" />);
    const card = await screen.findByTestId("test-card");
    fireEvent.click(card);
    const updatedCard = await screen.findByTestId("test-card");
    expect(card).toHaveAttribute(
      "style",
      `background-image: url(https://example.com/second.jpg);`
    );
  });
});
