import './search-item.css'

const SearchItem = () => {
    return (
        <div className='search-item'>
            <img src="" alt="" className="si-img" />
            <div className="se-desc">
                <h1 className="si-title">Tower Street Apartments</h1>
                <span className="si-distance">500m from center</span>
                <span className="si-taxi">Free airport taxi</span>
                <span className="si-subtitle">Studio Apartment with Air conditioning</span>
                <span className="si-features">Entire studio • 1 bathroom • 21m² 1 full bed</span>
                <span className="si-cancel-op">Free cancellation </span>
                <span className="si-cancel-op-subtitle">
                    You can cancel later, so lock in this great price today!
                </span>
            </div>
            <div className="si-details">
                <div className="si-rating">
                    <span>Excellent</span>
                    <button>8.9</button>
                </div>
                <div className="si-detail-texts">
                    <span className="si-price">$112</span>
                    <span className="sitax-op">Includes taxes and fees</span>
                    <button className="si-checkbutton">See availability</button>
                </div>
            </div>
        </div>
    )
}

export default SearchItem