import React, { FC, useState }               from 'react'
import { Box, Column, Layout }               from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { Modal }                             from '@atlantis-lab/modal'
import { CityModalList }                     from '@fragments/city-modal-list'
import { Condition }                         from '@ui/condition'
import { Cross }                             from '@ui/cross'
import { ArrowLeftIcon, SearchIcon }         from '@ui/icons'
import { IconsManager }                      from '@ui/icons-manager'
import { Input }                             from '@ui/input'
import { LiveTyping }                        from '@ui/live-typing'
import { Space, Text }                       from '@ui/text'
import { useCityDispatch }                   from '@store/stores'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { useData }                           from './useData'

interface Props {
  onClose?: () => void
  onPickCity?: () => void
  isMobile?: boolean
  opened?: boolean
  intl?: any
}

const CityModal: FC<Props & WrappedComponentProps> = ({ isMobile, onClose, opened, intl }) => {
  const [inputText, setInputText] = useState('')
  const { dispatch } = useCityDispatch()
  const onClick = item => {
    dispatch({ type: 'changeCity', payload: item })
    cookieStorage.setItem('xCity', item.code)
  }
  const { filteredCities, initialCities, citiesFilter } = useData()
  const closeFunc = () => {
    onClose()
    setInputText('')
  }

  return (
    <Modal
      visible={opened}
      onClose={closeFunc}
      alignItems={['flex-start', 'flex-start', 'center']}
      justifyContent={['flex-end', 'flex-end', 'center']}
    >
      <Box
        position='relative'
        justifyContent='center'
        width='100%'
        backgroundColor='white'
        minHeight={['100%', '100%', 'auto']}
        maxWidth={['90%', '90%', '800px']}
      >
        <Column maxWidth={['auto', 'auto', '680px']} width='100%' height={['100%', '100%', 'auto']}>
          <Text cursor='pointer' onClick={closeFunc}>
            <Box display={['none', 'none', 'flex']} right='32px' top='32px' position='absolute'>
              <Cross />
            </Box>
          </Text>
          <Layout flexShrink={0} flexBasis={['23px', '23px', '60px']} />
          <Layout
            alignSelf='center'
            maxWidth={['90%', '90%', '100%']}
            width='100%'
            onClick={isMobile && closeFunc}
          >
            <Layout display={['flex', 'flex', 'none']}>
              <ArrowLeftIcon width='20px' height='20px' color='rgb(38, 38, 38)' />
              <Space count={4} />
            </Layout>
            <Text
              fontSize={['default', 'default', 'large']}
              fontWeight={['semiBold', 'semiBold', 'tiny']}
              textTransform='uppercase'
            >
              {intl.formatMessage(messages.chooseCity)}
            </Text>
          </Layout>
          <Box
            display={['flex', 'flex', 'none']}
            boxShadow='gray'
            width='100%'
            flexShrink={0}
            flexBasis={['23px', '23px', '32px']}
          />
          <Layout flexBasis={['23px', '23px', '32px']} />
          <Layout
            position='relative'
            width={['90%', '90%', '100%']}
            alignSelf={['center', 'center', 'flex-start']}
          >
            <Input
              placeholder={intl.formatMessage(messages.typeCityName)}
              border='none'
              padding={inputText ? '20px 45px 0 20px' : '0 45px 0 20px'}
              width='100%'
              height='60px'
              backgroundColor='inputGray'
              fontWeight='small'
              fontSize='medium'
              lineHeight='normal'
              color='semiBlack'
              onChange={e => {
                citiesFilter(e.currentTarget.value.toLowerCase())
                setInputText(e.currentTarget.value)
              }}
            />
            <Condition match={!!inputText}>
              <Box position='absolute' top='10px' left='20px'>
                <Text fontSize='small' color='placeholderGray'>
                  {intl.formatMessage(messages.city)}
                </Text>
              </Box>
            </Condition>
            <Layout position='absolute' right={20} top={22}>
              <IconsManager>
                <SearchIcon width='20px' height='20px' />
              </IconsManager>
            </Layout>
            <LiveTyping
              onClick={onClick}
              opened={!!inputText}
              onClose={closeFunc}
              items={filteredCities}
            />
          </Layout>
          <Layout flexBasis={['0px', '0px', '32px']} />
          <CityModalList cities={initialCities} onClose={closeFunc} />
          <Layout flexBasis={['0', '0', '40px']} />
          <Box display={['none', 'none', 'flex']} height='1px' backgroundColor='whiteGray' />
          <Layout flexBasis={['0px', '0px', '32px']} />
          <Layout display={['none', 'none', 'flex']}>
            <Text fontSize='small' lineHeight='normal' color='dustyGray' fontWeight='normal'>
              {intl.formatMessage(messages.ifYourCityNot)}
            </Text>
          </Layout>
          <Layout flexBasis={['0px', '0px', '58px']} />
        </Column>
      </Box>
    </Modal>
  )
}

export default injectIntl(CityModal)
