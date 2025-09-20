import { getUserTodoAction } from "@/actions/todo";
import AddTodoForm from "@/components/AddTodoForm";
import TodoTable from "@/components/TodoTable";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {

  const {userId} = await auth();
  const todos = await getUserTodoAction({userId});
  return (
    <div>
      <AddTodoForm userId={userId}/>
      <TodoTable todos={todos}/>
        
    </div>
  );
}
