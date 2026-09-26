const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export function getPlan() {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(PLAN_KEY);

  return data ? JSON.parse(data) : [];
}

export function getSaved() {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(SAVED_KEY);

  return data ? JSON.parse(data) : [];
}

export function savePlan(plan) {
  localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
}

export function saveSaved(saved) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
}

export function addToPlan(workout) {
  const plan = getPlan();

  if (plan.length >= 5) {
    return {
      success: false,
      message: "Today's plan is full.",
    };
  }

  const exists = plan.some(
    (item) => String(item.id) === String(workout.id)
  );

  if (exists) {
    return {
      success: false,
      message: "Workout is already in today's plan.",
    };
  }

  const updatedPlan = [...plan, workout];

  savePlan(updatedPlan);

  return {
    success: true,
    message: "Added to today's plan.",
  };
}

export function addToSaved(workout) {
  const saved = getSaved();

  const exists = saved.some(
    (item) => String(item.id) === String(workout.id)
  );

  if (exists) {
    return {
      success: false,
      message: "Workout is already saved.",
    };
  }

  const updatedSaved = [...saved, workout];

  saveSaved(updatedSaved);

  return {
    success: true,
    message: "Saved for later.",
  };
}