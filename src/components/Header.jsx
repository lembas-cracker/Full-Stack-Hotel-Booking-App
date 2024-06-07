import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faCalendarDays,
  faCar,
  faBed,
  faLandmark,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState, useRef, useCallback, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useOutside } from "../useOutsideHook";
import { searchParamsToQuery } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOption = (el, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [el]: operation === "increase" ? options[el] + 1 : options[el] - 1,
      };
    });
  };

  const handleSearchClick = () => {
    navigate(`/hotels?${searchParamsToQuery({ destination, options, dates })}`);
  };

  const handleSearchKeydown = (e) => {
    if (e.key === "Enter") {
      navigate(`/hotels?${searchParamsToQuery({ destination, options, dates })}`);
    }
  };

  //when the calendar or options menu are opened, we close them when we click anywhere else in the document (outside of these elements)
  //and we use useCallback() to avoid constant  re-subscriptions
  const dateRef = useRef();
  useOutside(
    dateRef,
    useCallback(() => setOpenDate(false), [])
  );

  const optionsRef = useRef();
  useOutside(
    optionsRef,
    useCallback(() => setOpenOptions(false), [])
  );

  return (
    <>
      <div className="header">
        <div className={type === "list" ? "header-container list-mode" : "header-container"}>
          <div className="header-list">
            <div className="header-list-item active">
              <FontAwesomeIcon icon={faHotel} />
              <span>Stays</span>
            </div>
            <div className="header-list-item">
              <FontAwesomeIcon icon={faPlane} />
              <span>Flights</span>
            </div>
            <div className="header-list-item">
              <FontAwesomeIcon icon={faCar} />
              <span>Car rentals</span>
            </div>
            <div className="header-list-item">
              <FontAwesomeIcon icon={faLandmark} />
              <span>Attractions</span>
            </div>
            <div className="header-list-item">
              <FontAwesomeIcon icon={faTaxi} />
              <span>Airport taxis</span>
            </div>
          </div>

          {/* if component is not HotelList then show the full landing page header and the search */}
          {type !== "list" && (
            <>
              <h1 className="header-title">
                Portfolio full-stack React.js project: test-mode Booking.com clone by Ksenia Agalakova
              </h1>
              <a href="https://github.com/lembas-cracker/Full-stack-hotel-booking-app" className="header-description">
                <FontAwesomeIcon icon={faGithub} className="header-github" />
                lembas-cracker/Full-stack-hotel-booking-app
              </a>
            </>
          )}
        </div>
      </div>
      {type !== "list" && (
        <div className="header-search-container">
          <div className="header-search">
            <div className="header-search-item">
              <FontAwesomeIcon icon={faBed} className="header-icon" />
              <input
                type="text"
                placeholder="Where are you going?"
                className="header-search-input"
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={(e) => handleSearchKeydown(e)}
              />
            </div>
            <div className="header-search-item" ref={dateRef}>
              <div className="header-search-date" onClick={() => setOpenDate(!openDate)}>
                <FontAwesomeIcon icon={faCalendarDays} className="header-icon" />
                <span className="header-search-text">{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
              </div>
              {openDate && (
                <div className="date">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                  />
                  <button
                    className="dialog-close-button"
                    onClick={(event) => {
                      setOpenDate(false);
                      event.stopPropagation();
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
            <div className="header-search-item" ref={optionsRef} onClick={() => setOpenOptions(true)}>
              <FontAwesomeIcon icon={faPerson} className="header-icon" />
              <span className="header-search-text">
                {`${options.adult} adult ⸱ ${options.children} children ⸱ ${options.room} room`}
              </span>
              {openOptions && (
                <div className="options">
                  <div className="option-item">
                    <span className="option-text">Adult</span>
                    <div className="option-counter">
                      <button
                        disabled={options.adult <= 1}
                        className="option-counter-btn"
                        onClick={() => handleOption("adult", "decrease")}
                      >
                        -
                      </button>
                      <span className="option-counter-number">{options.adult}</span>
                      <button className="option-counter-btn" onClick={() => handleOption("adult", "increase")}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="option-item">
                    <span className="option-text">Children</span>
                    <div className="option-counter">
                      <button
                        disabled={options.children <= 0}
                        className="option-counter-btn"
                        onClick={() => handleOption("children", "decrease")}
                      >
                        -
                      </button>
                      <span className="option-counter-number">{options.children}</span>
                      <button className="option-counter-btn" onClick={() => handleOption("children", "increase")}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="option-item">
                    <span className="option-text">Room</span>
                    <div className="option-counter">
                      <button
                        disabled={options.room <= 1}
                        className="option-counter-btn"
                        onClick={() => handleOption("room", "decrease")}
                      >
                        -
                      </button>
                      <span className="option-counter-number">{options.room}</span>
                      <button className="option-counter-btn" onClick={() => handleOption("room", "increase")}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="dialog-close-button"
                    onClick={(event) => {
                      setOpenOptions(false);
                      event.stopPropagation();
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
            <div className="header-search-item">
              <div className="header-btn" onClick={handleSearchClick}>
                Search
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
