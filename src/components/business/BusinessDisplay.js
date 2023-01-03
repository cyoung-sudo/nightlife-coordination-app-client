import "./BusinessDisplay.css";
// Icons
import { BsStar, BsStarFill } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
// Rating
import Rating from "react-rating";

export default function BusinessDisplay(props) {
  return (
    <ul id="businessDisplay">
      {props.businesses.map((business, idx) => (
        <li
          data-testid="businessDisplay-result"
          className="businessDisplay-result"
          key={idx}>
          <img className="businessDisplay-img" src={business.image_url} alt="business-image"/>

          <div className="businessDisplay-content">
            <div className="businessDisplay-content-main">
              <div className="businessDisplay-name">{business.name}</div>

              {/*----- Rating -----*/}
              {/* CAUSES "UNSAFE_componentWillReceiveProps" WARNING */}
              <div className="businessDisplay-rating">
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
              <div className="businessDisplay-info">
                <ul className="businessDisplay-categories">
                  {business.categories.map((category, idx) => (
                    <li key={idx}>
                      {category.title}
                    </li>
                  ))}
                </ul>
                <div className="businessDisplay-price">{business.price}</div>
                <div className="businessDisplay-location">
                  <span><RxDotFilled/></span>{business.location.city}, {business.location.state}
                </div>
              </div>
              {/*----- /Info -----*/}

              {/*----- Status -----*/}
              {business.is_closed && 
                <div className="businessDisplay-closed">Closed</div>}
              {!business.is_closed && 
                <div className="businessDisplay-open">Open</div>}
              {/*----- /Status -----*/}
            </div>
            
            <div className="businessDisplay-content-links">
              <a href={business.url} target="_blank" rel="noreferrer">Visit Yelp Page</a>
              {props.user &&
                <button onClick={() => props.handleAddBusiness(business.id)}>
                  Go Tonight
                </button>
              }
              {props.attendees &&
                <span>Attendees: {props.attendees[business.id]}</span>
              }
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};