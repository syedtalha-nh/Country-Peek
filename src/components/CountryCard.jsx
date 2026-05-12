import { Link } from 'react-router-dom'

import { useFavourites } from '../context/FavouritesContext'

function CountryCard({ country }) {
  const {
    addFavourite,
    removeFavourite,
    isFavourite,
  } = useFavourites()

  const favourite = isFavourite(
    country.cca3
  )

  function handleFavourite(e) {
    e.preventDefault()

    if (favourite) {
      removeFavourite(country.cca3)
    } else {
      addFavourite(country)
    }
  }

  return (
    <Link
      to={`/country/${country.cca3}`}
      className="card"
    >
      <img
        src={country.flags.svg}
        alt={country.name.common}
        className="card__flag"
      />

      <div className="card__body">
        <h3 className="card__name">
          {country.name.common}
        </h3>

        <p>
          <strong>Population:</strong>{' '}
          {country.population.toLocaleString()}
        </p>

        <p>
          <strong>Region:</strong>{' '}
          {country.region}
        </p>

        <p>
          <strong>Capital:</strong>{' '}
          {country.capital?.[0]}
        </p>

        <button
          className="fav-btn"
          onClick={handleFavourite}
        >
          {favourite
            ? 'Remove Favourite'
            : 'Add Favourite'}
        </button>
      </div>
    </Link>
  )
}

export default CountryCard