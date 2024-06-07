import { API_BASE_URL } from "../api";
import useFetch from "../useFetchHook";
import "./popular-properties.css";
import { Link, useLocation } from "react-router-dom";
import { searchParamsFromQuery, searchParamsToQuery } from "../context/SearchContext";
import ImageComponent from "./ImageComponent";
import LoadingIndicator from "./LoadingIndicator";

const PopularProperties = () => {
  const location = useLocation();
  const searchParams = searchParamsFromQuery(location.search);
  const { data, loading, error } = useFetch(API_BASE_URL + "/hotels/?featured=true&limit=4");

  return (
    <div className="popular">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          {data?.map((item) => (
            <div className="popular-item" key={item._id}>
              <Link to={`/hotels/${item._id}?${searchParamsToQuery(searchParams)}`}>
                <div className="popular-img-container">
                  <ImageComponent
                    src={Object.values(item.photos[0])[0]}
                    hash={Object.values(item.photos[0])[1]}
                    className="popular-img"
                  />
                </div>
              </Link>
              <span className="popular-name">{item.name}</span>
              <span className="popular-city">{item.city}</span>
              <span className="popular-price">Starting from ${item.cheapestPrice}</span>
              {item.rating ? (
                <div className="popular-rating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              ) : (
                <span style={{ color: "gray" }}>Not Rated Yet</span>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PopularProperties;
