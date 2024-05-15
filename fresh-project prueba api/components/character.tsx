import { JSX } from "preact";
import {characterProps} from "../types.tsx"

export function Personaje(props: characterProps) {
  const { name, image } = props;

  return (
    <div className="Tipopj">
      <h1>{name}</h1>
      <img src={image} alt={name} />
    </div>
  );
}

