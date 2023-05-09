import React from "react";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../useFetchHook";
import { API_BASE_URL } from "../api";

const Reserve = (props) => {
  const { data, loading, error } = useFetch(API_BASE_URL + `hotels/room/${props.hotelId}`);

  return (
    <div className="reserve">
      <div className="reserve-container">
        <FontAwesomeIcon icon={faCircleXmark} className="reserve-close" onClick={() => props.setOpen(false)} />
        <span>Select your rooms:</span>
        {data.map((item) => {
          <div className="reserve-item">
            <div className="reserve-item-info">
              <div className="reserve-title">{item.title}</div>
              <div className="reserve-desc">{item.desc}</div>
              <div className="reserve-max">
                Max people: <br>{item.maxPeople}</br>
              </div>
            </div>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Reserve;
