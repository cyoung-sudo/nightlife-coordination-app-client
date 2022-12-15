import "./AllUsers.css";
// React
import { useState, useEffect } from "react";
// Components
import UserDisplay from "../../components/user/UserDisplay";
// APIs
import * as userAPI from "../../apis/userAPI";

export default function AllUsers(props) {
  // Requested data
  const [users, setUsers] = useState(null);
  // Pagination
  const [page, setPage] = useState(1);
  const [pageContent, setPageContent] = useState(null);

  //----- Retrieve all users
  useEffect(() => {
    userAPI.getAll()
    .then(res => {
      if(res.data.success) {
        setUsers(res.data.users);
      }
    })
    .catch(err => console.log(err));
  }, []);

  //----- Handles page changes
  useEffect(() => {
    if(users) {
      handlePage();
    }
  }, [users, page]);

  //----- Set page content (10 per page)
  const handlePage = () => {
    let start = (page - 1) * 10
    let end = start + 10;
    setPageContent(users.slice(start, end));

    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  if(pageContent) {
    return (
      <div id="displayUsers">
        <div id="displayUsers-header">
          <h1>Users</h1>
        </div>

        <div id="displayUsers-users-wrapper">
          <UserDisplay users={pageContent}/>
        </div>

        <div id="displayUsers-pagination">
          {(page > 1) &&
            <button onClick={() => setPage(state => state - 1)}>Prev</button>
          }
          <div>Page: {page}</div>
          {(page < (Math.ceil(users.length / 10))) &&
            <button onClick={() => setPage(state => state + 1)}>Next</button>
          }
        </div>
      </div>
    );
  }
};