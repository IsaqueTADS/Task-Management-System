import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import React from "react";
import { useUser } from "@/context/user-context";
import { ButtonLoading } from "./button-loading";
import Error from "@/helpers/Error";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { loginUser, loading, error } = useUser();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    loginUser(email, password);
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Faça login na sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Digite seu e-mail para fazer login na sua conta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={({ currentTarget }) => setEmail(currentTarget.value)}
            placeholder="m@example.com"
            autoComplete="email"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Senha</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={({ currentTarget }) => setPassword(currentTarget.value)}
            autoComplete="current-password"
            required
          />
        </Field>
        <Field>
          {loading ? (
            <ButtonLoading>Logando</ButtonLoading>
          ) : (
            <Button type="submit">Login</Button>
          )}
          <FieldDescription>
            <Error>{error}</Error>
          </FieldDescription>
          <FieldDescription className="text-center">
            Não tem uma conta? <Link to={"/signup"}>Cadastrar-se</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
