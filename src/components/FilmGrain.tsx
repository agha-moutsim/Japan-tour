import { memo } from 'react'

const FilmGrain = memo(function FilmGrain() {
  return (
    // Single div, strictly viewport-sized — no overflow, no negative offsets
    // The grain animates via background-position only, so no element movement needed
    <div
      className="film-grain"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999999,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    />
  )
})

export default FilmGrain
