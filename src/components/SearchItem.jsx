import { Link } from 'react-router-dom'
import './search-item.css'

const SearchItem = ({item}) => {
    return (
        <div className='search-item'>
            <img src={item.photos[0]} 
                 alt="" 
                 className="si-img" />
            <div className="si-desc">
                <h1 className="si-title">{item.name}</h1>
                <span className="si-distance">{item.distance}</span>
                <span className="si-taxi-op">Free airport taxi</span>
                <span className="si-subtitle">Studio Apartment with Air conditioning</span>
                <span className="si-features">{item.description}</span>
                <span className="si-cancel-op">Free cancellation </span>
                <span className="si-cancel-op-subtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="si-details">
                {item.rating ? 
                <div className="si-rating">
                    <span>Excellent</span>
                    <button>{item.rating}</button>
                </div> : 
                <span style={{color:"gray"}}>Not Rated Yet</span>}
                <div className="si-detail-texts">
                    <span className="si-price">${item.cheapestPrice}</span>
                    <span className="si-taxi-op">Includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                      <button className="si-check-button">See availability</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchItem