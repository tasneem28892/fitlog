# FitLog

FitLog is a dark, no-nonsense workout library web application where users can explore workouts, view workout details, add exercises to today's plan, and save workouts for later.

## Technologies Used

- Next.js
- React
- Tailwind CSS
- JavaScript
- Lucide React
- REST API
- LocalStorage

## Features

- Browse workouts from the workout library
- View detailed information for each workout
- Add workouts to today's plan
- Save workouts for later
- Track Plan and Saved workout counts from the navbar
- View today's workout plan and saved workouts
- Mark workouts as done or remove them from the plan
- Sort workouts by duration, calories, or rating
- Responsive design for mobile, tablet, and desktop
- Loading state while workouts are being fetched
- Toast notifications for workout actions
- LocalStorage support for maintaining plan and saved workouts

## Project Structure

```text
app/
├── components/
│   ├── Hero.js
│   ├── Navbar.js
│   ├── WorkoutCard.js
│   ├── WorkoutActions.js
│   ├── Workoutgrid.js
│   └── Footer.js
├── my-plan/
│   └── page.js
├── workout/
│   └── [id]/
│       └── page.js
├── globals.css
├── layout.js
└── page.js

lib/
├── api.js
└── storage.js