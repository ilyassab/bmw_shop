import React, { FC, useEffect, useState }          from 'react'
import { Box, Column, Layout }                     from '@atlantis-lab/layout'
import { useApolloClient }                         from '@apollo/react-hooks'
import { useIntl }                                 from 'react-intl'

import { Modal }                                   from '@atlantis-lab/modal'
import { BlueButton }                              from '@ui/button'
import { Cross }                                   from '@ui/cross'
import { Input }                                   from '@ui/input'
import { Checkbox }                                from '@ui/input'
import { BMWBlockSelect }                          from '@ui/select'
import { Text }                                    from '@ui/text'
import { useBmwFilterDispatch, useBmwFilterState } from '@store/stores'
import { cookieStorage }                           from '@utils/cookie-storage'

import messages                                    from './messages'
import {
  useDataCarcases,
  useDataDealers,
  useDataInitial,
  useDataModels,
  useDataPutCar,
  useDataSeries,
} from './useData'

interface Props {
  onClose?: () => void
  onPickCity?: () => void
  setCars?: (arg0?: any) => void
  isMobile?: boolean
  opened?: boolean
  id?: number
}

const EditCarModal: FC<Props> = ({ onClose, opened, id, setCars }) => {
  const intl = useIntl()
  const { dispatch: bmwFilterDispatch } = useBmwFilterDispatch()
  const { state: bmwFilterState } = useBmwFilterState()
  const [dealers, setDealers] = useState([])
  const [currentDealer, setCurrentDealer] = useState({ id: null, name: '' })
  const [vin, setVin] = useState('')
  const [checkbox, setCheckbox] = useState(false)
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()

  const onCloseClick = () => {
    bmwFilterDispatch({ type: 'removeCurrents' })
    setVin('')
    setCurrentDealer({ id: null, name: '' })
    setCheckbox(false)
    onClose()
  }

  const onClick = async () => {
    setLoading(true)
    const token = cookieStorage.getItem('token') || ''
    const data = await useDataPutCar(
      client,
      {
        body: bmwFilterState.currentCarcase,
        dealer: currentDealer && currentDealer.id,
        favorite: checkbox,
        model: bmwFilterState.currentModel,
        code: bmwFilterState.currentModel,
        series: bmwFilterState.currentSeries,
        vin,
      },
      id,
      token
    )
    setLoading(false)
    setCars(data)
    onCloseClick()
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = cookieStorage.getItem('token') || ''
      const data = await useDataInitial(client, id, token)
      if (data) {
        bmwFilterDispatch({ type: 'setCurrentSeries', payload: data.series })
        bmwFilterDispatch({ type: 'setCurrentCarcase', payload: data.body })
        bmwFilterDispatch({ type: 'setCurrentModel', payload: data.model })
        setVin(data.vin)
        setCurrentDealer(data.dealer)
        setCheckbox(data.favorite)
      }
    }
    if (id) {
      fetchData()
    }
  }, [id])

  useEffect(() => {
    const fetchData = async () => {
      const data = await useDataSeries(client)
      bmwFilterDispatch({ type: 'setSeries', payload: data })
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (bmwFilterState.currentSeries) {
        const data = await useDataCarcases(client, bmwFilterState.currentSeries)
        bmwFilterDispatch({ type: 'setCarcases', payload: data })
      }
    }
    fetchData()
  }, [bmwFilterState.currentSeries])

  useEffect(() => {
    const fetchData = async () => {
      if (bmwFilterState.currentCarcase) {
        const data = await useDataModels(
          client,
          bmwFilterState.currentSeries,
          bmwFilterState.currentCarcase
        )
        bmwFilterDispatch({ type: 'setModels', payload: data })
      }
    }
    fetchData()
  }, [bmwFilterState.currentCarcase])

  useEffect(() => {
    const fetchData = async () => {
      const data = await useDataDealers(client)
      setDealers(data)
    }
    fetchData()
  }, [])

  return (
    <Modal
      visible={opened}
      onClose={onCloseClick}
      alignItems={['flex-start', 'flex-start', 'center']}
    >
      <Box
        position='relative'
        justifyContent='center'
        width='100%'
        backgroundColor='white'
        maxWidth={['100%', '100%', '792px']}
        minHeight={['100vh', '100vh', 'initial']}
      >
        <Box position='absolute' top={[20, 32, 32]} right={[16, 32, 32]} onClick={onCloseClick}>
          <Cross />
        </Box>
        <Column maxWidth={['90%', '90%', '672px']} width='100%'>
          <Layout flexBasis={['16px', '32px', '60px']} />
          <Layout maxWidth='98%'>
            <Text
              fontSize={['semiLarge', 'large', 'large']}
              fontWeight={['tiny', 'tiny', 'tiny']}
              textTransform='uppercase'
            >
              {intl.formatMessage(messages.editCar)}.
            </Text>
          </Layout>
          <Layout flexBasis={['16px', '16px', '24px']} />
          <Text
            fontWeight='normal'
            fontSize={['semiMedium', 'medium', 'medium']}
            color='dustyGray'
            lineHeight='extra'
          >
            {intl.formatMessage(messages.text)}
          </Text>
          <Layout flexBasis={['24px', '24px', '32px']} flexGrow={[1, 1, 0]} />
          <Box width='100%' flexDirection={['column', 'row', 'row']}>
            <BMWBlockSelect
              height='60px'
              backgroundColor='alto'
              cursorTop={27}
              cursorRight={20}
              padding='0 35px 0 20px'
              maxWidth={['100%', '33%', '33%']}
              color='semiBlack'
              liveTop='60px'
              items={bmwFilterState.series}
              value={bmwFilterState.currentSeries || intl.formatMessage(messages.series)}
              onClick={item => {
                if (item !== bmwFilterState.currentSeries) {
                  bmwFilterDispatch({ type: 'setCurrentSeries', payload: item })
                  bmwFilterDispatch({ type: 'setCurrentCarcase', payload: '' })
                  bmwFilterDispatch({ type: 'setCurrentModel', payload: '' })
                  bmwFilterDispatch({ type: 'setCarcases', payload: [] })
                  bmwFilterDispatch({ type: 'setModels', payload: [] })
                }
              }}
            />
            <Layout flexShrink={0} flexBasis={['16px', '24px', '24px']} />
            <BMWBlockSelect
              height='60px'
              backgroundColor='alto'
              cursorTop={27}
              cursorRight={20}
              padding='0 35px 0 20px'
              color='semiBlack'
              maxWidth={['100%', '33%', '33%']}
              liveTop='60px'
              items={bmwFilterState.carcases}
              value={bmwFilterState.currentCarcase || intl.formatMessage(messages.carcase)}
              onClick={item => {
                if (item !== bmwFilterState.currentCarcase) {
                  bmwFilterDispatch({ type: 'setCurrentModel', payload: '' })
                  bmwFilterDispatch({ type: 'setModels', payload: [] })
                  bmwFilterDispatch({ type: 'setCurrentCarcase', payload: item })
                }
              }}
            />
            <Layout flexShrink={0} flexBasis={['16px', '24px', '24px']} />
            <BMWBlockSelect
              height='60px'
              backgroundColor='alto'
              cursorTop={27}
              cursorRight={20}
              padding='0 35px 0 20px'
              maxWidth={['100%', '33%', '33%']}
              color='semiBlack'
              liveTop='60px'
              items={bmwFilterState.models}
              value={bmwFilterState.currentModel || intl.formatMessage(messages.model)}
              onClick={item => {
                if (item !== bmwFilterState.currentModel) {
                  bmwFilterDispatch({ type: 'setCurrentModel', payload: item })
                }
              }}
            />
          </Box>
          <Layout flexShrink={0} flexBasis={['16px', '24px', '24px']} />
          <Box width='100%' flexDirection={['column', 'row', 'row']}>
            <Input
              height='60px'
              width='100%'
              border='none'
              fontSize='medium'
              value={vin}
              onChange={e => setVin(e.currentTarget.value)}
              placeholder={intl.formatMessage(messages.vin)}
              placeholderColor='listGray'
              backgroundColor='alto'
              cursorTop={27}
              cursorRight={27}
              padding='0 20px'
            />
            <Layout flexShrink={0} flexBasis={['16px', '24px', '24px']} />
            <BMWBlockSelect
              height='60px'
              backgroundColor='alto'
              cursorTop={27}
              cursorRight={27}
              maxWidth={['100%', '49%', '49%']}
              padding='0 35px 0 20px'
              color='semiBlack'
              liveTop='60px'
              items={dealers.map(dealerObject => dealerObject.name)}
              value={(currentDealer && currentDealer.name) || intl.formatMessage(messages.dealers)}
              onClick={item => {
                const dealerObject = dealers.find(dealerItem => dealerItem.name === item)
                setCurrentDealer(dealerObject)
              }}
            />
          </Box>
          <Layout flexShrink={0} flexBasis={['24px', '24px', '32px']} />
          <Checkbox
            checked={checkbox}
            onChange={newValue => {
              setCheckbox(newValue)
            }}
          >
            <Layout flexBasis='16px' />
            <Text
              fontWeight='normal'
              fontSize={['semiMedium', 'medium', 'medium']}
              lineHeight='extra'
            >
              {intl.formatMessage(messages.mainCar)}
            </Text>
          </Checkbox>
          <Layout flexBasis='32px' flexGrow={[1, 1, 0]} />
          <BlueButton width='100%' height='60px' loading={loading} onClick={onClick}>
            <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='white'>
              {intl.formatMessage(messages.addCar)}
            </Text>
          </BlueButton>
          <Layout flexBasis={['16px', '32px', '60px']} />
        </Column>
      </Box>
    </Modal>
  )
}

export default EditCarModal
