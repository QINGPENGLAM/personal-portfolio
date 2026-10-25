/** Return the project nearest the horizontal viewport's center. */
export function nearestProject(centers: readonly number[], focus: number) {
  let nearest = 0
  let distance = Infinity
  centers.forEach((center, index) => {
    const next = Math.abs(center - focus)
    if (next < distance) { distance = next; nearest = index }
  })
  return nearest
}
