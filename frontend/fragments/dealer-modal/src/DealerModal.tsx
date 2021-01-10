import React, { FC, useEffect, useRef, useState }     from 'react'
import { Box, Column, Layout, Row }                   from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl }          from 'react-intl'
import { useApolloClient }                            from '@apollo/react-hooks'

import { Modal }                                      from '@atlantis-lab/modal'
import { DealerModalItem }                            from '@fragments/dealer-modal-item'
import { DealerModalMap }                             from '@fragments/dealer-modal-map'
import { Condition }                                  from '@ui/condition'
import { Cross }                                      from '@ui/cross'
import { Divider }                                    from '@ui/divider'
import { ArrowToBottomIcon, CityPinIcon, SearchIcon } from '@ui/icons'
import { IconsManager }                               from '@ui/icons-manager'
import { Input }                                      from '@ui/input'
import { NavLink }                                    from '@ui/link'
import { LiveTyping }                                 from '@ui/live-typing'
import { NoScrollbar }                                from '@ui/no-scrollbar'
import { Space, Text }                                from '@ui/text'
import { Transition }                                 from '@ui/transition'
import { useCityState }                               from '@store/stores'

import messages                                       from './messages'
import { useData }                                    from './useData'

interface Props {
  onClose?: () => void
  onPickCity?: () => void
  store?: {
    id?: number[]
    store?: Array<{
      address?: string
      externalId?: number
      id?: number
      lat?: number
      lng?: number
      location?: string
      name?: string
      phone?: string
      quantity?: number
      worktime?: string
    }>
  }
  isMobile?: boolean
  opened?: boolean
}

