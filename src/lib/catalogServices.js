const baseUrl = process.env.REACT_APP_BASE_URL

export const getFeaturedCar = () => {
  return fetch(baseUrl + 'carOfTheWeek')
    .then(res => res.json())
}

export const getMakes = () => {
  return fetch(baseUrl + 'makes')
   .then(res => res.json())
}

export const getModels = () => {
  return fetch(baseUrl + 'models')
   .then(res => res.json())
}
