import { render, screen, cleanup, waitFor } from "@testing-library/react";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import Attendance from "../Attendance";
// APIs
import * as businessAPI from "../../../apis/businessAPI";
import * as userBusinessAPI from "../../../apis/userBusinessAPI";

// Mocks
jest.mock("../../../apis/businessAPI");
jest.mock("../../../apis/userBusinessAPI");
window.scrollTo = jest.fn();

describe("----- <Attendance/> -----", () => {
  beforeEach(() => {
    // Mock API functions (useffecct API calls)
    userBusinessAPI.getAll.mockResolvedValue({
      data: {
        success: true,
        userBusinesses: [
          {
            userId: "000",
            businessId: "123"
          },
          {
            userId: "111",
            businessId: "456"
          }
        ]
      }
    });

    businessAPI.getBusinesses.mockResolvedValue({
      data: {
        success: true,
        businesses: [
          {
            id: "123",
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
            id: "456",
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
    })
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("displays businesses w/ attendees on load", async () => {
    render(
      <BrowserRouter>
        <Attendance/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(userBusinessAPI.getAll).toHaveBeenCalled();
      expect(businessAPI.getBusinesses).toHaveBeenCalled();
      expect(screen.getAllByTestId("businessDisplay-result")).toHaveLength(2); 
      expect(screen.getByText("Business1")).toBeInTheDocument();
      expect(screen.getByText("Business2")).toBeInTheDocument();
    });
  });
});
