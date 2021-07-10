import React, { useCallback, useRef, useState } from 'react'
import { FormHandles } from '@unform/core'
import { Link, useHistory } from 'react-router-dom'
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

interface ForgotPasswordFomData {
  email: string
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()

  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: ForgotPasswordFomData) => {
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um email válido')
            .required('E-mail obrigatório')
        })

        await schema.validate(data, { abortEarly: false })
        setLoading(true)
        await api.post('/password/forgot', data)

        addToast({
          type: 'success',
          title: 'Email de recuperação enviado',
          description: 'Verifique sua caixa de email para redefinir sua senha'
        })

        history.push('/dashboard')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)
        }
        addToast({
          type: 'error',
          title: 'Erro na recuperação de senha',
          description: 'Ocorreu um  erro ao fazer a recuperação de senha'
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast]
  )

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt='GoBarber' />
          <Form onSubmit={handleSubmit} initialData={{}} ref={formRef}>
            <h1>Recuperar sua senha</h1>
            <Input icon={FiMail} name='email' placeholder='E-mail' />
            <Button loading={loading}>Recuperar</Button>
            <Link to={'/'}>Voltar ao login</Link>
          </Form>
          <Link to={'/signup'}>
            <FiLogIn size={20} /> Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
}

export default ForgotPassword
