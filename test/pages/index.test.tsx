import Home from "../../pages/index";
import { render } from "@testing-library/react";

describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home data={['a', 'b']} />);
  });
});
