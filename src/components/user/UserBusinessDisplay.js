import "./UserBusinessDisplay.css";
// Icons
import { BsStar, BsStarFill } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
// Rating
import Rating from "react-rating";

export default function UserBusinessDisplay(props) {
  return (
    <ul id="userBusinessDisplay">
      {props.businesses.map((business, idx) => (
        <li className="userBusinessDisplay-result" key={idx}>
          <img className="userBusinessDisplay-img" src={business.image_url} alt="business-image"/>

          <div className="userBusinessDisplay-content">
            <div className="userBusinessDisplay-content-main">
              <div className="userBusinessDisplay-name">{business.name}</div>

              {/*----- Rating -----*/}
              {/* CAUSES "UNSAFE_componentWillReceiveProps" WARNING */}
              <div className="userBusinessDisplay-rating">
                <Rating 
                  start={0}
                  stop={5}
                  fractions={2}
                  initialRating={business.rating}
                  readonly={true}
                  emptySymbol={<BsStar/>}
                  fullSymbol={<BsStarFill/>}/> {business.review_count}
              </div>
              {/*----- /Rating -----*/}

              {/*----- Info -----*/}
              <div className="userBusinessDisplay-info">
                <ul className="userBusinessDisplay-categories">
                  {business.categories.map((category, idx) => (
                    <li key={idx}>
                      {category.title}
                    </li>
                  ))}
                </ul>
                <div className="userBusinessDisplay-price">{business.price}</div>
                <div className="userBusinessDisplay-location">
                  <span><RxDotFilled/></span>{business.location.city}, {business.location.state}
                </div>
              </div>
              {/*----- /Info -----*/}

              {/*----- Status -----*/}
              {business.is_closed && 
                <div className="userBusinessDisplay-closed">Closed</div>}
              {!business.is_closed && 
                <div className="userBusinessDisplay-open">Open</div>}
              {/*----- /Status -----*/}
            </div>
            
            <div className="userBusinessDisplay-content-links">
              <a href={business.url} target="_blank" rel="noreferrer">Visit Yelp Page</a>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};