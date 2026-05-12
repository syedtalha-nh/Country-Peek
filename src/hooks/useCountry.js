import {
  useEffect,
  useState,
} from 'react'

export function useCountry(code) {
  const [country, setCountry] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)

    fetch(
      `https://restcountries.com/v3.1/alpha/${code}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            'Failed to fetch country.'
          )
        }

        return res.json()
      })
      .then((data) => {
        setCountry(data[0])
        setError(null)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [code])

  return {
    country,
    loading,
    error,
  }
}