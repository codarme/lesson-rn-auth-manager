import * as React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import { useAsyncStorage } from '@react-native-community/async-storage'

const StoreContext = createContext([{}, () => {}])

export const useStore = () => {
  const [state, setState] = useContext(StoreContext)
  return [state, setState]
}

export const StoreProvider = ({ children }) => {
  const { getItem, setItem } = useAsyncStorage('store')
  const [state, setState] = useState({
    rehydrated: false,
  })

  const rehydrate = async () => {
    const data = await getItem()
    setState(prev => ({
      ...prev,
      ...(data && JSON.parse(data)),
      rehydrated: true,
    }))
  }

  useEffect(() => {
    rehydrate()
  }, [])

  useEffect(() => {
    setItem(JSON.stringify(state))
  }, [state])

  return (
    <StoreContext.Provider value={[state, setState]}>
      {children}
    </StoreContext.Provider>
  )
}
