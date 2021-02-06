import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn ,FiMail, FiLock} from "react-icons/fi";

import Button from "../../components/Button";
import Input from "../../components/Input";

import logo from "../../assets/logo.svg";

import { Container, Content, Background } from "./styles";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />
        <form>
          <h1>Faça seu logon</h1>
          <Input icon={FiMail} name='email' placeholder="E-mail" />
          <Input icon={FiLock} name='password' placeholder="Senha" type="password" />
          <Button>Entrar</Button>
          <a href={"/forgot"}>Esqueci minha senha</a>
        </form>
        <a href={"/register"}>
          <FiLogIn size={20} /> Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
