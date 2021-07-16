import React, { ChangeEvent, FormEvent, useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'

import Button from '../../components/Button'
import Input from '../../components/Input'
import api from '../../services/api'
import { useToast } from '../../hooks/toast'

import { Container, Content, AvatarInput } from './styles'
import { useAuth } from '../../hooks/auth'

interface SignInFormData {
  name: string
  email: string
  old_password: string
  password: string
  password_confirmation: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const { user, updateUser } = useAuth()

  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      console.log(data)
      try {
        formRef.current?.setErrors({})
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um email válido')
            .required('E-mail obrigatório'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: string) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string()
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string()
            })
            .oneOf([Yup.ref('password'), null], 'As senhas estão diferentes')
        })

        await schema.validate(data, { abortEarly: false })

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation
        } = data

        const formData = Object.assign(
          { name, email },
          old_password
            ? { old_password, password, password_confirmation }
            : {}
        )

        const response = await api.put('/profile', formData)
        updateUser(response.data)
        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description: 'Suas informações do perfil fora atualizadas com sicesso'
        })

        history.push('/dashboard')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)
        }
        addToast({
          type: 'error',
          title: 'Erro na atialização',
          description: 'Ocorreu um erro ao atualizar'
        })
      }
    },
    [addToast, history]
  )

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const formData = new FormData()
        formData.append('avatar', e.target.files[0])

        api.patch('/users/avatar', formData).then(response => {
          updateUser(response.data)
          addToast({
            type: 'success',
            title: 'Imagen salva com sucesso'
          })
        })
      }
    },
    [addToast, updateUser]
  )

  return (
    <Container>
      <header>
        <div>
          <Link to={'/dashboard'}>
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          onSubmit={handleSubmit}
          initialData={{ name: user.name, email: user.email }}
          ref={formRef}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor='avatar'>
              <FiCamera />
              <input type='file' id='avatar' onChange={handleAvatarChange} />
            </label>
          </AvatarInput>
          <h1>Meu perfil</h1>
          <Input icon={FiUser} name='name' placeholder='Nome' />
          <Input icon={FiMail} name='email' placeholder='E-mail' />

          <Input
            containerStyle={{ marginTop: '24px' }}
            icon={FiLock}
            name='old_password'
            placeholder='Senha'
            type='password'
          />
          <Input
            icon={FiLock}
            name='password'
            placeholder='Nova senha'
            type='password'
          />
          <Input
            icon={FiLock}
            name='password_confirmation'
            placeholder='Confirme a nova senha'
            type='password'
          />

          <Button>Salvar</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default SignUp
