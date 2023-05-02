import { API_BASE_URL } from "../api";
import useFetch from "../useFetchHook";
import "./popular-properties.css";

const PopularProperties = () => {
    const {data, loading, error} = useFetch(API_BASE_URL + '/hotels/?featured=true&limit=4')


    return (
        <div className="popular">
          {loading ? "Loading" : <>
            {data?.map(item => (
                <div className="popular-item" key={item._id}>
                <span className="popular-img-container">
                    <img
                        src={item.photos[0]}
                        alt=""
                        className="popular-img"
                        />
                </span>
                <span className="popular-name">{item.name}</span>
                <span className="popular-city">{item.city}</span>
                <span className="popular-price">Starting from ${item.cheapestPrice}</span>
                {item.rating ? 
                <div className="popular-rating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div> : 
                <span style={{color:"gray"}}>Not Rated Yet</span>
                }
            </div>
               ))} 
            </>}
        </div>
    );
};

export default PopularProperties;