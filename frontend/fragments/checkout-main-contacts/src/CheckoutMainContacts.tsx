import React, { FC }                from 'react'
import { Box, Column, Layout, Row } from '@atlantis-lab/layout'
import { useIntl }                  from 'react-intl'

import { InputLabel, Radio }        from '@ui/input'
import { Space, Text }              from '@ui/text'

import messages                     from './messages'

interface Props {
  state?: any
  setState?: (arg0?: any) => void
}

const CheckoutMainContacts: FC<Props> = ({ state, setState }) => {
  const intl = useIntl()

  return (
    <Column>
      <Text
        fontWeight='tiny'
        fontSize={['default', 'semiLarge', 'semiLarge']}
        textTransform='uppercase'
        lineHeight='normal'
      >
        {intl.formatMessage(messages.contacts)}
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
      <Layout flexBasis='32px' />
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
    </Column>
  )
}

export default CheckoutMainContacts
