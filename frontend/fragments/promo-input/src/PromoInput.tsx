import React, { FC, useEffect, useState }                  from 'react'
import { Box, Column, Layout, Row }                        from '@atlantis-lab/layout'
import { useApolloClient }                                 from '@apollo/react-hooks'
import { useIntl }                                         from 'react-intl'

import { Condition }                                       from '@ui/condition'
import { Input }                                           from '@ui/input'
import { Space, Text }                                     from '@ui/text'
import { useBasketDispatch, useBasketState, useCityState } from '@store/stores'
import { cookieStorage }                                   from '@utils/cookie-storage'

import messages                                            from './messages'
import { useDeleteInCart, usePutInCart }                   from './useData'

interface Props {
  setInputText?: (arg0?: string) => void
  placeholder?: string
  useText?: string
}

const PromoInput: FC<Props> = ({ placeholder, useText }) => {
  const { state: cityState } = useCityState()
  const { dispatch: cartDispatch } = useBasketDispatch()
  const { state: cartState } = useBasketState()
  const [promocode, setPromocode] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const client = useApolloClient()
  const intl = useIntl()

  useEffect(() => {
    if (cartState && cartState.promocodeData && cartState.promocodeData.coupon) {
      setSuccess(true)
    } else {
      setSuccess(false)
    }
  }, [cartState])

  const putInCart = () => {
    const token = cookieStorage.getItem('token') || ''
    const xBasketId = cookieStorage.getItem('xBasketId')
    const fetchData = async () => {
      const { data, errors } = await usePutInCart(
        client,
        promocode,
        cityState.city.code,
        xBasketId,
        token
      )
      if (data && data.promocodeData && data.promocodeData.coupon) {
        setSuccess(true)
        cartDispatch({ type: 'add', payload: data })
      }
      if (errors) {
        setError(
          errors &&
            errors[0] &&
            errors[0].extensions &&
            errors[0].extensions.responseBody &&
            errors[0].extensions.responseBody.errors &&
            errors[0].extensions.responseBody.errors[0]
        )
      }
    }
    fetchData()
  }

  const deleteInCart = () => {
    const token = cookieStorage.getItem('token') || ''
    const xBasketId = cookieStorage.getItem('xBasketId')
    const fetchData = async () => {
      const data = await useDeleteInCart(client, 'delete', cityState.city.code, xBasketId, token)
      cartDispatch({ type: 'add', payload: data })
      setSuccess(false)
    }
    fetchData()
  }

  return (
    <Box position='relative' width='100%'>
      <Condition match={!success}>
        <Input
          height='60px'
          border='none'
          width='100%'
          padding={['0 116px 0 16px', '0 124px 0 24px', '0 120px 0 20px']}
          fontSize='medium'
          backgroundColor={['white', 'white', 'inputGray']}
          placeholder={placeholder}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              putInCart()
            }
          }}
          onChange={e => setPromocode(e.target.value)}
        />
        <Box position='absolute' top='23px' right='20px'>
          <Text
            color='blue'
            cursor='pointer'
            fontWeight='semiBold'
            fontSize='small'
            textTransform='uppercase'
            underline
            onClick={putInCart}
          >
            {useText}
          </Text>
        </Box>
        <Condition match={error}>
          <Box position='absolute' height='1px' width='100%' backgroundColor='red' bottom={0} />
          <Box position='absolute' bottom={-19} left={[1, 1, 0]}>
            <Text color='red' fontSize='12px' fontWeight='normal' lineHeight='extra'>
              {error}
            </Text>
          </Box>
        </Condition>
      </Condition>
      <Condition match={success}>
        <Column alignItems='center'>
          <Column maxWidth={['93.3%', '93.3%', '100%']}>
            <Layout flexBasis={['7px', '7px', '0']} />
            <Text
              color='crumbsGray'
              fontWeight='semiBold'
              fontSize='semiSmall'
              textTransform='uppercase'
            >
              {intl.formatMessage(messages.promocode)}
              <Space />
              {cartState.promocodeData && cartState.promocodeData.coupon}
              <Space />
              {intl.formatMessage(messages.activated)}
            </Text>
            <Layout flexBasis='7px' />
            <Row alignItems='flex-end'>
              <Box maxWidth={['160px', '400px', '200px']}>
                <Text
                  fontWeight='semiBold'
                  fontSize='default'
                  overflow='hidden'
                  whiteSpace='nowrap'
                  textOverflow='ellipsis'
                >
                  {cartState.promocodeData && cartState.promocodeData.description}
                </Text>
              </Box>
              <Layout flexGrow={1} />
              <Text
                color='blue'
                cursor='pointer'
                fontWeight='semiBold'
                fontSize='small'
                textTransform='uppercase'
                underline
                onClick={deleteInCart}
              >
                {intl.formatMessage(messages.cancel)}
              </Text>
            </Row>
            <Layout flexBasis={['7px', '7px', '0']} />
          </Column>
        </Column>
      </Condition>
    </Box>
  )
}

export default PromoInput
