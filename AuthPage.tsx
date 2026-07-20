import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "./toaster";
import { Home, LogIn, UserPlus } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "./form";
import { useAuth } from "./context/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});
const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Enter your name"),
});

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const isLogin = mode === "login";

  const form = useForm<{ name?: string; email: string; password: string }>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (values: { name?: string; email: string; password: string }) => {
    if (isLogin) {
      login(values.email);
      toast.success("Welcome back!");
    } else {
      register(values.name!, values.email);
      toast.success("Account created — welcome to Homzy!");
    }
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gradient-soft px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-card p-8 shadow-elevated">
        <div className="mb-6 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-accent shadow-glow">
            <Home className="h-6 w-6 text-white" strokeWidth={2.5} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold text-primary">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isLogin ? "Log in to access saved homes and inquiries." : "Save properties, track inquiries, and more."}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            )}
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" placeholder="jane@email.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="w-full rounded-full bg-gradient-accent text-white">
              {isLogin ? <><LogIn className="h-4 w-4" /> Log in</> : <><UserPlus className="h-4 w-4" /> Create account</>}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>Don't have an account? <Link to="/register" className="font-medium text-accent hover:underline">Register</Link></>
          ) : (
            <>Already have an account? <Link to="/login" className="font-medium text-accent hover:underline">Log in</Link></>
          )}
        </p>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Demo mode — any email and a 6+ char password works.
        </p>
      </div>
    </div>
  );
}
