import "./hotel-list.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useOutside } from "../useOutsideHook";
import SearchItem from "../components/SearchItem";
import useFetch from "../useFetchHook";
import { API_BASE_URL } from "../api";
import { searchParamsFromQuery, searchParamsToQuery } from "../context/SearchContext";

const HotelList = () => {
  const location = useLocation();
  const locationParams = searchParamsFromQuery(location.search);

  const destination = locationParams.destination;
  const options = locationParams.options;
  const dates = locationParams.dates;

  const navigate = useNavigate();
  const setDestination = (destination) => navigate(`/hotels?${searchParamsToQuery({ destination, options, dates })}`);
  const setOptions = (options) => navigate(`/hotels?${searchParamsToQuery({ destination, options, dates })}`);
  const setDates = (dates) => navigate(`/hotels?${searchParamsToQuery({ destination, options, dates })}`);

  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    API_BASE_URL + `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const dateRef = useRef();
  useOutside(dateRef, () => setOpenDate(false));
  const optionsRef = useRef();
  useOutside(optionsRef, () => setOptions(false));

  const handleSearchKeydown = (e) => {
    if (e.key === "Enter") {
      setDestination(e.target.value);
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="list-container">
        <div className="list-wrapper">
          <div className="list-search">
            <h1 className="list-title">Search</h1>
            <div className="list-item">
              <label>Destination</label>
              <input placeholder={destination} type="text" onKeyDown={(e) => handleSearchKeydown(e)} />
            </div>
            <div className="list-item" ref={dateRef}>
              <label htmlFor="">Check-in Date</label>

              <span onClick={() => setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange onChange={(item) => setDates([item.selection])} ranges={dates} minDate={new Date()} />
              )}
            </div>
            <div className="list-item">
              <label>Options</label>
              <div className="list-options">
                <div className="list-option-item">
                  <span className="list-option-text">
                    Min price <small>per night</small>
                  </span>
                  <input onChange={(e) => setMin(e.target.value)} type="number" className="list-option-input" />
                </div>
                <div className="list-option-item">
                  <span className="list-option-text">
                    Max price <small>per night</small>
                  </span>
                  <input onChange={(e) => setMax(e.target.value)} type="number" className="list-option-input" />
                </div>
                <div className="list-option-item">
                  <span className="list-option-text">Adult</span>
                  <input type="number" className="list-option-input" placeholder={options.adult} min={1} />
                </div>
                <div className="list-option-item">
                  <span className="list-option-text">Children</span>
                  <input type="number" className="list-option-input" placeholder={options.children} min={0} />
                </div>
                <div className="list-option-item">
                  <span className="list-option-text">Room</span>
                  <input type="number" className="list-option-input" placeholder={options.room} min={1} />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="list-result">
            {loading ? (
              "Loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelList;
