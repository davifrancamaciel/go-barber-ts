import React, { InputHTMLAttributes } from "react";

import { Container } from "./styles";

// type ButtonProps = InputHTMLAttributes<HTMLButtonElement>;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default Button;
