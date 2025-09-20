"use client";

import { Pen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { deleteTodoAction } from "@/actions/todo";
import Spin from "./Spin";
import EditTodoForm from "./EditTodoForm";
import { set } from "zod";
import { ITodo } from "@/interface";


const TodosTableActions = ({todo}: {todo: ITodo} ) => {
        const [loading, setLoading] = useState(false);
        const [open, setOpen] = useState(false);

    return(
        <div className="flex space-x-2">
                <EditTodoForm todo={todo}/>
                <Button size={"icon"} variant={"destructive"} onClick={ async () => {
                    setLoading(true);
                    await deleteTodoAction({id: todo.id});
                    setLoading(false);
                }}>
                    {loading ? <Spin/> : <Trash size={16}/>}
                </Button>
        </div>
        )
}

export default TodosTableActions