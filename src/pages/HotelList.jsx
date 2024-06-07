import "./hotel-list.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useState, useRef } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const HotelList = () => {
  const location = useLocation();
  const locationParams = searchParamsFromQuery(location.search);
  const { data: dataRandom } = useFetch(API_BASE_URL + "/hotels/random");

  const destination = locationParams.destination;
  const options = locationParams.options;
  const dates = locationParams.dates?.length
    ? locationParams.dates
    : [{ startDate: new Date(), endDate: new Date(), key: "selection" }];
  const navigate = useNavigate();
  const setDates = (dates) => navigate(`/hotels?${searchParamsToQuery({ destination, options, dates })}`);

  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error } = useFetch(
    API_BASE_URL + `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const [formDestination, setFormDestination] = useState("");
  const [formMin, setFormMin] = useState("");
  const [formMax, setFormMax] = useState("");

  const datePickerParentRef = useRef();
  useOutside(datePickerParentRef, () => setDatePickerOpen(false));

  const handleSearchSubmit = (e) => {
    setMin(formMin);
    setMax(formMax);
    navigate(`/hotels?${searchParamsToQuery({ destination: formDestination, options, dates })}`);

    e.preventDefault();
    return false;
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="list-container">
        <div className="list-wrapper">
          <form className="list-search" onSubmit={handleSearchSubmit}>
            <h1 className="list-title">Search</h1>
            <div className="list-item">
              <label>Destination</label>
              <input placeholder={destination} type="text" onChange={(e) => setFormDestination(e.target.value)} />
            </div>
            <div className="list-item date-picker" ref={datePickerParentRef}>
              <label htmlFor="">Check-in Date</label>

              <span onClick={() => setDatePickerOpen(!isDatePickerOpen)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {isDatePickerOpen && (
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
                  <input onChange={(e) => setFormMin(e.target.value)} type="number" className="list-option-input" />
                </div>
                <div className="list-option-item">
                  <span className="list-option-text">
                    Max price <small>per night</small>
                  </span>
                  <input onChange={(e) => setFormMax(e.target.value)} type="number" className="list-option-input" />
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
            <button type="submit">Search</button>
          </form>
          <div className="list-result">
            {Array.isArray(data) && data.length === 0 ? (
              <div className="random-search">
                <span className="search-not-found">
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="magnifying-icon" />
                  No properties found in this destination.
                </span>
                <span style={{ padding: "0 0 12px 12px" }}>Check out other properties:</span>
                {dataRandom?.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </div>
            ) : loading ? (
              "Loading..."
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
