import React, { FC, useEffect, useState } from 'react'
import { Box, Column, Layout }            from '@atlantis-lab/layout'
import { useApolloClient }                from '@apollo/react-hooks'
import { useRouter }                      from 'next/router'
import { useIntl }                        from 'react-intl'

import { Condition }                      from '@ui/condition'
import { NavLink }                        from '@ui/link'
import { Text }                           from '@ui/text'
import { cookieStorage }                  from '@utils/cookie-storage'

import messages                           from './messages'
import { useData }                        from './useData'

interface Props {
  isMobile?: boolean
}

const ProductDescriptionBlock: FC<Props> = ({ isMobile }) => {
  const [menu, setMenu] = useState('')
  const [description, setDescription] = useState('')
  const [characteristics, setCharacteristics] = useState('')
  const intl = useIntl()
  const router = useRouter()
  const client = useApolloClient()

  useEffect(() => {
    const fetchData = async () => {
      const token = cookieStorage.getItem('token') || ''
      const data = await useData(client, router && router.query && router.query.item, token)
      setDescription(data.description)
      setCharacteristics(data.characteristics)
      setMenu((data.description && 'description') || (data.characteristics && 'characteristics'))
    }
    fetchData()
  }, [])

  return (
    <Column maxWidth={['90%', '90%', '1200px']} width='100%' alignSelf='center'>
      <Box
        flexDirection='row'
        borderBottom='gray'
        height={description || characteristics ? '40px' : '0'}
        alignItems='center'
        width='100%'
        overflow='auto'
      >
        <Condition match={description}>
          <NavLink
            color='semiBlack'
            hoverColor='blue'
            onClick={() => {
              setMenu('description')
            }}
            mobile={isMobile}
            active={menu === 'description'}
          >
            <Text color='inherit' fontSize='medium' lineHeight='extra'>
              {intl.formatMessage(messages.description)}
            </Text>
          </NavLink>
          <Layout flexShrink={0} flexBasis='28px' />
        </Condition>
        <Condition match={characteristics}>
          <NavLink
            color='semiBlack'
            hoverColor='blue'
            passHref={false}
            onClick={() => {
              setMenu('characteristics')
            }}
            mobile={isMobile}
            active={menu === 'characteristics'}
          >
            <Text color='inherit' fontSize='medium' lineHeight='extra'>
              {intl.formatMessage(messages.characteristics)}
            </Text>
          </NavLink>
          <Layout flexShrink={0} flexBasis='28px' />
        </Condition>
      </Box>
      <Layout flexBasis={description || characteristics ? ['16px', '16px', '40px'] : '0'} />
      <Condition match={menu === 'description'}>
        <Text
          fontWeight='small'
          fontSize={['semiMedium', 'semiMedium', 'medium']}
          lineHeight='extra'
        >
          {description}
        </Text>
      </Condition>
      <Condition match={menu === 'characteristics'}>
        <Text
          fontWeight='small'
          fontSize={['semiMedium', 'semiMedium', 'medium']}
          lineHeight='extra'
        >
          {characteristics}
        </Text>
      </Condition>
    </Column>
  )
}

export default ProductDescriptionBlock
