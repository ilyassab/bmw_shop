import React, { FC, useState } from 'react'
import { Box }                 from '@atlantis-lab/layout'

import { EyeIcon }             from '@ui/icons'
import { Text }                from '@ui/text'

import { InputLabel }          from './InputLabel'

interface Props {
  label?: string
  focusedBorderColor?: string
  borderColor?: string
  placeholder?: string
  type?: string
  padding?: string
  onChange?: (arg0?: string) => void
}

export const InputPassword: FC<Props> = ({ ...rest }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <InputLabel padding='12px 20px 0 20px' type={showPassword ? 'text' : 'password'} {...rest}>
      <Text cursor='pointer'>
        <Box position='absolute' top='18px' right='20px'>
          <EyeIcon
            onClick={() => setShowPassword(!showPassword)}
            color='rgba(186, 186, 186, 1)'
            width='20px'
            height='24px'
          />
        </Box>
      </Text>
    </InputLabel>
  )
}
