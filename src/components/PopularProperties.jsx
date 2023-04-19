import "./popular-properties.css";

const PopularProperties = () => {
    return (
        <div className="popular">
            <div className="popular-item">
                <span className="popular-img-container">
                    <img
                        src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
                        alt=""
                        className="popular-img"
                    />
                </span>
                <span className="popular-name">Aparthotel Stare Miasto</span>
                <span className="popular-city">Madrid</span>
                <span className="popular-price">Starting from $120</span>
                <div className="popular-rating">
                    <button>8.9</button>
                    <span>Excellent</span>
                </div>
            </div>
            <div className="popular-item">
                <span className="popular-img-container">
                    <img
                        src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1"
                        alt=""
                        className="popular-img"
                    />
                </span>
                <span className="popular-name">Comfort Suites Airport</span>
                <span className="popular-city">Austin</span>
                <span className="popular-price">Starting from $140</span>
                <div className="popular-rating">
                    <button>9.3</button>
                    <span>Exceptional</span>
                </div>
            </div>
            <div className="popular-item">
                <span className="popular-img-container">
                    <img
                        src="https://cf.bstatic.com/xdata/images/hotel/square600/270323047.webp?k=ace18ab936560dac1e01f7d0f4b44206d354a8683e124c62f3f10c25cede9bd2&o=&s=1"
                        alt=""
                        className="popular-img"
                    />
                </span>
                <span className="popular-name">Flora Chiado Apartments</span>
                <span className="popular-city">Lisbon</span>
                <span className="popular-price">Starting from $99</span>
                <div className="popular-rating">
                    <button>8.8</button>
                    <span>Excellent</span>
                </div>
            </div>
            <div className="popular-item">
                <span className="popular-img-container">
                    <img
                        src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1"
                        alt=""
                        className="popular-img"
                    />
                </span>
                <span className="popular-name">Hilton Garden Inn</span>
                <span className="popular-city">Berlin</span>
                <span className="popular-price">Starting from $105</span>
                <div className="popular-rating">
                    <button>8.9</button>
                    <span>Excellent</span>
                </div>
            </div>
        </div>
    );
};

export default PopularProperties;