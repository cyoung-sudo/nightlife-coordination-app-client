import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import Settings from "../Settings";
// APIs
import * as authAPI from "../../../apis/authAPI";
import * as userAPI from "../../../apis/userAPI";
import * as userSearchAPI from "../../../apis/userSearchAPI";
import * as userBusinessAPI from "../../../apis/userBusinessAPI";

// Mocks
jest.mock("../../../apis/authAPI");
jest.mock("../../../apis/userAPI");
jest.mock("../../../apis/userSearchAPI");
jest.mock("../../../apis/userBusinessAPI");

describe("----- <Settings/> -----", () => {
  beforeEach(() => {
    // Mock API functions (useEffect API calls)
    authAPI.getUser.mockResolvedValue({
      data: {
        success: true,
        user: {}
      }
    });
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly checks authentication on load", async () => {
    render(
      <BrowserRouter>
        <Settings/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(authAPI.getUser).toHaveBeenCalled();
    });
  });

  //----- Test 2 -----
  it("correctly deletes user account", async () => {
    // Mock API functions
    userSearchAPI.deleteForUser.mockResolvedValue({
      data: { success: true }
    });

    userBusinessAPI.deleteForUser.mockResolvedValue({
      data: { success: true }
    });

    userAPI.deleteUser.mockResolvedValue({
      data: { success: true }
    });

    authAPI.logout.mockResolvedValue({
      data: { success: true }
    });

    // Mock props
    const mockHandlePopup = jest.fn();
    const mockHandleExpiredSession = jest.fn();

    // Other mocks
    window.confirm = jest.fn(() => true);

    render(
      <BrowserRouter>
        <Settings
          handlePopup={mockHandlePopup}
          handleExpiredSession={mockHandleExpiredSession}/>
      </BrowserRouter>
    );

    // Wait for data to load
    await waitFor(() => expect(screen.queryByTestId("settings-delete")).toBeInTheDocument());

    userEvent.click(screen.getByTestId("settings-delete"));

    await waitFor(() => {
      expect(mockHandlePopup).toHaveBeenCalledWith("Deleted account", "success");
      expect(mockHandleExpiredSession).toHaveBeenCalled();
    });
  })
});
