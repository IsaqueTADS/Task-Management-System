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
import useForm from "@/hooks/use-form";
import Error from "@/helpers/error";
import React from "react";
import { useFetch } from "@/hooks/use-fetch";
import { useUser } from "@/context/user-context";
import { REGISTER_USER_POST } from "@/config/api";
import { ButtonLoading } from "./button-loading";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const username = useForm(false);
  const email = useForm("email");
  const password = useForm("password");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const { request, loading, error } = useFetch();
  const { loginUser } = useUser();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const { url, options } = REGISTER_USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    if (
      password.value === repeatPassword &&
      email.validate() &&
      password.validate()
    ) {
      const { response } = await request(url, options);

      if (response.ok) {
        loginUser(email.value, password.value);
      }
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Preencha o formulário abaixo para criar sua conta
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="username">Nome completo</FieldLabel>
          <Input
            id="username"
            type="text"
            placeholder="Isaque TADS"
            autoComplete="username"
            required
            value={username.value}
            onChange={username.onChange}
            onBlur={username.onBlur}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="exemplo@dominio.com"
            autoComplete="email"
            required
            value={email.value}
            onChange={email.onChange}
            onBlur={email.onBlur}
          />
          <Error>{email.error}</Error>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Senha</FieldLabel>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            value={password.value}
            onChange={password.onChange}
            onBlur={password.onBlur}
          />
          <Error>{password.error}</Error>
          <FieldDescription>Deve ter pelo menos 8 caracteres.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirmar senha</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            required
            value={repeatPassword}
            onChange={({ target }) => {
              setRepeatPassword(target.value);
              if (password.value === target.value) {
                setMessage("");
              } else {
                setMessage("As senhas não coicidem");
              }
            }}
            onBlur={({ target }) =>
              password.value === target.value
                ? setMessage("")
                : setMessage("As senhas não coicidem")
            }
          />
          <Error>{message}</Error>
          <FieldDescription>Por favor, confirme sua senha.</FieldDescription>
        </Field>
        <Field>
          {loading ? (
            <ButtonLoading>Registrando</ButtonLoading>
          ) : (
            <Button type="submit">Criar conta</Button>
          )}

          <Error>{error}</Error>
          <FieldDescription className="px-6 text-center">
            Já tem uma conta? <Link to={"/login"}>Entrar</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
