import { useEffect } from 'react'

export const useAsync = (
    setLoading,
    asyncFn,
    successFn,
    errorFn,
    dependencies = [],
    finallyFn,
    returnFn
) => {
    useEffect(() => {
        setLoading(true)

        let isActive = true
        
        asyncFn().then((result) => {
            if (isActive) successFn(result)
        }).catch((error) => {
            if (isActive) errorFn && errorFn(error)
        }).finally(() => {
            if (isActive) finallyFn && finallyFn()
            if (isActive) setLoading(false)
        })

        return () => {
            returnFn && returnFn()
            isActive = false
        }
    }, dependencies) //eslint-disable-line
}