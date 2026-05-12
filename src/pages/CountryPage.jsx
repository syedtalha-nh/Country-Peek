import { useNavigate, useParams } from 'react-router-dom'

import { useCountry } from '../hooks/useCountry'

import { useFavourites } from '../context/FavouritesContext'
function CountryPage() {
  const { code } = useParams()

  const navigate = useNavigate()

  const {
    country,
    loading,
    error,
  } = useCountry(code)

  const {
    addFavourite,
    removeFavourite,
    isFavourite,
  } = useFavourites()

  if (loading) {
    return (
      <p className="page-status">
        Loading country...
      </p>
    )
  }

  if (error) {
    return (
      <p className="page-status page-status--error">
        {error}
      </p>
    )
  }

  if (!country) return null

  const favourite = isFavourite(
    country.cca3
  )

  const languages =
    Object.values(
      country.languages || {}
    ).join(', ')

  const currencies = Object.values(
    country.currencies || {}
  )
    .map((currency) => currency.name)
    .join(', ')

  return (
    <div className="country-page">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="country-page__layout">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="country-page__flag"
        />

        <div>
          <h1>
            {country.name.common}
          </h1>

          <p className="country-page__official">
            {country.name.official}
          </p>

          <div className="country-page__details">
            <div>
              <p>
                <strong>
                  Population:
                </strong>{' '}
                {country.population.toLocaleString()}
              </p>

              <p>
                <strong>
                  Region:
                </strong>{' '}
                {country.region}
              </p>

              <p>
                <strong>
                  Sub Region:
                </strong>{' '}
                {country.subregion}
              </p>

              <p>
                <strong>
                  Capital:
                </strong>{' '}
                {country.capital?.[0]}
              </p>
            </div>

            <div>
              <p>
                <strong>
                  Languages:
                </strong>{' '}
                {languages}
              </p>

              <p>
                <strong>
                  Currencies:
                </strong>{' '}
                {currencies}
              </p>

              <p>
                <strong>
                  Timezones:
                </strong>{' '}
                {country.timezones.join(
                  ', '
                )}
              </p>
            </div>
          </div>

          <div className="borders">
            {country.borders?.map(
              (border) => (
                <span
                  key={border}
                  className="border-badge"
                >
                  {border}
                </span>
              )
            )}
          </div>

          <button
            className="fav-btn"
            onClick={() => {
              if (favourite) {
                removeFavourite(
                  country.cca3
                )
              } else {
                addFavourite(country)
              }
            }}
          >
            {favourite
              ? 'Remove Favourite'
              : 'Add Favourite'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CountryPage