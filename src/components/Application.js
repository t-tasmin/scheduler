import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import  { useState, useEffect } from "react";
import axios from "axios";
import  Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}  
  });

    
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev=>({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, []);

  const setDay = day => setState({ ...state, day });
  let dailyAppointments = getAppointmentsForDay(state, state.day);
  let interviewers = getInterviewersForDay(state, state.day);

   
  function bookInterview(id, interview) {
    const appointment = { ...state.appointments[id], interview: { ...interview}};
    const appointments = {...state.appointments,  [id]: appointment};
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {setState({ ...state, appointments }); })
      .catch((err) => { console.log(err);});
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const nullAppointment = {...state.appointments[id], interview: null };
      const appointments = {...state.appointments,[id]: nullAppointment};
    });
  }

   // async function bookInterview(id, interview) {
        
  //   const appointment = {...state.appointments[id], interview: { ...interview }};
  //   const appointments = { ...state.appointments,[id]: appointment };
  //   await axios.put(`/api/appointments/${id}`, {interview})
  //    .catch(err => console.log(err))

  //   setState( (state) => ({...state, appointments: appointments}));
  // }

  // async function cancelInterview(id) {
  //   await axios.delete(`/api/appointments/${id}`)
  //   .catch(err => console.log(err))

  //   const nullAppointment = {...state.appointments[id], interview: null };

  //   const appointments = { ...state.appointments, [id]: nullAppointment};
   
  // }
  
  const Appointments = dailyAppointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview ={bookInterview}
        cancelInterview ={cancelInterview}
      />
      );
  });

  

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
         {Appointments}
         <Appointment key="last" time="5pm" />
      </section>
 
    </main>
  );
}
