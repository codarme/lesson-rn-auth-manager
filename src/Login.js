import * as React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native'

import * as api from './api'
import { useAuth } from './auth'

const Screen = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const Img = styled(Image)`
  margin-bottom: 32px;
  max-width: 300px;
  align-self: center;
`

const LoginBox = styled(View)`
  flex: 1;
  padding: 16px;
`

const Input = styled(TextInput)`
  background: #ebebeb;
  border-radius: 5px;
  padding: 12px;
  margin-bottom: 12px;
`

const Button = styled(TouchableOpacity)`
  background: #43bc70;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
`

const ButtonText = styled(Text)`
  color: #fff;
`

export const Login = () => {
  const [state, setState] = useState(false)
  const [, { login }] = useAuth()

  const formik = useFormik({
    initialValues: {
      username: 'test',
      password: 'test',
    },

    onSubmit: async values => {
      try {
        const { data } = await api.login(values)
        login(data)
      } catch (error) {
        setState('Login ou senha inválidos')
      }
    },
  })

  return (
    <Screen>
      <LoginBox>
        <Img source={require('./logo.png')} resizeMode="contain" />

        {state && <Text>{state}</Text>}

        <Input
          name="username"
          placeholder="Digite seu usuario"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />

        <Input
          name="password"
          placeholder="Digite sua senha"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          secureTextEntry
        />

        <Button onPress={formik.handleSubmit}>
          {formik.isSubmitting ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <ButtonText>Entrar</ButtonText>
          )}
        </Button>
      </LoginBox>
    </Screen>
  )
}
