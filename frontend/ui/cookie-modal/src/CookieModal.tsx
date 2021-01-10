import React, { useEffect, useState } from 'react'
import { Column, Layout }             from '@atlantis-lab/layout'
import { useIntl }                    from 'react-intl'

import { BlueButton }                 from '@ui/button'
import { Link }                       from '@ui/link'
import { Text }                       from '@ui/text'
import { Transition }                 from '@ui/transition'

import messages                       from './messages'

// TODO сделать инициализирующий запрос для констант. Изменить все статические ссылки

export const CookieModal = () => {
  const intl = useIntl()
  const [transform, setTransform] = useState(false)
  const [close, setClosed] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setTransform(true)
    }, 1000)
  }, [])

  let cookieAgreement = null
  if (process.browser && !close) {
    cookieAgreement = window.localStorage.getItem('cookieUsageAgreement')
  }
  if (cookieAgreement === 'agreed') {
    return null
  }

  return (
    <Transition
      boxSizing='border-box'
      opacity={transform && !close ? 1 : 0}
      transition='0.5s'
      transform={transform && !close ? 'translateX(-496px)' : 'translateX(0px)'}
      boxShadow='howToHovered'
      width={['100%', '100%', '480px']}
      position='fixed'
      display='flex'
      justifyContent='center'
      bottom={[0, 0, 16]}
      right={[-496, -496, -480]}
      zIndex={10}
      backgroundColor='white'
    >
      <Column maxWidth={['90%', '90%', '400px']}>
        <Layout flexBasis={['16px', '16px', '40px']} />
        <Text
          fontWeight={['semiBold', 'semiBold', 'small']}
          fontSize={['default', 'default', 'semiLarge']}
          textTransform='uppercase'
        >
          {intl.formatMessage(messages.cookie)}
        </Text>
        <Layout flexBasis={['8px', '8px', '20px']} />
        <Text
          fontWeight='small'
          fontSize={['small', 'small', 'medium']}
          lineHeight='extra'
          color='dustyGray'
        >
          {intl.formatMessage(messages.cookieText)}
        </Text>
        <Layout flexBasis={['16px', '16px', '20px']} />
        <Link
          target='_blank'
          href='/pages/policy'
          fontWeight='small'
          color='blue'
          fontSize='semiMedium'
        >
          {intl.formatMessage(messages.moreAbout)}
        </Link>
        <Layout flexBasis={['16px', '16px', '30px']} />
        <BlueButton
          height={['48px', '48px', '60px']}
          width={['100%', '100%', '400px']}
          onClick={() => {
            window.localStorage.setItem('cookieUsageAgreement', 'agreed')
            setClosed(true)
          }}
        >
          <Text fontWeight='semiBold' fontSize='medium' lineHeight='extra' color='white'>
            {intl.formatMessage(messages.continue)}
          </Text>
        </BlueButton>
        <Layout flexBasis={['16px', '16px', '40px']} />
      </Column>
    </Transition>
  )
}
