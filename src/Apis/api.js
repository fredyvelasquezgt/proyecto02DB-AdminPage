const BASE_URL = ''

async function callApi(endpoint, options = {}) {
  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8000',
    'Access-Control-Allow-Credentials': 'true',
  }
  options.credentials = 'include'
  const url = BASE_URL + endpoint
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}
const api = {
  agregarPelicula: {
    agregar(params) {
      return callApi(`/movies/nuevo`, {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },
    modificar(params) {
      return callApi(`/movies/actualizar`, {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },
    eliminar(params) {
      return callApi(`/movies/eliminar`, {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },
  },
  usuarios: {
    modificar(params) {
      return callApi(`/users/editar`, {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },
    darDeBaja(params) {
      return callApi(`/users/eliminar`, {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },
  },
  anunciate: {
    modificar(params) {
      return callApi(`/ads/actualizar`, {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },
    agregar(params) {
      return callApi(`/ads/nuevo`, {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },
    eliminar(params) {
      return callApi(`/ads/eliminar`, {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },
  },
  reportes: {
    mostrar(params) {
      return callApi(`/reportes`, {
        method: 'POST',
        body: JSON.stringify(params),
      })
    },
  },
}

export default api
