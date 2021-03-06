# Interview Scheduler

Interview scheduler is a full stack web application that allows users to book, delete, and modify interviews between a student and a set of interviewers between the working hours of LHL 12-5PM.

It also works using web sockets to allow for a smooth UI if multiple users are on the platform at once, providing live updates to all users!

## Dependencies

- axios 0.19.x or higher
- classnames 2.2.x or higher
- normalize.css 8.0.x or higher
- react 16.9.x or higher
- react-dom 16.9.x or higher
- react-scripts 3.4.x or higher
- cypress ^4.4.x or higher
- node-sass ^4.13.x or higher
- prop-types ^15.7.x or higher
- react-test-renderer ^16.13.x or higher
- babel-core
- @testing-library/react
- @storybook/react

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Test Server Database For Cypress Visual E2E Tests

```sh
npm run test:server
```


## Final Product

- Access the live app on Netlify here... 
```sh
https://bootcamp-scheduler.netlify.app/
```
- Access the JSON for the api/days here... 
```sh
https://bootcamp-scheduler.herokuapp.com/api/days
```
- Access the JSON for the api/appointments here... 
```sh
https://bootcamp-scheduler.herokuapp.com/api/appointments
```
- Access the JSON for the api/interviewers here... 
```sh
https://bootcamp-scheduler.herokuapp.com/api/interviewers
```

!["Screenshot of an Empty Interview Schedule on Load"](https://github.com/bmark88/scheduler/blob/master/docs/load_empty_schedule.png)
!["Screenshot of Adding an Interview"](https://github.com/bmark88/scheduler/blob/master/docs/add_appointment_form.png)
!["Screenshot of Confirmation to Delete an Interview"](https://github.com/bmark88/scheduler/blob/master/docs/delete_appointment_confirmation.png)
