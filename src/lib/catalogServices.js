export const getFeaturedCar = () => {
  return fetch('http://localhost:8080/carOfTheWeek')
    .then(res => res.json())
}

export const getMakes = () => {
  return fetch('http://localhost:8080/makes')
   .then(res => res.json())
}

export const getModels = () => {
  return fetch('http://localhost:8080/models')
   .then(res => res.json())
}
