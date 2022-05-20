import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "./Utils/Common";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const firstname = useFormInput("");
  const lastname = useFormInput("");
  const nickname = useFormInput("");

  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    if (!firstname.value) {
      setError("Please fill the firstname !!!");
    } else if (!lastname.value) {
      setError("Please fill the lastname !!!");
    } else {
      setError(null);
      setLoading(true);
      axios
        .post("http://localhost:3000/api/createUsers", {
          userData: {
            firstName: firstname.value,
            lastName: lastname.value,
            nickName: nickname.value,
          },
        })
        .then((response) => {
          setLoading(false);
          setUserSession(response.data.token, response.data.user);
          props.history.push("/dashboard");
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 401)
            setError(error.response.data.message);
          else setError("Something went wrong. Please try again later.");
        });
    }
  };

  return (
    <div>
      Login
      <br />
      <br />
      <div>
        First Name
        <br />
        <input type="text" {...firstname} />
      </div>
      <div style={{ marginTop: 10 }}>
        Last Name
        <br />
        <input type="text" {...lastname} />
      </div>
      <div style={{ marginTop: 10 }}>
        Nick Name
        <br />
        <input type="text" {...nickname} />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
      <input
        type="button"
        value={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
      <br />
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
