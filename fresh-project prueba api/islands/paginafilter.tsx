import type { Signal } from "@preact/signals";
import { Button } from "../components/Button.tsx";
import { useEffect, useState } from "preact/hooks";
import { characterProps } from "../types.tsx";
import { Personaje } from "../components/character.tsx";
import { FunctionalComponent } from "https://esm.sh/v128/preact@10.19.6/src/index.js";
import { dev } from "$fresh/src/dev/dev_command.ts";


const Pagefilter: FunctionalComponent = () => {
  const [filters, setFilters] = useState<
    { sexo: string | null; estado: string | null; tipo: string | null }
  >({
    sexo: null,
    estado: null,
    tipo: null,
  });
  const [sexo, setSexo] = useState<string>();
  const [personajes, setPersonajes] = useState<characterProps[]>([]);
  const [personajes2, setPersonajes2] = useState<characterProps[]>([]);
  let contadorsexo: number = 0;
  let constadorestado: number = 0;

  useEffect(() => {
    fetchpj();
  }, []);
  const fetchpj = async () => {
    const results = await fetch("https://rickandmortyapi.com/api/character");
    const data = await results.json();

    setPersonajes(data.results);
    setPersonajes2(data.results);
  };
  useEffect(() => {
    function sexonombre(value: string) {
      return value == filters.sexo;
    }
    function statusnombre(value: string) {
      return value == filters.estado;
    }
    if (filters.tipo == "sexo") {
      if (filters.sexo == null || filters.sexo == "") {
        if (filters.estado != null && filters.estado != "") {
          const arraytemporal = personajes2.filter((characer) =>
            statusnombre(characer.status)
          );
          setPersonajes(arraytemporal);
        } else {
          setPersonajes(personajes2);
        }
      } else if (filters.estado != null && filters.estado != "") {
        const arraytemporal = personajes2.filter((characer) =>
          statusnombre(characer.status)
        ).filter((charter) => sexonombre(charter.gender));
        setPersonajes(arraytemporal);
      } else {
        const arraytemporal = personajes2.filter((characer) =>
          sexonombre(characer.gender)
        );
        setPersonajes(arraytemporal);
      }
    } else if (filters.tipo == "status") {
      if (filters.estado == null || filters.estado == "") {
        if (filters.sexo != null && filters.sexo != "") {
          const arraytemporal = personajes2.filter((characer) =>
            sexonombre(characer.gender)
          );
          setPersonajes(arraytemporal);
        } else {
          setPersonajes(personajes2);
        }
      } else if (filters.sexo != null && filters.sexo != "") {
        const arraytemporal = personajes2.filter((characer) =>
          sexonombre(characer.gender)
        ).filter((charter) => statusnombre(charter.status));
        setPersonajes(arraytemporal);
      } else {
        const arraytemporal = personajes2.filter((characer) =>
          statusnombre(characer.status)
        );
        setPersonajes(arraytemporal);
      }
    }
  }, [filters]);

  function filterchangeHandler(cambio: string, tipodecambio: string) {
    if (tipodecambio == "sexo") {
      setFilters({ sexo: cambio, estado: filters.estado, tipo: tipodecambio });
    } else {
      setFilters({ sexo: filters.sexo, estado: cambio, tipo: tipodecambio });
    }
  }
  return (
    <div>
      <label for="sex">Elige un sexo:</label>
      <select
        name="sex"
        id="sex"
        onChange={(e) => filterchangeHandler(e.currentTarget.value, "sexo")}
      >
        <option value="">Ninguno</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="unknown">Unknown</option>
      </select>
      <label for="status">Elige un estado:</label>
      <select
        name="status"
        id="status"
        onChange={(e) => filterchangeHandler(e.currentTarget.value, "status")}
      >
        <option value="">Ninguno</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <div className="gridpj">
        {personajes &&
          personajes.map((char) => (
            <Personaje
              name={char.name}
              image={char.image}
            >
              {char}
            </Personaje>
          ))}
      </div>
    </div>
  );
  debugger;
};

export default Pagefilter;
