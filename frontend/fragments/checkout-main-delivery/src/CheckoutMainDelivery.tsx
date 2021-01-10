import React, { FC, useEffect, useState }    from 'react'
import { Box, Column, Layout }               from '@atlantis-lab/layout'
import { useApolloClient }                   from '@apollo/react-hooks'
import { useIntl }                           from 'react-intl'

import { CheckoutMainMap }                   from '@fragments/checkout-main-map'
import { CheckoutButton }                    from '@ui/button'
import { Condition }                         from '@ui/condition'
import { InputLabel }                        from '@ui/input'
import { Text }                              from '@ui/text'
import { TextArea }                          from '@ui/textarea'
import { useCheckoutDispatch, useCityState } from '@store/stores'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { useData, useLocationsData }         from './useData'

interface Props {
  state?: any
  setState?: (arg0?: any) => void
  currentMapItem?: any
}

const CheckoutMainDelivery: FC<Props> = ({ state, currentMapItem, setState }) => {
  const [deliveryState, setDeliveryState] = useState('')
  const [dealers, setDealers] = useState({ pickpoints: [], id: null, cities: [] })
  const [pickpoints, setPickpoints] = useState({ pickpoints: [], id: null })
  const [courier, setCourier] = useState({ id: null })
  const [cities, setCities] = useState([])
  const [filteredCities, setFilteredCities] = useState([])
  const [cityPickpoint, setCityPickpoint] = useState('')
  const [cityDealer, setCityDealer] = useState('')
  const [isCourierAvailable, setIsCourierAvailable] = useState(false)
  const [isDealerAvailable, setIsDealerAvailable] = useState(false)
  const [isPickpointsAvailable, setIsPickpointsAvailable] = useState(false)
  const { state: cityState } = useCityState()
  const { dispatch: checkoutDispatch } = useCheckoutDispatch()

  const client = useApolloClient()

  const citiesFilter = inputText => {
    const newCities = cities
      .filter(item => item.name.toLowerCase().includes(inputText))
      .slice(0, 24)
    if (inputText.length !== 0) {
      setFilteredCities(newCities)
    } else {
      setFilteredCities(cities.slice(0, 24))
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await useLocationsData(client)
        setCities(data)
        setFilteredCities(data.slice(0, 24))
      } catch {
        setCities([])
        setFilteredCities([])
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const xBasketId = cookieStorage.getItem('xBasketId')
      if (cityDealer || cityPickpoint || cityState.city.code) {
        const data = await useData(
          client,
          xBasketId,
          (deliveryState === 'isDealer' && cityDealer) ||
            (deliveryState === 'isPickpoint' && cityPickpoint) ||
            cityState.city.code
        )
        const dealerObj = data.find(item => item.code === 'dealer')
        const pickpointsObj = data.find(item => item.code === 'pvz')
        const courierObj = data.find(item => item.code === 'tyres')
        setDealers(dealerObj)
        setPickpoints(pickpointsObj)
        /* eslint-disable no-nested-ternary */
        if (!cityPickpoint && !cityDealer) {
          setCourier(courierObj)
          setIsCourierAvailable(courierObj && courierObj.id)
          setIsDealerAvailable(
            dealerObj && dealerObj.pickpoints.length && dealerObj.pickpoints.length > 0
          )
          setIsPickpointsAvailable(
            pickpointsObj && pickpointsObj.pickpoints.length && pickpointsObj.pickpoints.length > 0
          )
          setDeliveryState(
            courierObj && courierObj.id
              ? 'isCourier'
              : dealerObj && dealerObj.pickpoints.length && dealerObj.pickpoints.length > 0
              ? 'isDealer'
              : pickpointsObj &&
                pickpointsObj.pickpoints.length &&
                pickpointsObj.pickpoints.length > 0
              ? 'isPickpoint'
              : ''
          )
        }
      }
    }
    fetchData()
  }, [cityPickpoint, cityDealer, cityState])

  useEffect(() => {
    if (deliveryState) {
      /* eslint-disable no-nested-ternary */
      checkoutDispatch({
        type: 'addDeliveryId',
        payload:
          deliveryState === 'isCourier'
            ? courier.id
            : deliveryState === 'isDealer'
            ? dealers.id
            : pickpoints.id,
      })
    }
  }, [deliveryState])

  const onMapClick = item => {
    setState({
      ...state,
      mapItem: item,
    })
  }

  const intl = useIntl()

  return (
    <Column>
      <Text
        fontWeight='tiny'
        fontSize={['default', 'semiLarge', 'semiLarge']}
        textTransform='uppercase'
        lineHeight='normal'
      >
        {intl.formatMessage(messages.address)}
      </Text>
      <Layout flexBasis='24px' />
      <Box width='100%' flexDirection={['column', 'row', 'row']}>
        <CheckoutButton
          height='48px'
          width='100%'
          active={deliveryState === 'isCourier'}
          onClick={() => {
            if (isCourierAvailable) {
              setDeliveryState('isCourier')
            }
          }}
        >
          <Text
            fontWeight='semiBold'
            color={
              !isCourierAvailable
                ? 'dustyGray'
                : deliveryState === 'isCourier'
                ? 'white'
                : 'dustyBlack'
            }
            fontSize='semiMedium'
          >
            {intl.formatMessage(messages.courier)}
          </Text>
        </CheckoutButton>
        <CheckoutButton
          height='48px'
          width='100%'
          active={deliveryState === 'isPickpoint'}
          onClick={() => {
            if (isPickpointsAvailable) {
              setDeliveryState('isPickpoint')
            }
          }}
        >
          <Text
            fontWeight='semiBold'
            color={
              /* eslint-disable no-nested-ternary */
              !isPickpointsAvailable
                ? 'dustyGray'
                : deliveryState === 'isPickpoint'
                ? 'white'
                : 'dustyBlack'
            }
            fontSize='semiMedium'
          >
            {intl.formatMessage(messages.pickPoint)}
          </Text>
        </CheckoutButton>
        <CheckoutButton
          height='48px'
          width='100%'
          onClick={() => {
            if (isDealerAvailable) {
              setDeliveryState('isDealer')
            }
          }}
          active={deliveryState === 'isDealer'}
        >
          <Text
            fontWeight='semiBold'
            color={
              /* eslint-disable no-nested-ternary */
              !isDealerAvailable
                ? 'dustyGray'
                : deliveryState === 'isDealer'
                ? 'white'
                : 'dustyBlack'
            }
            fontSize='semiMedium'
          >
            {intl.formatMessage(messages.dealer)}
          </Text>
        </CheckoutButton>
      </Box>
      <Layout flexBasis='24px' />
      <Condition match={deliveryState === 'isCourier'}>
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
        <Layout flexShrink={0} flexBasis={['12px', '24px', '24px']} />
        <TextArea
          height='120px'
          backgroundColor='inputGray'
          border='none'
          placeholder={intl.formatMessage(messages.textArea)}
          onChange={e => {
            setState({
              ...state,
              comment: e.currentTarget.value,
            })
          }}
        />
      </Condition>
      <Condition match={deliveryState && deliveryState !== 'isCourier'}>
        <CheckoutMainMap
          isDealer={deliveryState === 'isDealer'}
          isPickpoint={deliveryState === 'isPickpoint'}
          dealers={dealers && dealers.pickpoints}
          dealersCities={dealers && dealers.cities}
          pickpoints={pickpoints && pickpoints.pickpoints}
          filteredCities={filteredCities}
          citiesFilter={citiesFilter}
          onPickpointCityClick={setCityPickpoint}
          onDealerCityClick={setCityDealer}
          currentMapItem={currentMapItem}
          onMapClick={onMapClick}
        />
      </Condition>
    </Column>
  )
}

export default CheckoutMainDelivery
