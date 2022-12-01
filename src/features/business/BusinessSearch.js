import "./BusinessSearch.css";
// React
import { useState } from "react";
// APIs
import * as businessAPI from "../../apis/businessAPI";
// Components
import BusinessForm from "../../components/business/BusinessForm";
import BusinessResults from "../../components/business/BusinessResults";

export default function BusinessSearch(props) {
  // Controlled inputs
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  // Requested data
  const [businesses, setBusinesses] = useState(null);

  //----- Submits form data
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();

    businessAPI.search(category, location)
    .then(res => {
      if(res.data.success) {
        console.log(res.data.businesses);
        setBusinesses(res.data.businesses);
      } else {
        console.log("Error")
      }
    })
    .catch(err => console.log(err));
  };

  return (
    <div id="businessSearch">
      <h1>Business Search</h1>

      <BusinessForm
        setCategory={setCategory}
        setLocation={setLocation}
        handleSubmit={handleSubmit}/>

      {businesses && 
        <BusinessResults businesses={businesses}/>
      }
    </div>
  );
};