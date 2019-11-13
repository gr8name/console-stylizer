export enum ColorsPalette {
  black,
  blue,
  cyan,
  default,
  green,
  magenta,
  red,
  white,
  yellow
}

export type Color = {
  [propName in ColorsPalette]: string
};
