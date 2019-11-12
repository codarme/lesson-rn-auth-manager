import * as React from 'react'
import { View, Text, ActivityIndicator, Button } from 'react-native'
import styled from 'styled-components'

import { StoreProvider, useStore } from './store'
import { useAuth } from './auth'

import { Login } from './Login'

const Loading = styled(ActivityIndicator)`
  flex: 1;
  color: #43bc70;
`

const Home = () => {
  const [, { logout }] = useAuth()

  return (
    <View>
      <Text>Home</Text>
      <Button title="Sair" onPress={logout} />
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
