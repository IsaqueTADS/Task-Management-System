export function getMonthAndYearCurrent() {
  const date = new Date();
  const month = date.toLocaleDateString("pt-BR", {
    month: "long",
  });
  const year = date.toLocaleDateString("pt-BR", {
    year: "numeric",
  });

  return { month, year };
}
