import React, { useEffect, useState } from "react";
import "./Schedule.css";
import Card from "react-bootstrap/Card";

export default function Schedule() {
  const [days, setDays] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  // update days array
  useEffect(() => {
    const cur_day = new Date().getDay();
    // order starting from current day of week
    let new_days = [...days.slice(cur_day), ...days.slice(0, cur_day)];
    setDays(new_days);
  }, []);

  return (
    <>
      <div id="week_container">
        {days.map((day) => {
          return (
            <div className="day-container" key={day}>
              <div className="day-title">
                <h1>{day}</h1>
              </div>
              <div className="anime-container">
                <Card className="anime-card">
                  <Card.Header>
                    <Card.Title>Card Title</Card.Title>
                  </Card.Header>
                  <Card.Img variant="top" src={require("../../Assets/img-anime.png")} />
                  <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </Card.Footer>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
