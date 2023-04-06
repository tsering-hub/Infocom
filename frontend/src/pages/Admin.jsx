import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import AddTask from "../components/AddTask";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div>
        <h1>Hey Tsering</h1>
        <button className="btn btn-block" onClick={handleOpen}>
          <FaPlus /> Add New Task
        </button>
      </div>
      <div className="p-1 bg-light d-flex flex-row align-items-center">
        <div>
          <h3>Task: </h3>
          <p className="text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            repellat perspiciatis cupiditate commodi, consequuntur in quis
            necessitatibus quos tenetur, accusantium, adipisci labore. Animi,
            suscipit! Cupiditate aut ipsum ipsa ab assumenda.
          </p>
          <h4>Status: </h4>
          <h4>Assigned to:</h4>
        </div>
        <div>
          <button className="btn btn-danger">
            <FaTrash /> Delete
          </button>
        </div>
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
