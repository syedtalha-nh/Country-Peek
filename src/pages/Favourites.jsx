import CountryCard from '../components/CountryCard'

import { useFavourites } from '../context/FavouritesContext'

function Favourites() {
  const { favourites } =
    useFavourites()

  return (
    <div className="home">
      <h2
        style={{ paddingBottom: '1rem' }}
      >
        Favourite Countries
      </h2>

      {favourites.length === 0 ? (
        <p className="home__status">
          No favourites added yet.
        </p>
      ) : (
        <div className="cards-grid">
          {favourites.map((country) => (
            <CountryCard
              key={country.cca3}
              country={country}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favourites