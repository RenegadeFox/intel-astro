// Object fetched from the City Geo-Location Lookup API server
export interface ApiCity {
  name: string // Full name (City, State/Country)
  type: string // City
  c: string // Country
  zmw: string // ???
  tz: string // Timezone
  tzs: string // Timezone string
  l: string // ???
  ll: string // Latitude and Longitude
  lat: string // Latitude
  lon: string // Longitude
}

// Local version of the ApiCity type
export interface City {
  isSet: boolean
  fullName: string
  city: string
  state: string
  lat: number
  long: number
}

// Geolocation interface
export interface GeoLoc {
  ip: string
  city: string
  region: string
  country: string
  loc: string
  postal: string
}
