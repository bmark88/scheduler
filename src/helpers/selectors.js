const getAppointmentsForDay = (state, dayName) => {
  let appointmentsToday;
  let filteredAppointments = [];

  state.days.forEach(day => {
    if (day.name === dayName) {
      appointmentsToday = day.appointments
    }
  });

  for (const appointment in state.appointments) {
    if (!appointmentsToday) {
      return [];
    } else if(appointmentsToday.includes(Number(appointment))) {
      filteredAppointments.push(state.appointments[appointment])
    }
  }

  return filteredAppointments
};

const getInterview = (state, interview) => {
  if (!interview) return null;

  const studentAndInterviewer = {
    interviewer: state.interviewers[interview.interviewer],
    student: interview.student
  }

  return studentAndInterviewer;
};

const getInterviewersForDay = (state, dayName) => {
  let interviewersToday;
  let filteredInterviewers = [];

  state.days.forEach(day => {
    if (day.name === dayName) {
      interviewersToday = day.interviewers
    }
  });

  for (const interviewer in state.interviewers) {
    if (!interviewersToday) {
      return [];
    } else if(interviewersToday.includes(Number(interviewer))) {
      filteredInterviewers.push(state.interviewers[interviewer])
    }
  }

  return filteredInterviewers
};


export { getAppointmentsForDay, getInterview, getInterviewersForDay };