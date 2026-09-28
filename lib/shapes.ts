/**
 * The Evolve mark "grows corners" over time: square → quarter → leaf → drop → circle.
 * Reused across people pages so portraits echo the brand story.
 */
export const shapeClasses = [
  'rounded-[10px]',
  'rounded-[10px] rounded-tr-[999px]',
  'rounded-[10px] rounded-tr-[999px] rounded-bl-[999px]',
  'rounded-[10px] rounded-tl-[999px] rounded-tr-[999px] rounded-bl-[999px]',
  'rounded-full',
] as const

export const shapeRadii = [
  '4% 4% 4% 4%',
  '4% 50% 4% 4%',
  '4% 50% 4% 50%',
  '50% 50% 4% 50%',
] as const
