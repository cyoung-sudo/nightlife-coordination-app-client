import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import Signup from "../Signup";
// APIs
import * as authAPI from "../../../apis/authAPI";

// Mocks
jest.mock("../../../apis/authAPI");

describe("----- <Signup/> -----", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly submits form data", async () => {
    // Mock API functions
    authAPI.signup.mockResolvedValue({
      data: { success: true }
    });

    // Mock props
    const mockHandlePopup = jest.fn();

    render(
      <BrowserRouter>
        <Signup handlePopup={mockHandlePopup}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("authForm-username"), "User1");
    userEvent.type(screen.getByTestId("authForm-password"), "Pass1");
    userEvent.click(screen.getByTestId("authForm-submit"));
    
    await waitFor(() => {
      expect(authAPI.signup).toHaveBeenCalledWith("User1", "Pass1");
      expect(mockHandlePopup).toHaveBeenCalledWith("Account created", "success");
    });
  }),

  //----- Test 2 -----
  it("correctly handles empty username field", async () => {
    // Mock props
    const mockHandlePopup = jest.fn();

    render(
      <BrowserRouter>
        <Signup
          handlePopup={mockHandlePopup}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("authForm-password"), "Pass1");
    userEvent.click(screen.getByTestId("authForm-submit"));
    
    await waitFor(() => {
      expect(authAPI.signup).not.toHaveBeenCalled();
      expect(mockHandlePopup).toHaveBeenCalledWith("No username given", "error");
    });
  }),

  //----- Test 3 -----
  it("correctly handles empty password field", async () => {
    // Mock props
    const mockHandlePopup = jest.fn();

    render(
      <BrowserRouter>
        <Signup
          handlePopup={mockHandlePopup}/>
      </BrowserRouter>
    );

    userEvent.type(screen.getByTestId("authForm-username"), "User1");
    userEvent.click(screen.getByTestId("authForm-submit"));
    
    await waitFor(() => {
      expect(authAPI.signup).not.toHaveBeenCalled();
      expect(mockHandlePopup).toHaveBeenCalledWith("No password given", "error");
    });
  })
});
