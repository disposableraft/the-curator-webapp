import { render, screen, waitFor } from "@testing-library/react";
import Card from "../../components/card";
import { fetchImages } from "../../lib/fetch-images";
import mockData from "../api/post-mock-data.json";

jest.mock("../../lib/fetch-images");

describe("Card", () => {
  it("renders a card with a name and image", async () => {
    fetchImages.mockImplementation(() => {
      return Promise.resolve(mockData.items[0]);
    });
    render(<Card artist="foo name" />);

    const card = await screen.findByTestId("test-card");
    expect(card).toHaveTextContent("foo name");
    expect(card).toHaveAttribute(
      "style",
      `background-image: url(${mockData.items[0].link});`
    );
  });

  it("displays an error", async () => {
    fetchImages.mockImplementation(() => {
      return Promise.reject("Error retrieving image.");
    });
    render(<Card artist="nope" />);
    const card = await screen.findByTestId("test-card");
    expect(card).toHaveTextContent("Error retrieving image.");
  });
});
