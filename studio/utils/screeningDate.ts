type ScreeningDate = {
  startDate?: string
  startTime?: string
}

type Showtime = {
  screeningDate?: ScreeningDate
}

type ScreeningWithShowtimes = {
  showtimes?: Showtime[]
}

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/

export function getFirstShowtimeStartDate(
  doc: ScreeningWithShowtimes | null | undefined,
): Date | null {
  const first = doc?.showtimes?.[0]
  const startDate = first?.screeningDate?.startDate
  const startTime = first?.screeningDate?.startTime

  if (!startDate) return null

  const normalizedTime =
    typeof startTime === 'string' && timePattern.test(startTime) ? startTime : '00:00'
  const parsed = new Date(`${startDate}T${normalizedTime}:00`)

  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function getFirstShowtimeStartIso(
  doc: ScreeningWithShowtimes | null | undefined,
): string | null {
  return getFirstShowtimeStartDate(doc)?.toISOString() ?? null
}
