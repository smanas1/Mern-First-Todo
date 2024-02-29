"use client";
import Image from "next/image";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { FaRegCircleCheck } from "react-icons/fa6";
import { CiEdit, CiLineHeight } from "react-icons/ci";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function Home() {
  const [todos, setTodos] = React.useState<any>([]);
  const [todo, setTodo] = React.useState("");
  const [todoId, setTodoId] = React.useState("");
  const [update, setUpdate] = React.useState<boolean>(false);
  const [reload, setReload] = React.useState(true);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // Apis handling

  // Get All Todos
  React.useEffect(() => {
    axios.get("http://localhost:8000/get").then((response) => {
      setTodos(response.data);
    });
    setTodo("");
  }, [reload]);

  // Post Todo

  const handleSubmit = () => {
    axios
      .post("http://localhost:8000/post", { todo: todo })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setTodo("");
    setReload(!reload);
  };

  // Update todos

  const handleUpdate = (item: any) => {
    setTodo(item.todo);
    setTodoId(item._id);
    setUpdate(true);
    console.log(item);
  };

  const handleUpdateSubmit = () => {
    axios
      .put(`http://localhost:8000/update/${todoId}`, { todo: todo })
      .then((res) => {
        setUpdate(false);
        setReload(!reload);
        console.log(res);
      });
  };

  // Handle Delete Todo

  const handleDelete = (item: any) => {
    axios.delete(`http://localhost:8000/delete/${item._id}`).then((res) => {
      setReload(!reload);
      console.log(res);
    });
  };

  console.log(todo);

  return (
    <>
      <Container maxWidth="sm">
        <div className="flex justify-center mt-5">
          <Typography variant="h4">Todo</Typography>
        </div>
        <div className="flex mt-7 justify-center  max-sm:items-center flex-wrap gap-5">
          <TextField
            id="outlined-basic"
            size="small"
            label="Todo"
            value={todo}
            variant="outlined"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />

          {update ? (
            <Button
              variant="outlined"
              color="success"
              className="max-sm:w-[223px]"
              onClick={handleUpdateSubmit}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="success"
              className="max-sm:w-[223px]"
              onClick={handleSubmit}
            >
              Add
            </Button>
          )}
        </div>
        {/* Table Contianer */}
        <div className="mt-9 ">
          <TableContainer component={Paper} sx={{ height: "70vh" }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Todo</StyledTableCell>

                  <StyledTableCell align="right">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((item: any) => (
                  <StyledTableRow key={item._id}>
                    <StyledTableCell component="th" scope="row">
                      {item.todo}
                    </StyledTableCell>

                    <StyledTableCell sx={{ display: "flex" }} align="right">
                      <div className="flex justify-between w-14">
                        <CiEdit
                          size={20}
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleUpdate(item)}
                        />
                        <FaRegCircleCheck
                          size={20}
                          className="text-green-700 cursor-pointer"
                          onClick={() => handleDelete(item)}
                        />
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </>
  );
}