import React, { useState } from 'react'
import { Paper, Typography, Checkbox, Button, Stack, TextField } from "@mui/material"
import { Delete, Edit } from "@mui/icons-material"

type PropsType = {
    todo: TodoItemType
    deleteHandler: (id: TodoItemType["id"]) => void;
    completeHandler: (id: TodoItemType["id"]) => void;
    editHandler: (id: TodoItemType["id"], newTitle: TodoItemType["title"]) => void;
}

const TodoItem = ({ todo, completeHandler, deleteHandler, editHandler }: PropsType) => {

    const [editActive, setEditActive] = useState<boolean>(false);
    const [textVal, setTextVal] = useState<TodoItemType["title"]>(todo.title)

    return (
        <div>
            <Paper sx={{
                padding: "1rem"
            }}>

                <Stack direction={"row"} alignItems={"center"}>
                    {
                        editActive ? (
                            <TextField
                                value={textVal}
                                onChange={(e) => setTextVal(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && textVal !== "") {
                                        editHandler(todo.id, textVal);
                                        setEditActive(false)
                                    };
                                }}
                            />
                        ) : (
                            <Typography marginRight={"auto"}>{todo.title}</Typography>
                        )
                    }

                    <Checkbox
                        checked={todo.isCompleted}
                        onChange={() => completeHandler(todo.id)} />
                    <Button
                        onClick={() => deleteHandler(todo.id)}
                        sx={{ opacity: 0.5, color: "black" }}><Delete /></Button>
                    <Button sx={{
                        fontWeight: "600"
                    }}
                        onClick={() => {
                            setEditActive(prev => !prev)
                            if (editActive) {
                                editHandler(todo.id, textVal);
                                setEditActive(false)
                            }
                        }}

                    >
                        {
                            editActive ? "Done" : "Edit"
                        }
                    </Button>
                </Stack>
            </Paper>
        </div>
    )
}

export default TodoItem
