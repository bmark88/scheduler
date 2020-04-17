import React, { useState, useEffect } from "react";
import axios from "../../node_modules/axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
      Promise.all([
        Promise.resolve(axios.get('api/days')),
        Promise.resolve(axios.get('api/appointments')),
        Promise.resolve(axios.get('api/interviewers'))
      ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      });
    },[]);
      
  const [state, setState] = useState({
    day: [],
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const appointments = getAppointmentsForDay(state, state.day)

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });

    console.log(id, interview)

    return axios.put(`api/appointments/${id}`, {interview})
      .then(res => {
        setState({...state, appointments});
      })
      .catch(e => console.error('ERROR FROM application.js ===>', e))
  };

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewerList = getInterviewersForDay(state, state.day)

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
        interviewers={interviewerList}
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
        {schedule} 
      </section>
    </main>
  );
};