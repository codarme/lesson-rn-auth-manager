import * as React from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

import { Login } from './Login'
import { StoreProvider, useStore } from './store'

const Loading = styled(ActivityIndicator)`
  color: #fff;
  flex: 1;
`

const Home = () => {
  const [, setStore] = useStore()

  const logout = () => {
    setStore(({ auth, ...prev }) => prev)
  }
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}

const Router = () => {
  const [store] = useStore()

  if (!store.rehydrated) {
    return <Loading />
  }

  return store.auth ? <Home /> : <Login />
}

export const App = () => (
  <StoreProvider>
    <Router />
  </StoreProvider>
)
