import React, { FC, useState }               from 'react'
import { Box, Column, Layout }               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { useApolloClient }                   from '@apollo/react-hooks'

import { Modal }                             from '@atlantis-lab/modal'
import { BlueButton }                        from '@ui/button'
import { Condition }                         from '@ui/condition'
import { Cross }                             from '@ui/cross'
import { Input }                             from '@ui/input'
import { Text }                              from '@ui/text'
import { useCityState }                      from '@store/stores'

import messages                              from './messages'
import { useData }                           from './useData'

interface Props {
  onClose?: () => void
  onPickCity?: () => void
  opened?: boolean
  id?: number
  intl?: any
}

const SubscribeModal: FC<Props & WrappedComponentProps> = ({ onClose, opened, id, intl }) => {
  const { state } = useCityState()
  const [success, setSuccess] = useState(false)
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const client = useApolloClient()
  const onClick = async () => {
    const data = await useData(client, name, lastName, phone, state.city.code, id)
    if (data.success) {
      setSuccess(true)
    }
  }

  const onSuccessClose = () => {
    setSuccess(false)
    onClose()
  }

  return (
    <Modal visible={opened} onClose={onSuccessClose}>
      <Box
        position='relative'
        justifyContent='center'
        width='100%'
        backgroundColor='white'
        maxWidth={['90%', '90%', '588px']}
      >
        <Column maxWidth={['90%', '90%', '468px']} width='100%'>
          <Text cursor='pointer' onClick={onSuccessClose}>
            <Box
              right={['16px', '24px', '24px']}
              top={['16px', '24px', '24px']}
              position='absolute'
            >
              <Cross />
            </Box>
          </Text>
          <Layout flexShrink={0} flexBasis={['16px', '32px', '58px']} />
          <Condition match={!success}>
            <Layout maxWidth={['268px', '90%', '90%']}>
              <Text
                fontWeight={['tiny', 'tiny', 'tiny']}
                fontSize={['semiLarge', 'large', 'large']}
                textTransform='uppercase'
              >
                {intl.formatMessage(messages.subscribeDone)}
              </Text>
            </Layout>
            <Layout flexShrink={0} flexBasis={['16px', '23px', '24px']} />
            <Text
              fontWeight={['small', 'small', 'small']}
              fontSize={['semiMedium', 'medium', 'medium']}
              lineHeight='extra'
              color='dustyGray'
            >
              {intl.formatMessage(messages.typeMore)}
            </Text>
            <Layout flexShrink={0} flexBasis={['24px', '23px', '32px']} />
            <Box width='100%' flexDirection={['column', 'row', 'row']}>
              <Input
                width='100%'
                height='60px'
                border='none'
                padding='0 20px'
                fontSize='medium'
                placeholder={intl.formatMessage(messages.name)}
                backgroundColor='inputGray'
                onChange={e => {
                  setName(e.currentTarget.value)
                }}
              />
              <Layout flexBasis={['16px', '24px', '24px']} />
              <Input
                width='100%'
                height='60px'
                border='none'
                fontSize='medium'
                padding='0 20px'
                placeholder={intl.formatMessage(messages.familyName)}
                backgroundColor='inputGray'
                onChange={e => {
                  setLastName(e.currentTarget.value)
                }}
              />
            </Box>
            <Layout flexBasis={['16px', '24px', '24px']} />
            <Input
              width='100%'
              height='60px'
              border='none'
              padding='0 20px'
              fontSize='medium'
              placeholder={intl.formatMessage(messages.phone)}
              backgroundColor='inputGray'
              onChange={e => {
                setPhone(e.currentTarget.value)
              }}
            />
            <Layout flexBasis={['24px', '32px', '32px']} />
            <BlueButton height='60px' width='100%' onClick={onClick}>
              <Text fontWeight='semiBold' fontSize='semiMedium' lineHeight='extra' color='white'>
                {intl.formatMessage(messages.send)}
              </Text>
            </BlueButton>
          </Condition>
          <Condition match={success}>
            <Text
              fontWeight='tiny'
              fontSize={['semiLarge', 'large', 'large']}
              textTransform='uppercase'
            >
              {intl.formatMessage(messages.thanks)}
            </Text>
            <Layout flexShrink={0} flexBasis={['16px', '23px', '24px']} />
            <Text fontWeight='small' fontSize='medium' lineHeight='extra' color='dustyGray'>
              {intl.formatMessage(messages.yourData)}
            </Text>
            <Layout flexShrink={0} flexBasis={['24px', '23px', '32px']} />
            <BlueButton height='60px' width='100%' onClick={onSuccessClose}>
              <Text fontWeight='semiBold' fontSize='semiMedium' lineHeight='extra' color='white'>
                {intl.formatMessage(messages.continue)}
              </Text>
            </BlueButton>
          </Condition>
          <Layout flexBasis={['16px', '32px', '58px']} />
        </Column>
      </Box>
    </Modal>
  )
}

export default injectIntl(SubscribeModal)
