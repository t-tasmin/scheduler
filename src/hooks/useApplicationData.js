import { useState, useEffect } from 'react';
import axios from 'axios';


export default function useApplicationData() {

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

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}  