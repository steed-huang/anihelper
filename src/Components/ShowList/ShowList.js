import React from "react";
import "./ShowList.css";

export default function ShowList({ showList }) {
  return (
    <div id="list_body" className="centered-flex">
      <div id="list">
        {showList
          ? showList.map((show, index) => (
              <div key={show.id} className="item">
                <div className="item_number"> {index + 1} </div>
                <div className="item_name"> {show.name} </div>
                <div className="item_rating"> {show.rating} </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
