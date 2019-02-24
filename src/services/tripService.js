import http from "./httpService";

const apiEndpoint = "/trips";

function tripUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getTrips() {
  return http.get(apiEndpoint);
}

export function getTrip(tripId) {
  return http.get(tripUrl(tripId));
}

export function saveTrip(trip) {
  if (trip._id) {
    const body = { ...trip };
    delete body._id;
    return http.put(tripUrl(trip._id), body);
  }

  return http.post(apiEndpoint, trip);
}

export function deleteTrip(tripId) {
  return http.delete(tripUrl(tripId));
}
