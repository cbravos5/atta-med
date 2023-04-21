export const fullDateParser = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium",
});

export const shortDatParser = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
});

export const timeParser = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});
