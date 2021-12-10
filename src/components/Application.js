import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import  { useState, useEffect } from "react";
import axios from "axios";
import  Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

    
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("api/appointments"),
    ]).then((all) => {
      setState(prev=>({...prev, days:all[0].data, appointments:all[1].data}));
    })
  }, []);

  const setDay = day => setState({ ...state, day });
  let dailyAppointments = getAppointmentsForDay(state, state.day);;
  const appointments = dailyAppointments.map(appointment => <Appointment  {...appointment} key={appointment.id} />);
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
         />
      </section>
      <section className="schedule">
         {appointments}
         <Appointment key="last" time="5pm" />
      </section>
 
    </main>
  );
}
