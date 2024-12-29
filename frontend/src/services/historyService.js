// historyService.js

let history = JSON.parse(localStorage.getItem('history')) || [];

export const addToHistory = (translation) => {
  // Add new translation to the history
  history = [translation, ...history];

  // Keep only the last 4 translations
  if (history.length > 4) {
    history = history.slice(0, 4);
  }

  // Store the updated history in localStorage
  localStorage.setItem('history', JSON.stringify(history));
};

export const getHistory = () => {
  // Return the current history from localStorage
  return history;
};
