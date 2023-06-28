import { Link, useLocation } from "react-router-dom";
import { searchParamsFromQuery, searchParamsToQuery } from "../context/SearchContext";
import "./search-item.css";

const SearchItem = ({ item }) => {
  const location = useLocation();
  const searchParams = searchParamsFromQuery(location.search);
  console.log(item.photos);
  return (
    <Link to={`/hotels/${item._id}?${searchParamsToQuery(searchParams)}`}>
      <div className="search-item">
        {<img src={item.photos[0]} alt="" className="si-img" /> || (
          <img
            src="https://media.istockphoto.com/id/1206575314/vector/image-unavailable-icon.jpg?s=612x612&w=0&k=20&c=7aypXCTzJ42V0xRHJ08Nq1K6fPgY5IB_D4fXbWloX_w="
            alt=""
            className="si-img"
          />
        )}

        <div className="si-desc">
          <div className="si-header">
            <h1 className="si-title">{item.name}</h1>
            {item.rating ? (
              <div className="si-rating">
                <span>Excellent</span>
                <button>{item.rating}</button>
              </div>
            ) : (
              <span style={{ color: "gray" }}>Not Rated Yet</span>
            )}
          </div>
          <span className="si-distance">{item.distance}</span>
          <span className="si-taxi-op">Free airport taxi</span>
          <span className="si-subtitle">Studio Apartment with Air conditioning</span>
          <span className="si-features">{item.description}</span>
          <span className="si-cancel-op">Free cancellation </span>
          <span className="si-cancel-op-subtitle">You can cancel later, so lock in this great price today!</span>
          <div className="si-details">
            <div className="si-detail-texts">
              <span className="si-price">${item.cheapestPrice}</span>
              <span className="si-taxi-op">Includes taxes and fees</span>

              <button className="si-check-button">See availability</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
