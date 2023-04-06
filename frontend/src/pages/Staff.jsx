import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { toast } from "react-toastify";

const Staff = () => {
  const [name, setName] = useState("");
  const [pendingtasks, setPendingTasks] = useState([]);
  const [startedtasks, setStartedTasks] = useState([]);
  const [completedtasks, setCompletedTasks] = useState([]);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    axios.get("/task/getpendingtask", config).then((res) => {
      console.log(res.data);
      setPendingTasks(res.data.data);
    });
    axios.get("/task/getstartedtask", config).then((res) => {
      console.log(res.data);
      setStartedTasks(res.data.data);
    });
    axios.get("/task/getcompletedtask", config).then((res) => {
      console.log(res.data);
      setCompletedTasks(res.data.data);
    });
    axios.get("/users/staff", config).then((res) => {
      console.log(res.data);
      setName(res.data.user.name);
    });
  }, []);

  const starttask = (id, e) => {
    e.preventDefault();
    const data = {
      id: id,
      status: "started",
    };

    axios
      .put("http://localhost:5000/task/updatestatus", data, config)
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          toast.success(
            result.data.msg,
            setTimeout(() => {
              window.location.reload();
            }, 1500)
          );
        } else {
          toast.error("Somthing went wrong!", {
            autoClose: 4000,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.response.data.message);
      });
  };

  const completetask = (id, e) => {
    e.preventDefault();
    const data = {
      id: id,
      status: "completed",
    };

    axios
      .put("http://localhost:5000/task/updatestatus", data, config)
      .then((result) => {
        console.log(result);
        if (result.status === 201) {
          toast.success(
            result.data.msg,
            setTimeout(() => {
              window.location.reload();
            }, 1500)
          );
        } else {
          toast.error("Somthing went wrong!", {
            autoClose: 4000,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.response.data.message);
      });
  };
  return (
    <>
      <h1>Hey {name}</h1>
      <div className="d-flex flex-row">
        <MDBCard style={{ width: "900px", margin: "0px 15px" }}>
          <MDBCardBody className="bg-primary bg-gradient text-white">
            <h3>To Do Task</h3>
            <MDBListGroup style={{ minWidth: "100%" }}>
              {pendingtasks.map((row) => (
                <MDBListGroupItem className="m-1 d-flex flex-column justify-content-between align-items-center">
                  <div
                    className="ms-2 me-auto"
                    style={{ minWidth: "100%", wordBreak: "break-all" }}
                  >
                    <div className="fw-bold">{row.title}</div>
                    <p>{row.desc}</p>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={(e) => starttask(row._id, e)}
                  >
                    Start
                  </button>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>
        <MDBCard style={{ width: "900px", margin: "0px 15px" }}>
          <MDBCardBody className="bg-warning bg-gradient text-white">
            <h3>Doing</h3>
            <MDBListGroup style={{ minWidth: "100%" }}>
              {startedtasks.map((row) => (
                <MDBListGroupItem className="m-1 d-flex flex-column justify-content-between align-items-center">
                  <div
                    className="ms-2 me-auto"
                    style={{ minWidth: "100%", wordBreak: "break-all" }}
                  >
                    <div className="fw-bold">{row.title}</div>
                    <p>{row.desc}</p>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={(e) => completetask(row._id, e)}
                  >
                    Completed
                  </button>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>
        <MDBCard style={{ width: "900px", margin: "0px 15px" }}>
          <MDBCardBody className="bg-success bg-gradient text-white">
            <h3>Completed</h3>
            <MDBListGroup style={{ minWidth: "100%" }}>
              {completedtasks.map((row) => (
                <MDBListGroupItem className="m-1 d-flex justify-content-between align-items-center">
                  <div
                    className="ms-2 me-auto"
                    style={{ minWidth: "100%", wordBreak: "break-all" }}
                  >
                    <div className="fw-bold">{row.title}</div>
                    <p>{row.desc}</p>
                  </div>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </MDBCardBody>
        </MDBCard>
      </div>
    </>
  );
};

export default Staff;
