import sorter from 'components/stableSort'

export default function filterMods(mods = [], modsFilter, modSort, setSortedMods){
  let array = JSON.parse(JSON.stringify(mods))
  if(modsFilter?.slot?.length > 0){
    let slotSet = new Set(modsFilter.slot)
    array = array.filter(x=> slotSet?.has(x.slot))
  }
  if(modsFilter?.icon?.length > 0){
    let iconSet = new Set(modsFilter.icon)
    array = array.filter(x=> iconSet?.has(x.setId))
  }
  if(modsFilter?.pri?.length > 0){
    let priSet = new Set(modsFilter.pri)
    array = array.filter(x=> priSet.has(x.statId))
  }
  if(modsFilter?.sec?.length > 0){
    for(let i in modsFilter?.sec){
      array = array.filter(x=> x.secondary[modsFilter?.sec[i]])
    }
  }
  if(modsFilter?.rarity?.length > 0){
    let raritySet = new Set(modsFilter.rarity)
    if(raritySet.has(1)){
      for(let i = 2;i<5;i++) raritySet.add(i)
    }
    array = array.filter(x=> raritySet.has(x.rarity))
  }
  if(modsFilter?.tier?.length > 0){
    let tierSet = new Set(modsFilter.tier)
    array = array.filter(x=> tierSet.has(x.tier))
  }
  array = sorter(array, 'desc', `${modSort}-value`)
  setSortedMods(array)
}
