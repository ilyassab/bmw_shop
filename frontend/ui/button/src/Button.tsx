import React                        from 'react'
import { Button as AtlantisButton } from '@atlantis-lab/button'

export const Button = ({ children, ...props }) => {
  return (
    <AtlantisButton borderRadius='0px' {...props}>
      {children}
    </AtlantisButton>
  )
}
