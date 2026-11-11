import { useState, useEffect } from "react"

export default function useSetFilter(maxSize, defaultValue = [] ){
    let maxSetSize = maxSize;
    const [ filter, setFilter ] = useState(new Set(defaultValue || []))
    function setNewFilter(value){
      if(!value){
        setFilter(new Set([]))
        return
      }
      let tempSet = new Set(filter)
      if(tempSet?.has(value)){
        tempSet.delete(value)
      }else{
        if(tempSet.size + 1 >= maxSetSize){
          setFilter(new Set([]))
          return
        }
        tempSet.add(value)
      }
      setFilter(tempSet)
    }
    return [ filter, setNewFilter ];
}
