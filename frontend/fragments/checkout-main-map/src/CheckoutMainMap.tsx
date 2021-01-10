import GoogleMapReact                             from 'google-map-react'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Box, Column, Layout, Row }               from '@atlantis-lab/layout'
import { useIntl }                                from 'react-intl'

import { Condition }                              from '@ui/condition'
import { Cross }                                  from '@ui/cross'
import { Divider }                                from '@ui/divider'
import { InputLabel }                             from '@ui/input'
import { LiveTyping }                             from '@ui/live-typing'
import { MapPin }                                 from '@ui/map-pin'
import { NoScrollbar }                            from '@ui/no-scrollbar'
import { BMWBlockSelect }                         from '@ui/select'
import { Space, Text }                            from '@ui/text'
import { Transition }                             from '@ui/transition'
import { useCheckoutDispatch, useCityState }      from '@store/stores'
import { unique }                                 from '@utils/unique'

import messages                                   from './messages'

const CheckoutMainMap: FC<any> = ({
  isDealer,
  isPickpoint,
  onMapClick,
  dealers,
  dealersCities,
  filteredCities,
  citiesFilter,
  onPickpointCityClick,
  onDealerCityClick,
  pickpoints,
  currentMapItem,
}) => {
  const [center, setCenter] = useState({
    lat: 55.754047,
    lng: 37.620405,
  })
  const [inputText, setInputText] = useState('')
  const [uniqueKey, setUniqueKey] = useState(unique())
  const [map, setMap] = useState({ panTo: a => {}, setCenter: a => {}, zoom: null })
  const [maps, setMaps] = useState({ LatLng: (a, b) => {} })
  const [pickpointValue, setPickpointValue] = useState({ name: '', region: '' })
  const [dealerCity, setDealerCity] = useState({ name: 'Москва', code: '' })
  const { state: cityState } = useCityState()
  const { dispatch: checkoutDispatch } = useCheckoutDispatch()
  const intl = useIntl()
  const noScrollRef = useRef(null)
  const arrayRefs = useRef([])

  const handleApiLoaded = (mapObject, mapsObject) => {
    setMaps(mapsObject)
    setMap(mapObject)
  }

  useEffect(() => {
    if (noScrollRef && noScrollRef.current && currentMapItem) {
      const currentDealerIndex = dealers
        .filter(dealerObject => dealerObject.city === dealerCity.name)
        .findIndex(dealersItem => dealersItem.code === currentMapItem.code)
      if (window.innerWidth >= 720) {
        noScrollRef.current.scrollTo({ top: currentDealerIndex * (43 + 32), behavior: 'smooth' })
      }
    }
  }, [currentMapItem])

  useEffect(() => {
    setCenter({
      lat: cityState.city.lat || 55.754047,
      lng: cityState.city.lon || 37.620405,
    })
    setUniqueKey(unique())
  }, [cityState])

  const onClick = item => {
    checkoutDispatch({
      type: 'addPickpointId',
      payload: item.code,
    })
    onMapClick(item)
  }

  const onPickpointClick = item => {
    onClick(item)
    const LatLng = new maps.LatLng(item.lat, item.lot)
    map.panTo(LatLng)
  }

  const onDealerClick = item => {
    onClick(item)
    const LatLng = new maps.LatLng(item.lat, item.lot)
    map.panTo(LatLng)
  }

  const onInputClick = item => {
    setInputText('')
    setPickpointValue(item)
    onPickpointCityClick(item.code)
    const LatLng = new maps.LatLng(item.lat, item.lon)
    map.panTo(LatLng)
  }

  return (
    <Box height={[isDealer ? '360px' : '430px', '360px', '360px']} width='100%' position='relative'>
      <Condition match={isDealer}>
        <Column
          maxWidth={['100%', '240px', '240px']}
          minWidth={['100%', 'initial', 'initial']}
          zIndex={6}
        >
          <Box
            justifyContent='center'
            width='100%'
            boxShadow='googleShadow'
            backgoundColor='slightlyGray'
          >
            <Column maxWidth={['90%', '204px', '204px']}>
              <Layout flexBasis='10px' />
              <Text
                fontSize='small'
                color='crumbsGray'
                textTransform='uppercase'
                fontWeight='semiBold'
              >
                {intl.formatMessage(messages.yourCity)}
              </Text>
              <BMWBlockSelect
                items={dealersCities.map(item => item.name)}
                value={dealerCity.name}
                onClick={cityName => {
                  const cityObject = dealersCities.find(item => item.name === cityName)
                  onDealerCityClick(cityObject.code)
                  setDealerCity(cityObject)
                  const LatLng = new maps.LatLng(cityObject.lat, cityObject.lon)
                  map.panTo(LatLng)
                }}
                liveTypingWidth={['100%', '240px', '240px']}
                liveTypingLeft={[0, -18, -18]}
                backgroundColor='white'
                cursorTop={18}
              />
              <Layout flexBasis='10px' />
            </Column>
          </Box>
          <NoScrollbar
            width='100%'
            maxHeight='290px'
            display='block'
            overflowY='auto'
            ref={noScrollRef}
          >
            {dealers
              .filter(dealerObject => dealerObject.city === dealerCity.name)
              .map(item => (
                <Transition
                  key={`${item.code}`}
                  ref={ref => {
                    arrayRefs.current.push(ref)
                  }}
                  width='100%'
                  backgroundColor={item.code === currentMapItem.code ? 'blue' : 'slightlyGray'}
                  alignItems='center'
                  flexDirection='column'
                  cursor='pointer'
                  onClick={() => {
                    onClick(item)
                    const LatLng = new maps.LatLng(item.lat, item.lot)
                    map.panTo(LatLng)
                  }}
                >
                  <Column maxWidth={['90%', '204px', '204px']}>
                    <Layout flexBasis='16px' />
                    <Text
                      fontSize='semiMedium'
                      lineHeight='extra'
                      color={item.code === currentMapItem.code ? 'white' : 'semiBlack'}
                    >
                      {item.title}
                    </Text>
                    <Layout flexBasis='4px' />
                    <Text
                      fontSize='small'
                      lineHeight='extra'
                      fontWeight='semiBold'
                      color={item.code === currentMapItem.code ? 'white' : 'motionGray'}
                    >
                      {item.addr}
                    </Text>
                    <Layout flexBasis='16px' />
                  </Column>
                  <Divider color='buttonGray' />
                </Transition>
              ))}
          </NoScrollbar>
        </Column>
      </Condition>
      <Condition match={isPickpoint}>
        <Condition
          match={
            currentMapItem && pickpoints.findIndex(item => item.code === currentMapItem.code) >= 0
          }
        >
          <Box
            backgroundColor='slightlyGray'
            height='100%'
            minWidth={['100%', '344px', '344px']}
            zIndex={6}
            justifyContent='center'
          >
            <Column maxWidth={['90%', '296px', '296px']} width='100%'>
              <Layout flexBasis='24px' />
              <Row justifyContent='space-between'>
                <Text fontWeight='semiBold' fontSize='default'>
                  {intl.formatMessage(messages.pickpoint)}
                </Text>
                <Box onClick={() => onClick({ code: '' })}>
                  <Cross />
                </Box>
              </Row>
              <Layout flexBasis='16px' />
              <Divider color='dividerGray' />
              <Layout flexBasis='16px' />
              <Text fontSize='semiMedium' lineHeight='extra'>
                {currentMapItem.addr}
              </Text>
            </Column>
          </Box>
        </Condition>
        <Layout
          position='absolute'
          zIndex={5}
          top={[0, 24, 24]}
          left={[0, 24, 24]}
          width={['100%', '320px', '320px']}
          alignSelf={['center', 'center', 'flex-start']}
        >
          <Layout position='relative' width='100%'>
            <InputLabel
              placeholder={intl.formatMessage(messages.city)}
              border='none'
              width='100%'
              height='60px'
              value={inputText || (pickpointValue.name ? ' ' : '')}
              disabled={!!pickpointValue.name}
              backgroundColor='inputGray'
              fontWeight='small'
              fontSize='medium'
              lineHeight='normal'
              color='semiBlack'
              onChange={text => {
                citiesFilter(text.toLowerCase())
                setInputText(text)
              }}
            />
            <Box
              position='absolute'
              top={27}
              left={20}
              maxWidth={['60%', '240px', '240px']}
              display={pickpointValue.name && !inputText ? 'flex' : 'none'}
            >
              <Text fontSize='medium' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                {pickpointValue.name}
                <Text
                  fontSize='medium'
                  color='motionGray'
                  overflow='hidden'
                  textOverflow='ellipsis'
                  whiteSpace='nowrap'
                >
                  <Space />({pickpointValue.region})
                </Text>
              </Text>
            </Box>
            <Box
              position='absolute'
              right={20}
              top={24}
              display={pickpointValue.name && !inputText ? 'flex' : 'none'}
              onClick={() => setPickpointValue({ name: '', region: '' })}
            >
              <Cross width='12px' height='12px' />
            </Box>
          </Layout>
          <LiveTyping onClick={onInputClick} opened={!!inputText} items={filteredCities} />
        </Layout>
      </Condition>
      <Box
        alignSelf={['flex-end', 'initial', 'initial']}
        height='360px'
        width='100%'
        overflow='hidden'
      >
        <GoogleMapReact
          key={uniqueKey}
          bootstrapURLKeys={{ key: 'AIzaSyCzgGwVBh-lMXtnbOFY10Ba5OrMetra4pA' }}
          defaultCenter={center}
          defaultZoom={11}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map: mapProp, maps: mapsProp }) =>
            handleApiLoaded(mapProp, mapsProp)
          }
        >
          {isDealer &&
            dealers.map(item => (
              <Box key={item.code} lat={item.lat} lng={item.lot}>
                <MapPin
                  item={item}
                  onClick={onDealerClick}
                  clicked={currentMapItem && currentMapItem.code === item.code}
                />
              </Box>
            ))}
          {isPickpoint &&
            pickpoints.map(item => (
              <Box key={item.code} lat={item.lat} lng={item.lot}>
                <MapPin
                  item={item}
                  onClick={onPickpointClick}
                  clicked={currentMapItem && currentMapItem.code === item.code}
                />
              </Box>
            ))}
        </GoogleMapReact>
      </Box>
    </Box>
  )
}

export default CheckoutMainMap
