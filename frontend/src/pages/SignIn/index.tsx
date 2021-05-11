import React, { useCallback, useRef } from "react";
import { FormHandles } from "@unform/core";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";

import { Form } from "@unform/web";
import * as Yup from "yup";

import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";

import getValidationErrors from "../../utils/getValidationErrors";

import Button from "../../components/Button";
import Input from "../../components/Input";

import logo from "../../assets/logo.svg";

import { Container, Content, Background, AnimationContainer } from "./styles";

interface SignOnFomData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignOnFomData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email("Digite um email válido")
            .required("E-mail obrigatório"),
          password: Yup.string().required("A senha é obrigatória"),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push("/dashboard");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }
        addToast({
          type: "error",
          title: "Erro na autenticação",
          description: "Ocorreu um  erro ao fazer login",
        });
      }
    },
    [signIn, addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form onSubmit={handleSubmit} initialData={{}} ref={formRef}>
            <h1>Faça seu logon</h1>
            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
              icon={FiLock}
              name="password"
              placeholder="Senha"
              type="password"
            />
            <Button>Entrar</Button>
            <Link to={"/forgot"}>Esqueci minha senha</Link>
          </Form>
          <Link to={"/signup"}>
            <FiLogIn size={20} /> Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
