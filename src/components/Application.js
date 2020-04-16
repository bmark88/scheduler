import React, { useState, useEffect } from "react";
import axios from "../../node_modules/axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay } from "../helpers/selectors";

export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    axios
      .get('/api/days')
      .then(res => getAppointmentsForDay(res.data, "Monday"))
      .catch(e => e.stack);
  });

  Promise.all([
    Promise.resolve(axios.get('api/days')),
    Promise.resolve(axios.get('api/appointments')),
  ]).then((all) => {
    setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
  });
  
  const [state, setState] = useState({
    day: [],
    days: [],
    appointments: {}
  });

  const appointments = getAppointmentsForDay(state, state.day)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"><DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appointment => <Appointment 
          key={appointment.id} 
          {...appointment}
          />
        )}
      </section>
    </main>
  );
};