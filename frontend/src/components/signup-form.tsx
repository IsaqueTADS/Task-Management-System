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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const username = useForm(false);
  const email = useForm("email");
  const password = useForm("password");
  const repeatPassword = useForm(false);

  return (
    <form
      noValidate
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
            value={repeatPassword.value}
            onChange={repeatPassword.onChange}
            onBlur={repeatPassword.onBlur}
          />
          <FieldDescription>Por favor, confirme sua senha.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Criar conta</Button>
          <FieldDescription className="px-6 text-center">
            Já tem uma conta? <Link to={"/login"}>Entrar</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
