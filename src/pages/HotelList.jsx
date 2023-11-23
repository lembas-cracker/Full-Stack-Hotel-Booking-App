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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// High-level description:

// The search form should never cause the search results to change,
// until the user explicitly submits the form - either by
// clicking "submit" or pressing Enter in any input.

// This means that the API request for getting search results
// should depend on variables that never change until
// the form is submitted.

// Solution description:

// All form fields should change local state variables that
// are not directly used in the API request.

// On submit, the API request params should all be updated.
// This means:
// - `setMin` and `setMax` should be called at this point, using
// the latest values saved in form state variables.
// - Destination should be saved into the current page URL, so that
// on the next render it's picked up from `locationParams.destination`
// and used for the API request due to that.

// Before the form is submitted, those things should not happen.
// This means:
// - `setMin` and `setMax` should not be called in input event
// handlers. Instead, use intermediate state variables, `formMin`
// and `formMax.
// - Destination should not be saved into the page URL until the
// form is submitted. Instead, store the input field in an
// intermediate state variable.

// It might be easier to implement the second part first, i.e.
// set up the form variables and change the event handlers,
// and only then set up the submit handler as described above.

const HotelList = () => {
  const location = useLocation();
  const locationParams = searchParamsFromQuery(location.search);
  const { data: dataRandom } = useFetch(API_BASE_URL + "/hotels/random");

  const destination = locationParams.destination;
  const options = locationParams.options;
  const dates = locationParams.dates;
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
                <span style={{ padding: "0 0 10px" }}>Check out other properties:</span>
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
