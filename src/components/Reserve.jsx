import React, { useState } from "react";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../useFetchHook";
import { API_BASE_URL } from "../api";
import { searchParamsFromQuery } from "../context/SearchContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Reserve = (props) => {
  const location = useLocation();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(API_BASE_URL + `/hotels/room/${props.hotelId}`);
  const { dates } = searchParamsFromQuery(location.search);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNum) => {
    const unavailableDateRanges = roomNum.unavailableDates;
    const isFound = unavailableDateRanges.some((dateRange) => {
      return dateRange.some((date) => allDates.includes(new Date(date).getTime()));
    });
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(API_BASE_URL + `/rooms/availability/${roomId}`, { dates: allDates });
          return res.data;
        })
      );
      props.setOpen(false);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="reserve">
      <div className="reserve-container">
        <FontAwesomeIcon icon={faCircleXmark} className="reserve-close" onClick={() => props.setOpen(false)} />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="reserve-item">
            <div className="reserve-item-info">
              <div className="reserve-title">{item.title}</div>
              <div className="reserve-desc">{item.desc}</div>
              <div className="reserve-max">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="reserve-price">{item.price}</div>
            </div>
            <div className="reserve-select-rooms">
              {item.roomNumbers.map((roomNum) => (
                <div className="rooms">
                  <label>{roomNum.roomNumber}</label>
                  <input type="checkbox" value={roomNum._id} onChange={handleSelect} disabled={!isAvailable(roomNum)} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="reserve-button">
          Reserve
        </button>
      </div>
    </div>
  );
};

export default Reserve;
