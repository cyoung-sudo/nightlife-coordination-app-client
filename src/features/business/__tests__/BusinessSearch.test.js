import { render, screen, cleanup, waitFor, waitForElement, getAllByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import BusinessSearch from "../BusinessSearch";
// APIs
import * as businessAPI from "../../../apis/businessAPI";
import * as authAPI from "../../../apis/authAPI";
import * as userBusinessAPI from "../../../apis/userBusinessAPI";
import * as userSearchAPI from "../../../apis/userSearchAPI";

// Mocks
jest.mock("../../../apis/businessAPI");
jest.mock("../../../apis/authAPI");
jest.mock("../../../apis/userBusinessAPI");
jest.mock("../../../apis/userSearchAPI");
window.scrollTo = jest.fn();

describe("----- <BusinessSearch/> -----", () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("displays businesses for existing user-search on load", async () => {
    // Mock API function
    userSearchAPI.getForUser.mockResolvedValue({
      data: {
        success: true,
        userSearch: {
          userId: "000",
          term: "sushi",
          location: "nyc",
          price: 1,
          open: true
        }
      }
    });

    businessAPI.search.mockResolvedValue({
      data: {
        success: true,
        businesses: [
          {
            id: "000",
            name: "Business1",
            url: "",
            image_url: "",
            rating: "",
            review_count: "",
            categories: [],
            price: "",
            location: {},
            is_closed: false
          },
          {
            id: "111",
            name: "Business2",
            url: "",
            image_url: "",
            rating: "",
            review_count: "",
            categories: [],
            price: "",
            location: {},
            is_closed: false
          }
        ]
      }
    });

    // Mock props
    const mockUser = { _id: "000" };

    render(
      <BrowserRouter>
        <BusinessSearch user={mockUser}/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(userSearchAPI.getForUser).toHaveBeenCalledWith("000");
      expect(businessAPI.search).toHaveBeenCalledWith("sushi", "nyc", 1, true);
      expect(screen.getAllByTestId("businessDisplay-result")).toHaveLength(2); 
      expect(screen.getByText("Business1")).toBeInTheDocument();
      expect(screen.getByText("Business2")).toBeInTheDocument();
    });
  });

  //----- Test 2 -----
  it("correctly submits form data", async () => {
    // Mock API function
    authAPI.getUser.mockResolvedValue({
      data: {
        success: true,
        user: { _id: "000" }
      }
    });

    userSearchAPI.create.mockResolvedValue({
      data: { success: true }
    });

    businessAPI.search.mockResolvedValue({
      data: {
        success: true,
        businesses: [
          {
            id: "000",
            name: "Business1",
            url: "",
            image_url: "",
            rating: "",
            review_count: "",
            categories: [],
            price: "",
            location: {},
            is_closed: false
          },
          {
            id: "111",
            name: "Business2",
            url: "",
            image_url: "",
            rating: "",
            review_count: "",
            categories: [],
            price: "",
            location: {},
            is_closed: false
          }
        ]
      }
    });

    render(
      <BrowserRouter>
        <BusinessSearch/>
      </BrowserRouter>
    );

    // User events
    userEvent.type(screen.getByTestId("businessForm-term"), "sushi");
    userEvent.type(screen.getByTestId("businessForm-location"), "nyc");
    userEvent.click(screen.getByTestId("businessForm-submit"));

    // Confirm state change
    await waitFor(() => {
      expect(screen.getAllByTestId("businessDisplay-result")).toHaveLength(2); 
    });

    // Assertions
    expect(authAPI.getUser).toHaveBeenCalled();
    expect(userSearchAPI.create).toHaveBeenCalledWith("000", "sushi", "nyc", 1, true);
    expect(businessAPI.search).toHaveBeenCalledWith("sushi", "nyc", 1, true);
    expect(screen.getByText("Business1")).toBeInTheDocument();
    expect(screen.getByText("Business2")).toBeInTheDocument();
  });

  //----- Test 3 -----
  it("correctly adds business", async () => {
    // Mock API function
    authAPI.getUser.mockResolvedValue({
      data: {
        success: true,
        user: { _id: "000" }
      }
    });
    
    userSearchAPI.getForUser.mockResolvedValue({
      data: {
        success: true,
        userSearch: {
          userId: "000",
          term: "sushi",
          location: "nyc",
          price: 1,
          open: true
        }
      }
    });

    userSearchAPI.create.mockResolvedValue({
      data: { success: true }
    });

    businessAPI.search.mockResolvedValue({
      data: {
        success: true,
        businesses: [
          {
            id: "000",
            name: "Business1",
            url: "",
            image_url: "",
            rating: "",
            review_count: "",
            categories: [],
            price: "",
            location: {},
            is_closed: false
          },
          {
            id: "111",
            name: "Business2",
            url: "",
            image_url: "",
            rating: "",
            review_count: "",
            categories: [],
            price: "",
            location: {},
            is_closed: false
          }
        ]
      }
    });

    userBusinessAPI.create.mockResolvedValue({
      data: { success: true }
    });

    // Mock props
    const mockUser = { _id: "000" };
    const mockHandlePopup = jest.fn();

    render(
      <BrowserRouter>
        <BusinessSearch
          user={mockUser}
          handlePopup={mockHandlePopup}/>
      </BrowserRouter>
    );

    // User events
    userEvent.type(screen.getByTestId("businessForm-term"), "sushi");
    userEvent.type(screen.getByTestId("businessForm-location"), "nyc");
    userEvent.click(screen.getByTestId("businessForm-submit"));

    // Confirm state change
    await waitFor(() => expect(screen.getAllByTestId("businessDisplay-result")).toHaveLength(2));

    userEvent.click(screen.getAllByText("Go Tonight")[0]);

    await waitFor(() => expect(userBusinessAPI.create).toHaveBeenCalled());

    expect(mockHandlePopup).toHaveBeenCalledWith("Business added", "success"); 
  });
});
