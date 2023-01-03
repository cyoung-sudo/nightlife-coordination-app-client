import { render, screen, cleanup, waitFor } from "@testing-library/react";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import AllUsers from "../AllUsers";
// APIs
import * as userAPI from "../../../apis/userAPI";

// Mocks
jest.mock("../../../apis/userAPI");
window.scrollTo = jest.fn();

describe("----- <AllUsers/> -----", () => {
  beforeEach(() => {
    // Mock API functions (useEffect API calls)
    userAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        users: [
          {
            _id: "000",
            username: "bob",
            password: "12345",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            _id: "111",
            username: "bill",
            password: "12345",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
      }
    });
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly displays users", async () => {
    render(
      <BrowserRouter>
        <AllUsers/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("userDisplay-user")).toHaveLength(2);
      expect(screen.getByText("bob")).toBeInTheDocument();
      expect(screen.getByText("bill")).toBeInTheDocument();
    });
  })
});
