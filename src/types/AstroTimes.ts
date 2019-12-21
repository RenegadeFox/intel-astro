export interface SunTimes {
  rise: Date
  set: Date
  bmnt: Date
  eent: Date
}

export interface MoonTimes {
  rise: Date
  set: Date
  alwaysUp: boolean
  alwaysDown: boolean
  illumination: number
}

export interface AstroCard {
  date: Date
  sun: SunTimes
  moon: MoonTimes
}