const DealerModal: FC<Props & WrappedComponentProps> = ({ onClose, opened, store, intl }) => {
  const { state: cityState } = useCityState()
  const [menu, setMenu] = useState('list')
  const [filteredCities, setFilteredCities] = useState([])
  const [cities, setCities] = useState([])
  const [pickpoint, setPickpoint] = useState({ id: null })
  const noScrollRef = useRef(null)
  const client = useApolloClient()
  const [inputText, setInputText] = useState('')
  const [currentCity, setCurrentCity] = useState({ name: '' })
  const [inputOpened, setInputOpened] = useState(false)

  const citiesFilter = text => {
    const newCities = cities.filter(item => item.name.toLowerCase().includes(text)).slice(0, 24)
    if (text.length !== 0) {
      setFilteredCities(newCities)
    } else {
      setFilteredCities(cities.slice(0, 24))
    }
  }

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const data = await useData(client, cityState.city.code)
        const citiesArray = data.find(item => item.code === 'dealer').cities
        setCurrentCity(citiesArray && citiesArray[0])
        setCities(citiesArray)
        setFilteredCities(citiesArray.slice(0, 24))
      } catch {
        setCities([])
        setFilteredCities([])
      }
    }
    fetchQuery()
  }, [])

  useEffect(() => {
    if (noScrollRef && noScrollRef.current && pickpoint) {
      const stores = store.store.filter(storeItem => typeof storeItem.location === 'string')
      const currentStoreIndex = stores.findIndex(storesItem => storesItem.id === pickpoint.id)
      if (window.innerWidth >= 1200) {
        noScrollRef.current.scrollTo({ top: currentStoreIndex * 129 + 16, behavior: 'smooth' })
      }
    }
  }, [pickpoint])

  const closeFunc = () => {
    onClose()
    setInputText('')
  }

  return (
    <Modal
      visible={opened}
      onClose={closeFunc}
      alignItems={['flex-start', 'flex-start', 'center']}
      justifyContent='center'
    >
      <Box
        position='relative'
        width='100%'
        minHeight={['100%', '100%', 'initial']}
        backgroundColor='white'
        maxWidth={['100%', '100%', '1116px']}
      >
        <Column>
          <Box boxShadow='gray' width='100%' flexDirection='column' alignItems='center'>
            <Column maxWidth={['100%', '100%', '1044px']}>
              <Text cursor='pointer' onClick={closeFunc}>
                <Box
                  right={['20px', '32px', '32px']}
                  top={['23px', '32px', '32px']}
                  position='absolute'
                >
                  <Cross />
                </Box>
              </Text>
              <Layout flexShrink={0} flexBasis={['16px', '32px', '40px']} />
              <Layout
                alignSelf='center'
                maxWidth={['93.3%', '93.3%', '100%']}
                width='100%'
                onClick={closeFunc}
              >
                <Text
                  fontSize={['semiLarge', 'large', 'large']}
                  fontWeight='tiny'
                  textTransform='uppercase'
                >
                  {intl.formatMessage(messages.isInDC)}
                </Text>
              </Layout>
              <Layout flexShrink={0} flexBasis={['10px', '10px', '16px']} />
              <Row
                maxWidth={['93.3%', '93.3%', '100%']}
                alignSelf={['center', 'center', 'initial']}
              >
                <Transition
                  alignItems='center'
                  cursor='pointer'
                  onClick={() => setInputOpened(!inputOpened)}
                >
                  <CityPinIcon width='12px' height='15px' color='#1854CD' />
                  <Text
                    fontWeight='normal'
                    fontSize='semiMedium'
                    lineHeight='extra'
                    color='blue'
                    cursor='pointer'
                  >
                    <Space count={2} />
                    {currentCity.name}
                    <Space count={2} />
                  </Text>
                  <Transition mt='3px' transform={inputOpened ? 'rotate(-180deg)' : 'rotate(0deg)'}>
                    <ArrowToBottomIcon width='9px' height='10px' />
                  </Transition>
                </Transition>
              </Row>
              <Transition flexShrink={0} flexBasis={inputOpened ? ['23px', '23px', '16px'] : '0'} />
              <Transition
                position='relative'
                flexDirection='column'
                width={['90%', '90%', '100%']}
                alignSelf={['center', 'center', 'flex-start']}
                height={inputOpened ? '60px' : '0'}
                overflow={inputOpened ? 'initial' : 'hidden'}
              >
                <Input
                  placeholder={intl.formatMessage(messages.city)}
                  border='none'
                  padding={inputText ? '20px 50px 0 20px' : '0 50px 0 20px'}
                  width='100%'
                  height='60px'
                  backgroundColor='inputGray'
                  fontWeight='small'
                  fontSize='medium'
                  lineHeight='normal'
                  color='semiBlack'
                  value={inputText}
                  onChange={e => {
                    citiesFilter(e.currentTarget.value.toLowerCase())
                    setInputText(e.currentTarget.value)
                  }}
                />
                <Condition match={!!inputText}>
                  <Box position='absolute' top='10px' left='20px'>
                    <Text fontSize='small' color='placeholderGray'>
                      {intl.formatMessage(messages.isInDC)}
                    </Text>
                  </Box>
                </Condition>
                <Layout position='absolute' right={20} top={20}>
                  <IconsManager>
                    <SearchIcon width='20px' height='20px' />
                  </IconsManager>
                </Layout>
                <LiveTyping
                  onClick={item => {
                    setInputText('')
                    setInputOpened(false)
                    setCurrentCity(item)
                  }}
                  opened={!!inputText}
                  items={filteredCities}
                />
              </Transition>
              <Layout flexShrink={0} flexBasis={['32px', '32px', '40px']} />
            </Column>
            <Column display={['flex', 'flex', 'none']}>
              <Divider color='whiteGray' />
              <Row maxWidth='93.3%' alignSelf='center' height='64px'>
                <NavLink
                  color='semiBlack'
                  hoverColor='blue'
                  onClick={() => {
                    setMenu('list')
                  }}
                  active={menu === 'list'}
                >
                  <Text color='inherit' fontSize='medium' lineHeight='extra'>
                    {intl.formatMessage(messages.list)}
                  </Text>
                </NavLink>
                <Layout flexShrink={0} flexBasis='28px' />
                <NavLink
                  color='semiBlack'
                  hoverColor='blue'
                  onClick={() => {
                    setMenu('map')
                  }}
                  active={menu === 'map'}
                >
                  <Text color='inherit' fontSize='medium' lineHeight='extra'>
                    {intl.formatMessage(messages.map)}
                  </Text>
                </NavLink>
              </Row>
            </Column>
          </Box>
          <Row>
            <Layout
              width='100%'
              display={menu === 'list' ? ['flex', 'flex', 'flex'] : ['none', 'none', 'flex']}
              justifyContent='center'
            >
              <NoScrollbar
                maxWidth={['100%', '100%', '558px']}
                maxHeight={['100%', '100%', '518px']}
                minHeight={['100%', 'initial', 'initial']}
                display='block'
                overflowY='auto'
                width='100%'
                ref={noScrollRef}
              >
                {store.store &&
                  store.store.map((itemStore, index) => (
                    <Column
                      maxWidth={['93.3%', '93.3%', '478px']}
                      margin='0 auto'
                      key={itemStore.externalId}
                    >
                      <DealerModalItem
                        lastIndex={store.store && store.store.length}
                        currentCity={currentCity}
                        pickpoint={pickpoint}
                        onItemClick={setPickpoint}
                        index={index}
                        store={itemStore}
                      />
                    </Column>
                  ))}
              </NoScrollbar>
            </Layout>
            <Layout
              width='100%'
              display={menu === 'map' ? ['flex', 'flex', 'flex'] : ['none', 'none', 'flex']}
            >
              <DealerModalMap
                onMapClick={setPickpoint}
                currentMapItem={pickpoint}
                dealers={store.store}
                currentCity={currentCity}
              />
            </Layout>
          </Row>
        </Column>
      </Box>
    </Modal>
  )
}

export default injectIntl(DealerModal)
