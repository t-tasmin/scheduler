
const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers:[1, 2, 4]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [3,2]
    }
  ],

  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },

  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "4": {
      id: 4,
      name: "Tori John",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }

  }
};

export function getAppointmentsForDay(state, day) {
  let appointments_id = [];
  for (let element of state.days){
     if (element.name === day){
      Array.prototype.push.apply(appointments_id, element.appointments);
     }
  }
  if (appointments_id === []) {
    return [];
  }

  let appointments = [];

  for (let id of appointments_id){
      for (let key in state.appointments){
        if (state.appointments[key].id === id){
          appointments.push(state.appointments[key]);
        }
    }
  }
  return appointments;
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
};


 export function getInterviewersForDay(state, day) {
  let interviewers_id = [];
  for (let element of state.days){
     if (element.name === day){
      Array.prototype.push.apply(interviewers_id, element.interviewers);
     }
  }
  if (interviewers_id === []) {
    return [];
  }

  let interviewers = [];

  for (let id of interviewers_id){
      for (let key in state.interviewers){
        if (state.interviewers[key].id === id){
          interviewers.push(state.interviewers[key]);
        }
    }
  }
  return interviewers;
};

