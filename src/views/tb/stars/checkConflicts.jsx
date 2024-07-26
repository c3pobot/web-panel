import sorter from 'components/stableSort'
function getPossibleStar(conflict = {}, possiblePoints){
  if(!conflict.prefered && conflict['1'] > possiblePoints) return 0
  if(conflict.prefered && +possiblePoints >= conflict[conflict.prefered]) return conflict.prefered
  if(+possiblePoints >= conflict['3']) return 3
  if(+possiblePoints >= conflict['2']) return 2
  if(+possiblePoints >= conflict['1']) return 1
  return 0
}
function getToStarCount(conflict = {}){
  let star = conflict.star
  if(star < 3) conflict.next = conflict[star + 1] - (conflict[star] || 0)
}
function manualDeployment(conflict = {}, gp = {}){
  if(gp[conflict.combatType] >= conflict.manualDeploymentValue){
    conflict.deployment = conflict.manualDeploymentValue
    gp[conflict.combatType] = gp[conflict.combatType] - conflict.manualDeploymentValue
  }else{
    conflict.deployment = gp[conflict.combatType]
    gp[conflict.combatType] = 0
  }
  conflict.totalPoints = conflict.deployment + conflict.totalPoints
  conflict.star = getPossibleStar(conflict, conflict.totalPoints)
  getToStarCount(conflict)
}
function preferedDeployment(conflict = {}, gp = {}){
  let reqGp = conflict['1'] - 1
  if(conflict.prefered) reqGp = conflict[conflict.prefered]
  let neededGp = reqGp - conflict.totalPoints
  if(neededGp < 0) neededGp = 0
  if(gp[conflict.combatType]  >= neededGp){
    gp[conflict.combatType] = gp[conflict.combatType] - neededGp
    conflict.deployment = neededGp
  }else{
    conflict.deployment = gp[conflict.combatType]
    gp[conflict.combatType] = 0
  }
  conflict.totalPoints = conflict.deployment + conflict.totalPoints
  conflict.star = getPossibleStar(conflict, conflict.totalPoints)
  getToStarCount(conflict)
}
function autoDeployment(conflict = {}, gp = {}){
  let tempGp = conflict['1'] - conflict.totalPoints
  if(tempGp > gp[conflict.combatType] ){
    conflict.deployment = gp[conflict.combatType]
    gp[conflict.combatType] = 0
  }
  if(gp[conflict.combatType > 0]){
    for(let i=3;i<0;i++){
      if(i<1) continue
      let neededGp = confirm[i] - conflict.totalPoints
      if(neededGp >= gp[conflict.combatType]){
        gp[conflict.combatType] = gp[conflict.combatType] - neededGp
        conflict.deployment = neededGp
        break;
      }
    }
  }
  conflict.totalPoints = conflict.deployment + conflict.totalPoints
  conflict.star = getPossibleStar(conflict, conflict.totalPoints)
  getToStarCount(conflict)
}
function checkDeployments(conflicts = [], gp = {}){
  for(let i in conflicts){
    if(conflicts[i].manualDeployment){
      manualDeployment(conflicts[i], gp);
      continue;
    }
    if(conflicts[i].prefered >= 0 || conflicts[i].preloaded){
      preferedDeployment(conflicts[i], gp);
      continue;
    }
    autoDeployment(conflicts[i], gp);
  }
}
export default async function checkConflicts(conflicts = [], gp, roundMap, roundNum, config = {}){
  let currentRound = [], tempConflicts = JSON.parse(JSON.stringify(conflicts.filter(x=>x.phaseNum === roundNum))), totalRounds = 0
  if(Object.values(config).length > 0){
    for(let i in config){
      let tempConflict
      if(roundNum > 1) tempConflict = roundMap[(roundNum - 1)]?.find(x=>x.id === config[i].id)
      if(!tempConflict) tempConflict = conflicts.find(x=>x.id === config[i].id)
      if(tempConflict){
        tempConflict = JSON.parse(JSON.stringify(tempConflict))
        if(!tempConflict.totalPoints) tempConflict.totalPoints = 0
        if(tempConflict.totalPoints > 0) tempConflict.preloaded = true
        tempConflict.platoons = config[i].platoons
        tempConflict.cms = config[i].cms
        tempConflict.preload = config[i].preload
        tempConflict.deployment = 0
        tempConflict.totalPoints += (config[i].platoons || 0) + (config[i].cms || 0)
        tempConflict.points3star = tempConflict.points3star - (config[i].platoons || 0) - (config[i].cms || 0)
        tempConflict.prefered = config[i].prefered
        tempConflict.manualDeployment = config[i].manualDeployment
        tempConflict.manualDeploymentValue = config[i].manualDeploymentValue
        currentRound.push(tempConflict)
      }
    }
  }
  if(currentRound?.length > 0 && currentRound?.length !== tempConflicts?.length && roundNum > 0 && roundMap[roundNum - 1]){
    let tempRound = roundMap[(roundNum - 1)]
    if(tempRound?.length > 0) tempRound = JSON.parse(JSON.stringify(tempRound))
    for(let i in tempRound){
      if(currentRound.filter(x=>x.conflictNum === tempRound[i].conflictNum).length === 0){
        tempRound[i].cms = 0
        tempRound[i].platoons = 0
        tempRound[i].preloaded = true
        tempRound[i].preload = false
        tempRound[i].deployment = 0
        currentRound.push(tempRound[i])
      }
    }
  }
  
  if(currentRound?.length === 0){
    if((roundNum - 1) > 0 && roundMap[(roundNum - 1)]){
      currentRound = JSON.parse(JSON.stringify(roundMap[(roundNum - 1)]))
      for(let i in currentRound){
        currentRound[i].cms = 0
        currentRound[i].platoons = 0
        currentRound[i].preloaded = true
        currentRound[i].preload = false
        currentRound[i].deployment = 0
      }
    }else{
      currentRound = JSON.parse(JSON.stringify(conflicts.filter(x=>x.phaseNum === roundNum)))
    }
  }
  if(currentRound?.length !== tempConflicts?.length){
    for(let i in tempConflicts){
      if(currentRound.filter(x=>x.conflictNum === tempConflicts[i].conflictNum).length === 0){
        currentRound.push(JSON.parse(JSON.stringify(tempConflicts[i])))
      }
    }
  }
  for(let i in currentRound){
    if(currentRound[i].star > 0){
      let nextPhase = currentRound[i].phaseNum + 1, conflictNum = currentRound[i].conflictNum
      let tempObj = conflicts.find(x=>x.conflictNum === conflictNum && x.phaseNum === nextPhase)
      if(tempObj) currentRound[i] = JSON.parse(JSON.stringify(tempObj))
    }
    currentRound[i].round = roundNum
    if(currentRound[i].numRounds > totalRounds) totalRounds = currentRound[i].numRounds
  }
  checkDeployments(sorter(currentRound, 'desc', 'prefered'), gp)
  currentRound = sorter(currentRound, 'asec', 'sort')
  roundMap[roundNum] = JSON.parse(JSON.stringify(currentRound))
}
