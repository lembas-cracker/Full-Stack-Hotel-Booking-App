import "./hotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Footer from "../components/Footer";
import { useState } from "react";
import useFetch from "../useFetchHook";
import { API_BASE_URL } from "../api";
import { useLocation } from "react-router-dom";

const Hotel = () => {
  const location = useLocation();
  const hotel_id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const { data, loading, error } = useFetch(
    API_BASE_URL + `/hotels/find/${hotel_id}`
  );

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading"
      ) : (
        <div className="hotel-container">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="slider-wrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="slider-img"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotel-wrapper">
            <div className="hotel-details">
              <div className="hotel-details-text">
                <h1 className="hotel-title">{data.name}</h1>
                <div className="hotel-address">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data.address}</span>
                </div>
                <span className="hotel-distance">
                  Excellent location – {data.distance}m from downtown
                </span>
                <span className="hotel-price-highlight">
                  Book a stay over ${data.cheapestPrice} at this property and
                  get a free airport taxi
                </span>
                <div className="hotel-images">
                  {data.photos?.map((photo, i) => (
                    <div className="hotel-img-wrapper" key={i}>
                      <img
                        onClick={() => handleOpen(i)}
                        src={photo}
                        alt=""
                        className="hotel-img"
                      />
                    </div>
                  ))}
                </div>
                <h1 className="hotel-title">{data.title}</h1>
                <p className="hotel-desc">{data.description}</p>
              </div>
              <div className="hotel-details-price">
                <h1>{data.title}</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${data.cheapestPrice * 7}</b> (7 nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Hotel;
