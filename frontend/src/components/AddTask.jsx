import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";
import { useState } from "react";

import {
  Button,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

import { toast } from "react-toastify";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [assignedto, setAssignedto] = useState("");
  const [staffs, setStaffs] = React.useState([]);

  const handleChange = (event) => {
    setAssignedto(event.target.value);
  };

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios.get("/users/getstaffs", config).then((res) => {
      console.log(res.data.staffs);
      setStaffs(res.data.staffs);
    });
  }, []);

  return (
    <div>
      <div className="form-title row justify-content-center mb-2 p-2">
        <h2 className="text-center m-0">Task</h2>
      </div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 0, pb: 2 },
          // width: 762,
          maxWidth: "100%",
        }}
        noValidate
        autoComplete="off"
      >
        <div className="row">
          <TextField
            required
            id="outlined-required fullWidth"
            fullWidth
            label="Title"
            width="100%"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <TextField
            required
            multiline
            rows={4}
            maxRows={6}
            id="outlined-required outlined-multiline-static"
            label="Description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Assigned To</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={assignedto}
              label="Assigned To"
              onChange={handleChange}
            >
              {staffs.map((staff) => (
                <MenuItem value={staff._id}>{staff.username}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            className="mt-2 fs-5 fw-bold"
            variant="contained"
            endIcon={<AddCircleIcon className="fs-3" />}
            data-test="add-btn"
          >
            Add Task
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default AddTask;
