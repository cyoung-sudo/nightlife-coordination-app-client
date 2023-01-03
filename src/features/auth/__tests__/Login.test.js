import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import Login from "../Login";
// APIs
import * as authAPI from "../../../apis/authAPI";

// Mocks
jest.mock("../../../apis/authAPI");

describe("----- <Login/> -----", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly submits form data", async () => {
    // Mock API functions
    authAPI.login.mockResolvedValue({
      data: {
        success: true,
        user: {}
      }
    });

    // Mock props
    const mockSetUser = jest.fn();
    const mockHandlePopup = jest.fn();

    render(
      <BrowserRouter>
        <Login
          setUser={mockSetUser}
          handlePopup={mockHandlePopup}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("authForm-username"), "User1");
    userEvent.type(screen.getByTestId("authForm-password"), "Pass1");
    userEvent.click(screen.getByTestId("authForm-submit"));

    await waitFor(() => {
      expect(authAPI.login).toHaveBeenCalledWith("User1", "Pass1");
      expect(mockSetUser).toHaveBeenCalledWith({});
      expect(mockHandlePopup).toHaveBeenCalledWith("Successfully logged-in", "success");
    });
  });

  //----- Test 2 -----
  it("correctly handles empty username field", async () => {
    // Mock props
    const mockHandlePopup = jest.fn();

    render(
      <BrowserRouter>
        <Login handlePopup={mockHandlePopup}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("authForm-password"), "Pass1");
    userEvent.click(screen.getByTestId("authForm-submit"));
    
    await waitFor(() => {
      expect(authAPI.login).not.toHaveBeenCalled();
      expect(mockHandlePopup).toHaveBeenCalledWith("No username given", "error");
    });
  });

  //----- Test 3 -----
  it("correctly handles empty password field", async () => {
    // Mock props
    const mockHandlePopup = jest.fn();

    render(
      <BrowserRouter>
        <Login handlePopup={mockHandlePopup}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("authForm-username"), "User1");
    userEvent.click(screen.getByTestId("authForm-submit"));
    
    await waitFor(() => {
      expect(authAPI.login).not.toHaveBeenCalled();
      expect(mockHandlePopup).toHaveBeenCalledWith("No password given", "error");
    });
  });
});
