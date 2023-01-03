import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Routing
import { BrowserRouter } from "react-router-dom";
// Components
import Profile from "../Profile";
// APIs
import * as userAPI from "../../../apis/userAPI";
import * as userBusinessAPI from "../../../apis/userBusinessAPI";
import * as businessAPI from "../../../apis/businessAPI";
import * as authAPI from "../../../apis/authAPI";

// Mocks
jest.mock("../../../apis/userAPI");
jest.mock("../../../apis/userBusinessAPI");
jest.mock("../../../apis/businessAPI");
jest.mock("../../../apis/authAPI");

describe("----- <Profile/> -----", () => {
  beforeEach(() => {
    // Mock API functions (useEffect API calls)
    userAPI.getOne.mockResolvedValue({
      data: {
        success: true,
        user: {
          _id: "000",
          username: "bob"
        }
      }
    });

    userBusinessAPI.getForUser.mockResolvedValue({
      data: {
        success: true,
        userBusinesses: [
          {
            _id: "000",
            userId: "000",
            businessId: "000",
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            _id: "111",
            userId: "000",
            businessId: "111",
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
      }
    });

    businessAPI.getBusinesses.mockResolvedValue({
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
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  //----- Test 1 -----
  it("correctly displays user-businesses", async () => {
    render(
      <BrowserRouter>
        <Profile/>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(userAPI.getOne).toHaveBeenCalled();
      expect(userBusinessAPI.getForUser).toHaveBeenCalled();
      expect(businessAPI.getBusinesses).toHaveBeenCalled();
      expect(screen.queryAllByTestId("userBusinessDisplay-result")).toHaveLength(2)
      expect(screen.getByText("Business1")).toBeInTheDocument();
      expect(screen.getByText("Business2")).toBeInTheDocument();
    });
  });

  //----- Test 2 -----
  it("correctly removes business", async () => {
    // Mock API functions
    authAPI.getUser.mockResolvedValue({
      data: {
        success: true,
        user: { _id: "000" }
      }
    });

    userBusinessAPI.deleteUserBusiness.mockResolvedValue({
      data: { success: true }
    });

    // Mock props
    const mockUser = { _id: "000" };
    const mockHandlePopup = jest.fn();

    render(
      <BrowserRouter>
        <Profile
          user={mockUser}
          handlePopup={mockHandlePopup}/>
      </BrowserRouter>
    );

    // Wait for data to load
    await waitFor(() => expect(screen.getAllByTestId("userBusinessDisplay-remove")).toHaveLength(2));

    userEvent.click(screen.getAllByTestId("userBusinessDisplay-remove")[0]);

    await waitFor(() => expect(mockHandlePopup).toHaveBeenCalledWith("Business removed", "success"));
  })
});
