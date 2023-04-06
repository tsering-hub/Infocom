import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddTask from "../components/AddTask";
import axios from "axios";
import { toast } from "react-toastify";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const Admin = () => {
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios.get("/task/getbyadmin", config).then((res) => {
      console.log(res.data);
      setTasks(res.data.data);
    });
    axios.get("/users/admin", config).then((res) => {
      console.log(res.data);
      setName(res.data.user.name);
    });
  }, []);

  const deletetask = (id, e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/task/delete/${id}`, config)
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
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
      <div>
        <h1>Hey {name}</h1>
        <button className="btn btn-block" onClick={handleOpen}>
          <FaPlus /> Add New Task
        </button>
      </div>
      <div className="bg-light">
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Assigned To</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {tasks.map((row) => (
              <tr key={row._id}>
                <td>
                  <p className="fw-bold mb-1">{row.assignedto.username}</p>
                </td>
                <td>
                  <p className="fw-normal mb-1">{row.title}</p>
                </td>

                <td style={{ wordBreak: "break-all" }}>
                  <p className="text-justify">{row.desc} </p>
                </td>
                <td>
                  {(row.status == "pending" && (
                    <MDBBadge color="warning" pill>
                      {row.status}
                    </MDBBadge>
                  )) ||
                    (row.status == "started" && (
                      <MDBBadge color="info" pill>
                        {row.status}
                      </MDBBadge>
                    )) ||
                    (row.status == "completed" && (
                      <MDBBadge color="success" pill>
                        {row.status}
                      </MDBBadge>
                    ))}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => deletetask(row._id, e)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddTask></AddTask>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Admin;
