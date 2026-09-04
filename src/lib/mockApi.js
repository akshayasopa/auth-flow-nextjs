function getUsers() {
  const users = localStorage.getItem("mock_users");
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem("mock_users", JSON.stringify(users));
}

export function loginRequest(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const user = users.find((u) => u.email === email);

      if (!user) {
        reject({ message: "No account found with this email" });
        return;
      }

      if (user.password !== password) {
        reject({ message: "Incorrect password" });
        return;
      }

      resolve({ name: user.name, email: user.email });
    }, 1000);
  });
}

export function signupRequest(name, email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = getUsers();
      const existing = users.find((u) => u.email === email);

      if (existing) {
        reject({ message: "An account with this email already exists" });
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);
      saveUsers(users);

      resolve({ name: newUser.name, email: newUser.email });
    }, 1000);
  });
}