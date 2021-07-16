import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  > header {
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      svg {
        width: 24px;
        height: 24px;
        color: #999591;
      }
    }
  }
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -176px auto 0;

  width: 100%;

  form {
    margin: 40px 0;
    width: 340px;
    max-width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    input[name='old_password'] {
      margin-top: 24px;
    }
  }
`

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  width: 186px;
  position: relative;
  align-self: center;

  img {
    border-radius: 50%;
    width: 186px;
    height: 186px;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background-color: #ff9000;
    border-radius: 50%;
    bottom: 0;
    right: 0;
    border: 0;
    transition: background-color 0.2s;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    input{
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`
