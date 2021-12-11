
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
