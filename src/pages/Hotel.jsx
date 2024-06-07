import "./hotel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import useFetch from "../useFetchHook";
import { API_BASE_URL } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { searchParamsFromQuery } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import Reserve from "../components/Reserve";
import LoadingIndicator from "../components/LoadingIndicator";
import ImageComponent from "../components/ImageComponent";
import PopUpMessage from "../components/PopUpMessage";

const Hotel = () => {
  const location = useLocation();
  const hotel_id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isPopoupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const { data, loading, error } = useFetch(API_BASE_URL + `/hotels/find/${hotel_id}`);
  const { dates, options } = searchParamsFromQuery(location.search);

  const milisecondsPerDay = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const amountOfDays = Math.ceil(timeDiff / milisecondsPerDay);
    return amountOfDays;
  };

  // If you open this hotel's page without query params, we show price for 1 day by default.
  const totalDays = dates.length === 0 ? 1 : dayDifference(dates[0].endDate, dates[0].startDate);

  // Handling opening the slider when clicked on a specific image
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  // Image slider logic
  const handleMove = (direction) => {
    const numOfPhotos = data.photos.length - 1;
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? numOfPhotos : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === numOfPhotos ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  // Check if user is authenticated if not then redirect to login page
  const handleClick = () => {
    currentUser ? setOpenModal(true) : navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="hotel-container">
          {open && (
            <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")} />
              <div className="slider-wrapper" onClick={() => handleMove("l")}>
                <img src={data.photos[slideNumber].fullImage} alt="" className="slider-img" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")} />
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
                <span className="hotel-distance">Excellent location – {data.distance} from downtown</span>
                <span className="hotel-price-highlight">
                  Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
                </span>
                <div className="hotel-images">
                  {data.photos?.map((photo, i) => (
                    <div className="hotel-img-wrapper" key={i}>
                      <ImageComponent
                        onClick={() => handleOpen(i)}
                        src={photo.fullImage}
                        hash={photo.previewImage}
                        className="hotel-img"
                      />
                    </div>
                  ))}
                </div>
                <h1 className="hotel-title">Property Description</h1>
                <p className="hotel-desc">{data.description}</p>
              </div>
              <div className="hotel-details-price">
                <h1>{data.title}</h1>
                <span>This property has an excellent location score of {data.rating || 9.5}!</span>
                <h2>
                  <b>${data.cheapestPrice * totalDays * (options?.room || 1)}</b> {`(${totalDays} nights)`}
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={hotel_id} onReserveSuccess={() => setIsPopupOpen(true)} />}
      {isPopoupOpen && (
        <PopUpMessage
          text="Congrats! You made a reservation!"
          duration={2000}
          onDone={() => {
            setIsPopupOpen(false);
            navigate("/");
          }}
        />
      )}
    </div>
  );
};

export default Hotel;
