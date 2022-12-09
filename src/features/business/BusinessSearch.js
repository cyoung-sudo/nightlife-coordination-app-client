import "./BusinessSearch.css";
// React
import { useState } from "react";
// APIs
import * as businessAPI from "../../apis/businessAPI";
import * as authAPI from "../../apis/authAPI";
import * as userBusinessAPI from "../../apis/userBusinessAPI";
// Components
import BusinessForm from "../../components/business/BusinessForm";
import BusinessDisplay from "../../components/business/BusinessDisplay";

export default function BusinessSearch(props) {
  // Controlled inputs
  const [term, setTerm] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(1);
  const [open, setOpen] = useState(true);
  // Requested data
  const [businesses, setBusinesses] = useState(null);

  //----- Submits form data
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();

    businessAPI.search(term, location, price, open)
    .then(res => {
      if(res.data.success) {
        setBusinesses(res.data.businesses);
      }
    })
    .catch(err => console.log(err));
  };

  //----- Add business for user
  const handleAddBusiness = businessId => {
    // Check authentication
    authAPI.getUser()
    .then(res => {
      if(res.data.success) {
        userBusinessAPI.create(res.data.user._id, businessId)
        .then(res => {
          if(res.data.success) {
            props.handlePopup("Business added", "success");
          } else {
            props.handlePopup(res.data.message, "error");
          }
        })
        .catch(err => console.log(err));
      } else {
        props.handlePopup(res.data.message, "error");
        props.handleExpiredSession();
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="businessSearch">
      <div id="businessSearch-header">
        <h1>Business Search</h1>
      </div>

      <div id="businessSearch-form-wrapper">
        <BusinessForm
          setTerm={setTerm}
          setLocation={setLocation}
          setPrice={setPrice}
          setOpen={setOpen}
          handleSubmit={handleSubmit}/>
      </div>

      {businesses && 
        <div id="businessSearch-results-wrapper">
          <BusinessDisplay
            user={props.user}
            businesses={businesses}
            handleAddBusiness={handleAddBusiness}/>
        </div>
      }
    </div>
  );
};