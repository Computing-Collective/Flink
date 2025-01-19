import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_URL } from "@/App";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  if (localStorage.getItem("userId")) {
    window.location.href = "/";
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signup, setSignup] = useState(false);
  const { toast } = useToast();

  async function handleLogin() {
    let route = "login";
    if (signup) {
      if (!name) {
        toast({
          title: "Name is required",
        });
        return;
      }
      route = "signup";
    }
    const response = await fetch(`${API_URL}/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const json = await response.json();

    if (response.ok) {
      const userId = json.id;
      const name = json.name;
      console.log(userId, name);

      if (userId && name) {
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", name);
      }

      window.location.href = "/";
    } else {
      toast({
        title: json.detail,
      });
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {signup ? "Sign up" : "Login"}
          </CardTitle>
          <CardDescription>
            Enter your email below to {signup ? "sign up for" : "login to"} your
            account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <div className="flex items-center">Name</div>
                {signup ? (
                  <Input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled
                  />
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-start">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}>
                {signup ? "Sign up" : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <span
                className="underline underline-offset-4 hover:cursor-pointer text-blue-500"
                onClick={() => {
                  setSignup((prevState) => !prevState);
                }}>
                {!signup ? "Sign up" : "Login"}
              </span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
