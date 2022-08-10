import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { HeroCard } from "../components";
import { useForm } from "../hooks/useForm";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);
  const heroes = getHeroesByName(q);
  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;
  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();
    // if (searchText.trim().length <= 1) return;

    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Busqueda</h1>
      <hr />
      <div className="row">
        <div className="col-5">
          <h4>Buscando...</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="text"
              placeholder="Buscar heroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-1">Buscar</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Resultados</h4>
          <hr />

          <div
            className="alert alert-primary animate__animated animate__fadeIn"
            style={{ display: showSearch ? "" : "none" }}
          >
            Buscar un Heroe.
          </div>

          <div
            className="alert alert-danger animate__animated animate__fadeIn"
            style={{ display: showError ? "" : "none" }}
          >
            Heroe <b>{q}</b> no existente.
          </div>

          {heroes.map((h) => (
            <HeroCard key={h.id} {...h} />
          ))}
          {/* <HeroCard /> */}
        </div>
      </div>
    </>
  );
};
