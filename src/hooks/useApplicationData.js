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

  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4
    }
    return daysOfWeek[day];
  }

  function bookInterview(id, interview) {
    const appointment = { ...state.appointments[id], interview: { ...interview}};
    const appointments = {...state.appointments,  [id]: appointment};
    const dayOfWeek = findDay(state.day)

    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek]
    }
    
    console.log(day);
    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1
      } 
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots
      } 
    }

    let days = state.days
    days[dayOfWeek] = day;
    
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {setState({ ...state, appointments, days }); })
      .catch((err) => { console.log(err);});
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    const dayOfWeek = findDay(state.day);

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1
    }

    let days = state.days
    days[dayOfWeek] = day;

    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState({...state, appointments, days})
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