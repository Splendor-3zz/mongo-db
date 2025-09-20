"use client";


import { Button } from "@/components/ui/button";
import { Pen, Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { todoFormSchema, todoFormValues } from "@/schema";
import { createTodoAction, updateTodoAction } from "@/actions/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Spin from "./Spin";
import { ITodo } from "@/interface";





interface IProps {

}

const EditTodoForm = ({todo}: {todo: ITodo}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const defaultValues: Partial<todoFormValues> = {
  title: todo.title,
  body: todo.body as string,
  completed: todo.completed,
}

const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  })

const onSubmit = async (data: todoFormValues) =>{
    setIsLoading(true);
    await updateTodoAction({id: todo.id, title: data.title, body: data.body as string, completed: data.completed});
    setIsLoading(false);
    setIsOpen(false);
};
    return(
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Pen size={16}/>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit your todo</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>title</FormLabel>
              <FormControl>
                <Input placeholder="go crazy" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>body</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="completed"
          render={({ field }) => (
            <FormItem className="flex">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
              </FormControl>
              <FormLabel>Completed</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

            <Button type="submit">{isLoading? <><Spin/> saving</> : "Save"}</Button>

        </form>
        </Form> 

          </div>
        </DialogContent>
    </Dialog>
        </div>
    )
}

export default EditTodoForm