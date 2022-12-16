import "./Attendance.css";
// React
import { useState, useEffect } from "react";
// Components
import BusinessDisplay from "../../components/business/BusinessDisplay";
// APIs
import * as businessAPI from "../../apis/businessAPI";
import * as userBusinessAPI from "../../apis/userBusinessAPI";

export default function Attendance(props) {
  // Requested data
  const [businesses, setBusinesses] = useState(null);
  const [attendees, setAttendees] = useState(null);
  // Pagination
  const [page, setPage] = useState(1);
  const [pageContent, setPageContent] = useState(null);

  //----- Retrieve businesses w/ attendees
  useEffect(() => {
    // Get all user-businesses
    userBusinessAPI.getAll()
    .then(res => {
      // Remove duplicates & get attendee count
      let noDups = [];
      let counter = {};
      for(let userBusiness of res.data.userBusinesses) {
        if(counter[userBusiness.businessId]) {
          counter[userBusiness.businessId] += 1;
        } else {
          noDups.push(userBusiness);
          counter[userBusiness.businessId] = 1;
        }
      }

      setAttendees(counter);
      // Get businesses
      return businessAPI.getBusinesses(noDups);
    })
    .then(res => {
      if(res.data.success) {
        setBusinesses(res.data.businesses);
      }
    })
    .catch(err => console.log(err));
  }, []);

  //----- Handles page changes
  useEffect(() => {
    if(businesses) {
      handlePage();
    }
  }, [businesses, page]);

  //----- Set page content (10 per page)
  const handlePage = () => {
    let start = (page - 1) * 10
    let end = start + 10;
    setPageContent(businesses.slice(start, end));

    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  if(pageContent) {
    return (
      <div id="attendance">
        <div id="attendance-header">
          <h1>Attendance</h1>
        </div>
  
        <div id="attendance-businesses-wrapper">
          <BusinessDisplay 
            businesses={pageContent}
            attendees={attendees}/>
        </div>

        <div id="attendance-pagination">
          {(page > 1) &&
            <button onClick={() => setPage(state => state - 1)}>Prev</button>
          }
          <div>Page: {page}</div>
          {(page < (Math.ceil(businesses.length / 10))) &&
            <button onClick={() => setPage(state => state + 1)}>Next</button>
          }
        </div>
      </div>
    );
  }
};