import "./BusinessResults.css";

export default function BusinessResults({businesses}) {
  return (
    <ul id="businessResults">
      {businesses.map((business, idx) => (
        <li key={idx}>
          <div>{business.name}</div>
          <div>{business.rating} {business.review_count}</div>
          <div>
            <ul>
              {business.categories.map((category, idx) => (
                <li key={idx}>
                  <div>{category.title}</div>
                </li>
              ))}
            </ul>
            <div>{business.price}</div>
            <div>{business.location.city} {business.location.state}</div>
          </div>
          <div>{business.is_closed ? "Closed" : "Open"}</div>
        </li>
      ))}
    </ul>
  );
};