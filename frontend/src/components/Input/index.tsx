import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { useField } from '@unform/core'

import { Container, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  containerStyle?: object
  icon?: React.ComponentType<IconBaseProps>
}
const Input: React.FC<InputProps> = ({
  name,
  containerStyle,
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { fieldName, defaultValue, error, registerField } = useField(name)
  const [isFocused, setIsFocused] = useState(false)
  const [isField, setIsField] = useState(false)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsField(!!inputRef.current?.value)
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  return (
    <Container
      style={containerStyle}
      isFocused={isFocused}
      isField={isField}
      isErrored={!!error}
    >
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        autoComplete={'off'}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color='#c53030' size={20} />
        </Error>
      )}
    </Container>
  )
}

export default Input
