import React, { useCallback, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import { Form } from '@unform/web'
import * as Yup from 'yup'

import { useToast } from '../../hooks/toast'

import getValidationErrors from '../../utils/getValidationErrors'

import Button from '../../components/Button'
import Input from '../../components/Input'

import logo from '../../assets/logo.svg'

import { Container, Content, Background, AnimationContainer } from './styles'
import api from '../../services/api'

interface ResetPasswordFomData {
  password: string
  password_confirmation: string
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const location = useLocation()
  console.log(location)

  const handleSubmit = useCallback(
    async (data: ResetPasswordFomData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas estão diferentes'
          )
        })

        await schema.validate(data, { abortEarly: false })
        setLoading(true)
        const token = location.search.replace('?token=', '')

        if (!token) {
          throw new Error()
        }
        await api.post('/password/reset', { ...data, token })

        addToast({
          type: 'success',
          title: 'Senha alterda com sucesso'
        })

        history.push('/')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar de senha',
          description: 'Ocorreu um  erro ao fazer a resetar de senha'
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, history, location.search]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt='GoBarber' />
          <Form onSubmit={handleSubmit} initialData={{}} ref={formRef}>
            <h1>Redefinição de senha</h1>
            <Input
              icon={FiLock}
              name='password'
              placeholder='Nova senha'
              type='password'
            />
            <Input
              icon={FiLock}
              type='password'
              placeholder='Confirme a nova senha'
              name='password_confirmation'
            />
            <Button loading={loading}>Redefinir</Button>
          </Form>
          <Link to={'/signin'}>
            <FiLogIn size={20} /> Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ResetPassword
