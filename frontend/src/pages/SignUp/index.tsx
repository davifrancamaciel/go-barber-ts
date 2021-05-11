import React, { useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { FormHandles } from "@unform/core";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";

import Button from "../../components/Button";
import Input from "../../components/Input";
import api from "../../services/api";
import { useToast } from "../../hooks/toast";

import logo from "../../assets/logo.svg";

import { Container, Content, Background, AnimationContainer } from "./styles";

interface SignInFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    console.log(data);
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .email("Digite um email válido")
          .required("E-mail obrigatório"),
        password: Yup.string().min(6, "No mínimo 6 dígitos"),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post("/users", data);

      addToast({
        type: "success",
        title: "Cadastro realizado",
        description: "Você ja pode fazer seu login no GoBarber",
      });

      history.push("/");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }
      addToast({
        type: "error",
        title: "Erro no cadastro",
        description: error.response.data.error,
      });
    }
  }, [addToast, history]);
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber" />
          <Form onSubmit={handleSubmit} initialData={{}} ref={formRef}>
            <h1>Faça seu cadastro</h1>
            <Input icon={FiUser} name="name" placeholder="Nome" />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input
              icon={FiLock}
              name="password"
              placeholder="Senha"
              type="password"
            />

            <Button>Cadastrar</Button>
          </Form>
          <Link to={"/"}>
            <FiArrowLeft size={20} /> Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
