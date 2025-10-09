"use client";


import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { todoFormSchema, todoFormValues } from "@/schema";
import { createTodoAction } from "@/actions/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import Spin from "./Spin";



const AddTodoForm = ({userId}: {userId: string | null}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const defaultValues: Partial<todoFormValues> = {
  title: "",
  body: "",
  completed: false,
}

const form = useForm<todoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
    mode: "onChange",
  })

const onSubmit = async ({title, body, completed}: todoFormValues) =>{
    setIsLoading(true);
    await createTodoAction({title, body, completed, userId});
    setIsLoading(false);
    setIsOpen(false);
};
    return(
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus />New Todo
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add your todo</DialogTitle>
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
                <Input placeholder="your todo" {...field} />
              </FormControl>
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
                  placeholder="Tell us a little bit about your todo"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
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

export default AddTodoForm