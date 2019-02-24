import http from "./httpService";

export function getShifts() {
  return http.get("/shifts");
}
