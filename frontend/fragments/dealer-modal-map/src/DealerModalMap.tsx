import GoogleMapReact                                          from 'google-map-react'
import React, { FC, useEffect, useState }                      from 'react'
import { Box, Column, Layout, Row }                            from '@atlantis-lab/layout'
import { useIntl }                                             from 'react-intl'

import { Cross }                                               from '@ui/cross'
import { Divider }                                             from '@ui/divider'
import { ArrowToBottomIcon, CityPinIcon, PhoneIcon, TimeIcon } from '@ui/icons'
import { MapPin }                                              from '@ui/map-pin'
import { Space, Text }                                         from '@ui/text'
import { Transition }                                          from '@ui/transition'
import { unique }                                              from '@utils/unique'

import messages                                                from './messages'

const DealerModalMap: FC<any> = ({ onMapClick, dealers, currentCity, currentMapItem }) => {
  const [center, setCenter] = useState({
    lat: 55.754047,
    lng: 37.620405,
  })

  const intl = useIntl()
  const [map, setMap] = useState({ panTo: a => {}, setCenter: a => {} })
  const [maps, setMaps] = useState({ LatLng: (a, b) => {} })
  const [windowWidth, setWindowWidth] = useState(0)

  const [uniqueKey, setUniqueKey] = useState(unique())
  const handleApiLoaded = (mapObject, mapsObject) => {
    setMaps(mapsObject)
    setMap(mapObject)
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    if (currentMapItem.lat && currentMapItem.lng) {
      const coordinate = windowWidth >= 1200 ? 0.03 : 0
      const topCoordinate =
        /* eslint-disable no-nested-ternary */
        windowWidth >= 1200 ? 0 : windowWidth >= 720 ? 0 : windowWidth >= 375 ? -0.08 : -0.16
      const LatLng = new maps.LatLng(
        currentMapItem.lat + coordinate + topCoordinate,
        currentMapItem.lng + coordinate * 2
      )
      map.panTo(LatLng)
    }
  }, [currentMapItem])

  useEffect(() => {
    setUniqueKey(unique())
    setCenter({
      lat: parseFloat(currentCity.lat),
      lng: parseFloat(currentCity.lon),
    })
  }, [currentCity])

  const realDealers = dealers.filter(
    item => typeof item.lat === 'number' && typeof item.lng === 'number' && item.location !== null
  )

  return (
    <Box
      position='relative'
      height={['calc(100vh - 178px)', 'calc(100vh - 216px)', '518px']}
      width={['100%', '100%', '558px']}
      overflow='hidden'
    >
      {currentMapItem && currentMapItem.name && windowWidth < 1200 && (
        <Box
          position='absolute'
          backgroundColor='white'
          width='100%'
          justifyContent='center'
          bottom={0}
          zIndex={1}
        >
          <Layout width='93.3%'>
            <Text cursor='pointer'>
              <Box
                onClick={() => onMapClick({})}
                right='15px'
                top='15px'
                position='absolute'
                alignItems='center'
              >
                <Transition width='10px' height='18px' transform='rotate(180deg)'>
                  <ArrowToBottomIcon width='10px' height='18px' color='rgba(186, 186, 186, 1)' />
                </Transition>
                <Text fontSize='small' fontWeight='normal' color='dustyGray' pl='5px'>
                  {intl.formatMessage(messages.hide)}
                </Text>
              </Box>
            </Text>
            <Column maxWidth='100%'>
              <Layout flexBasis='24px' />
              <Text
                fontWeight='normal'
                fontSize='medium'
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
              >
                {currentMapItem.name}
              </Text>
              <Layout flexBasis='4px' />
              <Text
                fontSize='semiMedium'
                fontWeight='normal'
                color='crumbsGray'
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
              >
                {intl.formatMessage(messages.all)}
                <Space />
                <Text
                  color='blue'
                  fontWeight='semiBold'
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                >
                  {currentMapItem.quantity}
                  <Space />
                  {intl.formatMessage(messages.count)}
                </Text>
              </Text>
              <Layout flexBasis='16px' />
              <Row>
                <Box>
                  <CityPinIcon color='rgba(188, 188, 188, 1)' width='20px' height='20px' />
                </Box>
                <Layout flexShrink={0} flexBasis='8px' />
                <Text fontSize='semiMedium' fontWeight='normal' color='crumbsGray'>
                  {currentMapItem.address}
                </Text>
              </Row>
              <Layout flexBasis='16px' />
              <Row>
                <TimeIcon width='18px' height='18px' />
                <Layout flexBasis='8px' />
                <Text fontSize='semiMedium' fontWeight='normal' color='crumbsGray'>
                  {currentMapItem.worktime}
                </Text>
              </Row>
              <Layout flexBasis='16px' />
              <Row>
                <PhoneIcon width='17px' height='17px' />
                <Layout flexBasis='8px' />
                <Text fontSize='semiMedium' fontWeight='normal' color='crumbsGray'>
                  {currentMapItem.phone}
                </Text>
              </Row>
              <Layout flexBasis='24px' />
            </Column>
          </Layout>
        </Box>
      )}
      <GoogleMapReact
        key={uniqueKey}
        bootstrapURLKeys={{ key: 'AIzaSyCzgGwVBh-lMXtnbOFY10Ba5OrMetra4pA' }}
        defaultCenter={center}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map: mapProp, maps: mapsProp }) => handleApiLoaded(mapProp, mapsProp)}
      >
        {currentMapItem && currentMapItem.name && windowWidth >= 1200 && (
          <Box position='relative' width='100%' lat={currentMapItem.lat} lng={currentMapItem.lng}>
            <Box
              position='absolute'
              zIndex={1}
              top={-250}
              width='288px'
              backgroundColor='white'
              justifyContent='center'
            >
              <Text cursor='pointer'>
                <Box onClick={() => onMapClick({})} right='15px' top='15px' position='absolute'>
                  <Cross />
                </Box>
              </Text>
              <Column maxWidth='240px'>
                <Layout flexBasis='24px' />
                <Text
                  fontWeight='normal'
                  fontSize='medium'
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                >
                  {currentMapItem.name}
                </Text>
                <Layout flexBasis='4px' />
                <Text
                  fontSize='semiMedium'
                  fontWeight='normal'
                  color='crumbsGray'
                  whiteSpace='nowrap'
                  overflow='hidden'
                  textOverflow='ellipsis'
                >
                  {intl.formatMessage(messages.all)}
                  <Space />
                  <Text
                    color='blue'
                    fontWeight='semiBold'
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipsis'
                  >
                    {currentMapItem.quantity}
                    <Space />
                    {intl.formatMessage(messages.count)}
                  </Text>
                </Text>
                <Layout flexBasis='16px' />
                <Divider color='whiteGray' />
                <Layout flexBasis='16px' />
                <Row>
                  <Box>
                    <CityPinIcon color='rgba(188, 188, 188, 1)' width='20px' height='20px' />
                  </Box>
                  <Layout flexShrink={0} flexBasis='8px' />
                  <Text fontSize='semiMedium' fontWeight='normal' color='crumbsGray'>
                    {currentMapItem.address}
                  </Text>
                </Row>
                <Layout flexBasis='16px' />
                <Row>
                  <TimeIcon width='18px' height='18px' />
                  <Layout flexBasis='8px' />
                  <Text fontSize='semiMedium' fontWeight='normal' color='crumbsGray'>
                    {currentMapItem.worktime}
                  </Text>
                </Row>
                <Layout flexBasis='16px' />
                <Row>
                  <PhoneIcon width='17px' height='17px' />
                  <Layout flexBasis='8px' />
                  <Text fontSize='semiMedium' fontWeight='normal' color='crumbsGray'>
                    {currentMapItem.phone}
                  </Text>
                </Row>
                <Layout flexBasis='24px' />
              </Column>
            </Box>
          </Box>
        )}
        {realDealers &&
          realDealers.map(item => (
            <Box key={item.externalId} lat={item.lat} lng={item.lng}>
              <MapPin
                item={item}
                onClick={() => onMapClick(item)}
                clicked={currentMapItem && currentMapItem.id === item.id}
              />
            </Box>
          ))}
      </GoogleMapReact>
    </Box>
  )
}

export default DealerModalMap
