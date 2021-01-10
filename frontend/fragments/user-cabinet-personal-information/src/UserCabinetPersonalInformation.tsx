import React, { FC, useEffect, useState }    from 'react'
import { Box, Column, Layout, Row }          from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { useApolloClient }                   from '@apollo/react-hooks'

import { BlueButton }                        from '@ui/button'
import { Condition }                         from '@ui/condition'
import { Divider }                           from '@ui/divider'
import { InputLabel, Radio }                 from '@ui/input'
import { Space, Text }                       from '@ui/text'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { useData, useUserInformation }       from './useData'

interface Props {
  isTablet?: boolean
  isMobile?: boolean
  block?: string
}

const UserCabinetPersonalInformation: FC<WrappedComponentProps & Props> = ({ intl }) => {
  const [state, setState] = useState({
    email: '',
    firstName: '',
    secondName: '',
    telephone: '',
    city: '',
    salutation: '',
    room: '',
    house: '',
    street: '',
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    const fetchData = async () => {
      const token = cookieStorage.getItem('token') || ''
      if (token) {
        const data = await useUserInformation(client, token)
        setState({
          ...state,
          email: data.email,
          firstName: data.firstName,
          secondName: data.secondName,
          telephone: data.phone,
          city: data.city,
          room: data.flat,
          salutation: data.salutation || 'M',
          house: data.house,
          street: data.street,
        })
      }
    }
    fetchData()
  }, [])

  const onClick = async () => {
    setLoading(true)
    const { email, firstName, secondName, telephone, salutation, city, room, house, street } = state
    const token = cookieStorage.getItem('token') || ''

    try {
      const { data, errors: fetchErrors } = await useData(
        client,
        email,
        firstName,
        secondName,
        telephone,
        salutation,
        city,
        room,
        house,
        street,
        token
      )
      if (data) {
        setLoading(false)
        setSaved(true)
        setErrors(null)
        setTimeout(() => {
          setSaved(false)
        }, 3000)
      }
      if (fetchErrors) {
        setLoading(false)
        setErrors(fetchErrors)
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <Column maxWidth={['93.3%', '93.3%', '690px']} alignSelf={['center', 'center', 'initial']}>
      <Text
        fontWeight='tiny'
        fontSize={['semiLarge', 'semiLarge', 'large']}
        textTransform='uppercase'
        lineHeight='normal'
      >
        {intl.formatMessage(messages.personalInformation)}
      </Text>
      <Layout flexBasis={['24px', '32px', '40px']} />
      <Text
        fontWeight='tiny'
        fontSize={['default', 'lmedium', 'semiLarge']}
        textTransform='uppercase'
        lineHeight='normal'
      >
        {intl.formatMessage(messages.contacts)}
      </Text>
      <Layout flexBasis={['10px', '16px', '16px']} />
      <Text
        fontWeight='normal'
        fontSize={['semiMedium', 'medium', 'medium']}
        color='dustyGray'
        lineHeight='extra'
      >
        {intl.formatMessage(messages.firstStep)}
      </Text>
      <Layout flexBasis='24px' />
      <Row>
        <Radio
          checked={state.salutation === 'M'}
          onChange={() =>
            setState({
              ...state,
              salutation: 'M',
            })
          }
        >
          <Row>
            <Space count={2} />
            <Text fontSize='default'>{intl.formatMessage(messages.man)}</Text>
          </Row>
        </Radio>
        <Layout flexBasis='28px' />
        <Radio
          checked={state.salutation === 'F'}
          onChange={() =>
            setState({
              ...state,
              salutation: 'F',
            })
          }
        >
          <Row>
            <Space count={2} />
            <Text fontSize='default'>{intl.formatMessage(messages.woman)}</Text>
          </Row>
        </Radio>
      </Row>
      <Layout flexBasis='24px' />
      <Box width='100%' flexDirection={['column', 'row', 'row']}>
        <InputLabel
          label={intl.formatMessage(messages.firstName)}
          placeholder={intl.formatMessage(messages.firstName)}
          value={state.firstName}
          onChange={text => {
            setState({
              ...state,
              firstName: text,
            })
          }}
        />
        <Layout flexShrink={0} flexBasis={['12px', '24px', '24px']} />
        <InputLabel
          label={intl.formatMessage(messages.secondName)}
          placeholder={intl.formatMessage(messages.secondName)}
          value={state.secondName}
          onChange={text => {
            setState({
              ...state,
              secondName: text,
            })
          }}
        />
      </Box>
      <Layout flexShrink={0} flexBasis={['12px', '24px', '24px']} />
      <Box width='100%' flexDirection={['column', 'row', 'row']}>
        <InputLabel
          label={intl.formatMessage(messages.telephone)}
          placeholder={intl.formatMessage(messages.telephone)}
          value={state.telephone}
          onChange={text => {
            setState({
              ...state,
              telephone: text,
            })
          }}
        />
        <Layout flexShrink={0} flexBasis={['12px', '24px', '24px']} />
        <InputLabel
          label={intl.formatMessage(messages.email)}
          placeholder={intl.formatMessage(messages.email)}
          value={state.email}
          onChange={text => {
            setState({
              ...state,
              email: text,
            })
          }}
        />
      </Box>
      <Layout flexBasis={['32px', '40px', '48px']} />
      <Divider color='dividerGray' />
      <Layout flexBasis={['32px', '40px', '48px']} />
      <Text
        fontWeight='tiny'
        fontSize={['default', 'lmedium', 'semiLarge']}
        textTransform='uppercase'
        lineHeight='normal'
      >
        {intl.formatMessage(messages.address)}
      </Text>
      <Layout flexBasis={['10px', '16px', '16px']} />
      <Text
        fontWeight='normal'
        fontSize={['semiMedium', 'medium', 'medium']}
        color='dustyGray'
        lineHeight='extra'
      >
        {intl.formatMessage(messages.delivery)}
      </Text>
      <Layout flexBasis='24px' />
      <Box width='100%' flexDirection={['column', 'row', 'row']}>
        <InputLabel
          label={intl.formatMessage(messages.city)}
          placeholder={intl.formatMessage(messages.city)}
          value={state.city}
          onChange={text => {
            setState({
              ...state,
              city: text,
            })
          }}
        />
        <Layout flexShrink={0} flexBasis={['12px', '24px', '24px']} />
        <InputLabel
          label={intl.formatMessage(messages.street)}
          placeholder={intl.formatMessage(messages.street)}
          value={state.street}
          onChange={text => {
            setState({
              ...state,
              street: text,
            })
          }}
        />
      </Box>
      <Layout flexShrink={0} flexBasis={['12px', '24px', '24px']} />
      <Box width='100%' flexDirection={['column', 'row', 'row']}>
        <InputLabel
          label={intl.formatMessage(messages.house)}
          placeholder={intl.formatMessage(messages.house)}
          value={state.house}
          onChange={text => {
            setState({
              ...state,
              house: text,
            })
          }}
        />
        <Layout flexShrink={0} flexBasis={['12px', '24px', '24px']} />
        <InputLabel
          label={intl.formatMessage(messages.room)}
          placeholder={intl.formatMessage(messages.room)}
          value={state.room}
          onChange={text => {
            setState({
              ...state,
              room: text,
            })
          }}
        />
      </Box>
      <Layout flexBasis={['24px', '32px', '32px']} />
      <BlueButton saved={saved} height='60px' loading={loading} onClick={onClick}>
        <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
          {intl.formatMessage(messages.save)}
        </Text>
      </BlueButton>
      <Layout flexBasis='5px' />
      <Condition match={!errors}>
        <Box height='18px' />
      </Condition>
      <Condition match={errors}>
        <Text
          fontSize='small'
          fontWeight='small'
          lineHeight='extra'
          color='red'
          dangerouslySetInnerHTML={{
            __html: typeof errors === 'string' ? errors : errors && errors[0] && errors[0].error,
          }}
        />
      </Condition>
    </Column>
  )
}

export default injectIntl(UserCabinetPersonalInformation)
