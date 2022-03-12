// retourne les ressources dispo à claim, pour le moment le temps est en minutes 
export const getClaimableAmount = (productionRate: number | undefined, lastClaimTime: number | undefined) => {
  if(productionRate === undefined|| lastClaimTime === undefined)
    return 0
  return 100
  //return (new Date(Date.now()).getTime() - new Date(lastClaimTime).getTime()) 
  //return Math.round(((Date.now() - lastClaimTime))) * productionRate / 6000;
}

export const formatAddress = (address: string | undefined): string => {
  return address ? address.substring(0, 4) + "...." + address.substring(42 - 4) : ""
}