function Initials(name: string) {
  const initials =
    name?.split(" ").length > 1
      ? name?.split("")[0] + name?.split("")[1][0]
      : name?.split("")[0];

  return initials;
}

function NameParts(name: string) {
  const nameFormated = name?.split(" ")[0] + " " + name?.split(" ")[1];

  return nameFormated;
}

export { Initials, NameParts };
