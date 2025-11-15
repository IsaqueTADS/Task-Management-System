import React from "react";

const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido",
  },
  password: {
    regex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "A senha precisa conter ao menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.",
  },
  number: {
    regex: /^\d+$/,
    message: "utilize apenas numero",
  },
};

type FieldType = keyof typeof types | false ;

export function useForm(type: FieldType) {
  const [value, setValue] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  function validate(value: string) {
    if (type === false) return true;

    if (value.length === 0) {
      setError("Preencha um valor");
      return false;
    }

    const validation = types[type];
    if (validation && !validation.regex.test(value)) {
      setError(validation.message);
      return false;
    }

    setError(null);
    return true;
  }

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
}

export default useForm;
