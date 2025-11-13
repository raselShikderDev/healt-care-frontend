import { useEffect, useState } from "react"




function useDebounce<T>(value:T, delay:number = 500){
    const [debouncedValue, setDebouncedValue] = useState<T>(value)


    useEffect(()=>{
        const hanler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);

        return ()=>{
            clearTimeout(hanler)
        }
    }, [value, delay])

  return debouncedValue
}

export default useDebounce
