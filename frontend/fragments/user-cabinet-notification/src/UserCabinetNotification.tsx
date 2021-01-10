import React, { FC, useEffect, useState }     from 'react'
import { Column, Layout, Row }                from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl }  from 'react-intl'
import { useApolloClient }                    from '@apollo/react-hooks'

import { BlueButton }                         from '@ui/button'
import { Checkbox }                           from '@ui/input'
import { Text }                               from '@ui/text'
import { cookieStorage }                      from '@utils/cookie-storage'

import messages                               from './messages'
import { useDataGetValues, useDataPutValues } from './useData'

interface Props {
  isTablet?: boolean
  isMobile?: boolean
  block?: string
}

const UserCabinetNotification: FC<WrappedComponentProps & Props> = ({ intl }) => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()

  useEffect(() => {
    const fetchData = async () => {
      const token = cookieStorage.getItem('token') || ''
      const data = await useDataGetValues(client, token)
      setNotifications(data)
    }
    fetchData()
  }, [])

  const onClick = async () => {
    setLoading(true)
    try {
      const filteredNotifications = notifications.map(item => {
        return {
          id: item.id,
          text: item.text,
          value: item.value,
        }
      })
      const token = cookieStorage.getItem('token') || ''
      await useDataPutValues(client, filteredNotifications, token)
      setLoading(false)
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
        {intl.formatMessage(messages.settings)}
      </Text>
      <Layout flexBasis={['10px', '16px', '16px']} />
      <Text
        fontWeight='normal'
        fontSize={['semiMedium', 'medium', 'medium']}
        color='dustyGray'
        lineHeight='extra'
      >
        {intl.formatMessage(messages.text)}
      </Text>
      <Layout flexBasis='24px' />
      {notifications.map(item => (
        <>
          <Checkbox
            checked={item.value === 'TRUE'}
            onChange={checked => {
              /* eslint-disable */
              setNotifications(
                notifications.map(notify => {
                  if (notify.id === item.id) {
                    notify.value = checked ? 'TRUE' : 'FALSE'
                  }
                  return notify
                })
              )
              /* eslint-enable */
            }}
          >
            <Row>
              <Layout flexShrink={0} flexBasis='16px' />
              <Text
                fontWeight='normal'
                fontSize={['semiMedium', 'medium', 'semiMedium']}
                color='dustyGray'
                lineHeight='extra'
              >
                {item.text}
              </Text>
            </Row>
          </Checkbox>
          <Layout flexShrink={0} flexBasis={['12px', '20px', '20px']} />
        </>
      ))}
      <Layout flexBasis='12px' />
      <BlueButton height='60px' loading={loading} onClick={onClick}>
        <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
          {intl.formatMessage(messages.save)}
        </Text>
      </BlueButton>
    </Column>
  )
}

export default injectIntl(UserCabinetNotification)
