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
import Error from "@/helpers/error";
import useForm from "@/hooks/use-form";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const email = useForm("email");
  const password = useForm(false);

  const { loginUser, loading, error } = useUser();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (email.validate() && password.validate())
      loginUser(email.value, password.value);
  }

  return (
    <form
      noValidate
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
            value={email.value}
            onChange={email.onChange}
            onBlur={email.onBlur}
            placeholder="m@example.com"
            autoComplete="email"
            required
          />
          <Error>{email.error}</Error>
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
            value={password.value}
            onChange={password.onChange}
            onBlur={password.onBlur}
            autoComplete="current-password"
            required
          />
          <Error>{password.error}</Error>
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
            Não tem uma conta? <Link to={"/auth/signup"}>Cadastrar-se</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
