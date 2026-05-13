export interface TrackLevel {
  id: string
  name: string
  isLocked: boolean
}

export interface Track {
  id: string
  name: string
  levels: TrackLevel[]
  semesters: number
}

export const tracks: Track[] = [
  {
    id: "adab-arabi",
    name: "أدب عربي",
    levels: [
      {
        id: "mutawassit",
        name: "متوسط",
        isLocked: true,
      },
      {
        id: "ibtida-i",
        name: "ابتدائي",
        isLocked: false,
      },
    ],
    semesters: 2,
  },
]

export function getTrackById(id: string): Track | undefined {
  return tracks.find((t) => t.id === id)
}

export function getAvailableLevels(trackId: string): TrackLevel[] {
  const track = getTrackById(trackId)
  return track ? track.levels : []
}
