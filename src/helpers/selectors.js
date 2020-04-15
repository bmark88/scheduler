const getAppointmentsForDay =(state, dayName) => {
  let appointmentsToday;
  let filteredAppointments = [];

  state.days.filter(day => {
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

export { getAppointmentsForDay };