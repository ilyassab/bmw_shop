import React, { FC }                         from 'react'
import { Layout }                            from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { NavLink }                           from '@ui/link'
import { NoScrollbar }                       from '@ui/no-scrollbar'
import { Text }                              from '@ui/text'

import messages                              from './messages'

interface Props {
  currentMenu?: string
  setCurrentMenu?: (arg0?: string) => void
}

const Desktop: FC<WrappedComponentProps & Props> = ({ intl, currentMenu, setCurrentMenu }) => {
  return (
    <NoScrollbar height='54px' boxShadow='menuShadow' width='100%' overflow='auto'>
      <Layout flexShrink={0} flexBasis='20px' />
      <NavLink
        color='semiBlack'
        hoverColor='blue'
        active={currentMenu === 'personalInformation'}
        onClick={() => setCurrentMenu('personalInformation')}
        mobile
      >
        <Text
          fontWeight='semiBold'
          color='inherit'
          fontSize='small'
          lineHeight='regular'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.data)}
        </Text>
      </NavLink>
      <Layout flexShrink={0} flexBasis='27px' />
      <NavLink
        color='semiBlack'
        hoverColor='blue'
        active={currentMenu === 'changePass'}
        onClick={() => setCurrentMenu('changePass')}
        mobile
      >
        <Text
          fontWeight='semiBold'
          color='inherit'
          fontSize='small'
          lineHeight='regular'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.Pass)}
        </Text>
      </NavLink>
      <Layout flexShrink={0} flexBasis='27px' />
      <NavLink
        color='semiBlack'
        hoverColor='blue'
        active={currentMenu === 'settings'}
        onClick={() => setCurrentMenu('settings')}
        mobile
      >
        <Text
          fontWeight='semiBold'
          color='inherit'
          fontSize='small'
          lineHeight='regular'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.notify)}
        </Text>
      </NavLink>
      <Layout flexShrink={0} flexBasis='27px' />
      <NavLink
        color='semiBlack'
        hoverColor='blue'
        active={currentMenu === 'history'}
        onClick={() => setCurrentMenu('history')}
        mobile
      >
        <Text
          fontWeight='semiBold'
          color='inherit'
          fontSize='small'
          lineHeight='regular'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.history)}
        </Text>
      </NavLink>
      <Layout flexShrink={0} flexBasis='27px' />
      <NavLink
        color='semiBlack'
        hoverColor='blue'
        active={currentMenu === 'cars'}
        onClick={() => setCurrentMenu('cars')}
        mobile
      >
        <Text
          fontWeight='semiBold'
          color='inherit'
          fontSize='small'
          lineHeight='regular'
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.cars)}
        </Text>
      </NavLink>
      <Layout flexShrink={0} flexBasis='20px' />
    </NoScrollbar>
  )
}

export default injectIntl(Desktop)
