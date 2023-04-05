import { useState } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import axios from "axios";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post("/users/login", data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("userType", res.data.usertype);
          localStorage.setItem("token", res.data.token);
          toast.success("Login Successful");
        } else {
          toast.error("Login Unsuccessful");
        }
      })
      .catch((e) => {
        console.log(e.response.data.message);
        toast.error(e.response.data.message);
      });
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please Login to get Support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
