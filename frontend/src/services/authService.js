const users = JSON.parse(localStorage.getItem('users')) || [];

export const signup = (email, password) => {
  if (users.find(user => user.email === email)) {
    throw new Error('User already exists!');
  }
  const newUser = { email, password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return { email };
};

export const login = (email, password) => {
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) throw new Error('Invalid credentials!');
  localStorage.setItem('loggedInUser', email);
  return { email };
};

export const logout = () => {
  localStorage.removeItem('loggedInUser');
};

export const getCurrentUser = () => {
  return localStorage.getItem('loggedInUser');
};
