import React, { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignUpPage";

export default function App() {
  const [route, setRoute] = useState("home"); // 'home' | 'signup' | 'login' | 'feed'
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (stored) {
      setCurrentUser(stored);
      setRoute("feed");
    } else {
      setRoute("home");
    }
  }, []);

  function handleSignupSuccess(userObj) {
    // userObj should follow Users schema
    localStorage.setItem("currentUser", JSON.stringify(userObj));
    setCurrentUser(userObj);
    setRoute("feed");
  }

  function handleSigninSuccess(userObj) {
    localStorage.setItem("currentUser", JSON.stringify(userObj));
    setCurrentUser(userObj);
    setRoute("feed");
  }

  function handleSignOut() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setRoute("home");
  }

  return (
    <div>
      {route === "home" && (
        <HomePage
          onSignup={() => setRoute("signup")}
          onSignin={() => setRoute("login")}
        />
      )}

      {route === "signup" && (
        <SignupPage
          onBack={() => setRoute("home")}
          onSignupSuccess={(user) => handleSignupSuccess(user)}
        />
      )}

      {route === "login" && (
        <LoginPage
          onBack={() => setRoute("home")}
          onSigninSuccess={(user) => handleSigninSuccess(user)}
        />
      )}

      {route === "feed" && currentUser && (
        <div style={{ maxWidth: 900, margin: "20px auto", padding: 12 }}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1 style={{ margin: 0 }}>Feed</h1>
              <div style={{ color: "#555" }}>
                Welcome, {currentUser.FullName || currentUser.Email} —{" "}
                <strong>{currentUser.Role || "Employee"}</strong>
              </div>
            </div>
            <div>
              <button
                onClick={handleSignOut}
                style={{ padding: "6px 10px", borderRadius: 6 }}
              >
                Sign out
              </button>
            </div>
          </header>

          <main style={{ marginTop: 20 }}>
            <p>
              This is a placeholder Feed. Later it will load posts from the
              backend.
            </p>
          </main>
        </div>
      )}
    </div>
  );
}
