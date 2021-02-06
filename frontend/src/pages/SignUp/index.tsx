import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import * as Yup from "yup";

import Button from "../../components/Button";
import Input from "../../components/Input";

import logo from "../../assets/logo.svg";

import { Container, Content, Background } from "./styles";

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: object) => {
    console.log(data);
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .email("Digite um email válido")
          .required("E-mail obrigatório"),
        password: Yup.string()
        .min(6, "No mínimo 6 dígitos"),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      console.log(error.inner);
    }
  }, []);
  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="GoBarber" />
        <Form onSubmit={handleSubmit} initialData={{}}>
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
        <a href={"/register"}>
          <FiArrowLeft size={20} /> Voltar para logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
