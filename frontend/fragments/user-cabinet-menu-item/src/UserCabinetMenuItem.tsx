import React, { FC }                         from 'react'
import { Column, Layout }                    from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { Text }                              from '@ui/text'
import { Transition }                        from '@ui/transition'

interface Props {
  children?: any
  active?: boolean
  menuName?: string
  onClick?: (arg0?: string) => void
}

const UserCabinetMenuItem: FC<WrappedComponentProps & Props> = ({
  children,
  active,
  menuName,
  onClick,
}) => {
  return (
    <Transition
      boxSizing='border-box'
      cursor='pointer'
      width='100%'
      transition='border 0s, color 0.35s'
      borderLeft={active ? 'blue' : 'none'}
      borderBottom='gray'
      onClick={() => onClick(menuName)}
    >
      <Layout flexShrink={0} flexBasis={active ? '22px' : '24px'} />
      <Column>
        <Layout flexBasis='18px' />
        <Text
          color={active ? 'semiBlack' : 'blue'}
          fontWeight='normal'
          fontSize='semiMedium'
          lineHeight='extra'
        >
          {children}
        </Text>
        <Layout flexBasis='18px' />
      </Column>
    </Transition>
  )
}

export default injectIntl(UserCabinetMenuItem)
