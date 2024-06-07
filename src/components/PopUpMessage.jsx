import React, { useEffect } from "react";
import "./popupmessage.css";

const PopUpMessage = (props) => {
  useEffect(() => {
    const timer = setTimeout(props.onDone, props.duration);
    return () => clearTimeout(timer);
  }, [props.onDone]);

  return (
    <div className="overlay">
      <div className="popup">
        <h1>{props.text}</h1>
      </div>
    </div>
  );
};

export default PopUpMessage;
