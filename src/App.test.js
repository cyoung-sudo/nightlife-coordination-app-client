import { render, cleanup, waitFor } from "@testing-library/react";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import App from "./App";
// APIs
import * as authAPI from "./apis/authAPI";

// Mocks
jest.mock("./apis/authAPI");

describe("----- <App/> -----", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("checks user authentication on load", async () => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: {
        success: true,
        user: {}
      }
    });

    render(
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    );

    await waitFor(() => expect(authAPI.getUser).toHaveBeenCalled());
  });
});
