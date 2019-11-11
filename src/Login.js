import * as React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import styled from 'styled-components'
import { useFormik } from 'formik'

import * as api from './api'
import { useStore } from './store'

const Screen = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const LoginBox = styled(View)`
  flex: 1;
  padding: 32px;
`

const Input = styled(TextInput)`
  background: #ebebeb;
  padding: 8px;
  margin-bottom: 12px;
  border-radius: 5px;
`

const Button = styled(TouchableOpacity)`
  background: #43bc70;
  padding: 12px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`

const TextButton = styled(Text)`
  color: #fff;
`

export const Login = () => {
  const [, setStore] = useStore()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async values => {
      try {
        const { data } = await api.login(values)
        setStore(prev => ({
          ...prev,
          auth: data,
        }))
      } catch (error) {}
    },
  })

  return (
    <Screen>
      <LoginBox>
        <Input
          name="'username"
          placeholder="Usuário"
          onChangeText={formik.handleChange('username')}
        />
        <Input
          name="'password"
          placeholder="Digite sua senha"
          onChangeText={formik.handleChange('password')}
          secureTextEntry
        />

        <Button onPress={formik.handleSubmit}>
          {formik.isSubmitting ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <TextButton>Enviar</TextButton>
          )}
        </Button>
      </LoginBox>
    </Screen>
  )
}
