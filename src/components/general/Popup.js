import "./Popup.css";
// React
import { useEffect, useRef } from "react";

export default function Popup(props) {
  // References
  const timerId = useRef(null);

  //----- Set timer for popup
  useEffect(() => {
    // Scroll to top of page
    window.scrollTo(0, 0);

    // 3sec duration
    timerId.current = setTimeout(() => {
      props.handlePopup("", "");
    }, 3000);
    // Clear timer on unmount
    return () => {
      clearTimeout(timerId.current);
    };
  }, [props.message]);

  if(props.message) {
    return (
      <div id="popup">
        <div className={props.msgMode === "success" ? "popup-success" : "popup-error"}>
          {props.message}
        </div>
      </div>
    );
  }
};