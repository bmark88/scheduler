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

export { getAppointmentsForDay, getInterview };