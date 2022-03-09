// retourne les ressources dispo à claim, pour le moment le temps est en minutes 
export const getClaimableAmount = (productionRate: number | undefined, lastClaimTime: Date | undefined) => {
  if(productionRate === undefined|| lastClaimTime === undefined)
    return 0
  return ((Date.now() - lastClaimTime.getMilliseconds()) / 60000) 
}