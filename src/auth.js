import { useCallback } from 'react'
import { useStore } from './store'

export const useAuth = () => {
  const [store, setStore] = useStore()

  const login = useCallback(auth => setStore(prev => ({ ...prev, auth })), [])
  const logout = useCallback(() => setStore(({ auth, ...prev }) => prev), [])

  return [store && store.auth, { login, logout }]
}
