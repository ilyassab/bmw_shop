import React, { FC, useEffect, useState }    from 'react'
import { Box, Column, Layout, Row }          from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { useApolloClient }                   from '@apollo/react-hooks'

import { EditCarModal }                      from '@fragments/edit-car-modal'
import { NewCarModal }                       from '@fragments/new-car-modal'
import { Button }                            from '@ui/button'
import { Condition }                         from '@ui/condition'
import { CloseIcon, CrossIcon, PencilIcon }  from '@ui/icons'
import { Loader }                            from '@ui/loader'
import { Space, Text }                       from '@ui/text'
import { cookieStorage }                     from '@utils/cookie-storage'

import messages                              from './messages'
import { useData, useDataDeleteCar }         from './useData'

const UserCabinetCar: FC<WrappedComponentProps> = ({ intl }) => {
  const [openedNewCarModal, setOpenedNewCarModal] = useState(false)
  const [currentCarId, setCurrentCarId] = useState(null)
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const client = useApolloClient()

  const onDelete = id => {
    const fetchData = async () => {
      const token = cookieStorage.getItem('token')
      const data = await useDataDeleteCar(client, id, token)
      setCars(data)
    }
    fetchData()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const token = cookieStorage.getItem('token') || ''
        const data = await useData(client, token)
        setCars(data)
        setLoading(false)
      } catch {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <Layout width='100%' justifyContent='center'>
        <Box height='32px'>
          <Loader />
        </Box>
      </Layout>
    )
  }

  return (
    <Column maxWidth={['93.3%', '93.3%', '690px']} alignSelf={['center', 'center', 'initial']}>
      <Text
        fontWeight='tiny'
        fontSize={['semiLarge', 'semiLarge', 'large']}
        textTransform='uppercase'
        lineHeight='normal'
      >
        {intl.formatMessage(messages.myCar)}
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
      <Layout flexBasis='40px' />
      {cars.map(carObject => (
        <Column key={carObject.vin}>
          <Box
            width='100%'
            flexDirection='column'
            borderLeft={carObject.favorite ? 'blue' : ''}
            backgroundColor='slightlyGray'
          >
            <Layout flexBasis='24px' />
            <Row alignItems='center'>
              <Layout flexShrink={0} flexBasis={carObject.favorite ? '22px' : '24px'} />
              <Box width='100%' flexDirection={['column', 'row', 'row']}>
                <Column maxWidth={['90%', '90%', '90%']}>
                  <Text fontSize='medium' fontWeight='normal'>
                    {carObject.body}
                    <Condition match={carObject.favorite}>
                      <Space />
                      {intl.formatMessage(messages.mainCar)}
                    </Condition>
                  </Text>
                  <Layout flexBasis='8px' />
                  <Row>
                    <Box maxWidth={['180px', '250px', '250px']}>
                      <Text
                        color='motionGray'
                        fontSize='13px'
                        fontWeight='normal'
                        overflow='hidden'
                        textOverflow='ellipsis'
                        whiteSpace='nowrap'
                      >
                        {carObject.vin}
                      </Text>
                    </Box>
                    <Text
                      color='motionGray'
                      fontSize='13px'
                      fontWeight='normal'
                      overflow='hidden'
                      textOverflow='ellipsis'
                      whiteSpace='nowrap'
                    >
                      <Space />
                      {carObject.dealer && carObject.dealer.name && '\u00B7'}
                      <Space />
                      {carObject.dealer && carObject.dealer.name}
                    </Text>
                  </Row>
                </Column>
                <Layout flexBasis={['24px', '0px', '0px']} flexGrow={1} />
                <Row alignItems='center' width='auto'>
                  <Button
                    minWidth='40px'
                    height='40px'
                    backgroundColor='whiteGray'
                    onClick={() => {
                      setCurrentCarId(carObject.id)
                    }}
                  >
                    <PencilIcon width='12px' height='12px' />
                  </Button>
                  <Layout width='12px' />
                  <Button
                    minWidth='40px'
                    height='40px'
                    backgroundColor='whiteGray'
                    onClick={() => onDelete(carObject.id)}
                  >
                    <CloseIcon width='12px' height='12px' color='rgba(38, 38, 38, 1)' />
                  </Button>
                </Row>
              </Box>
              <Layout flexBasis={['0px', '26px', '26px']} />
            </Row>
            <Layout flexBasis='24px' />
          </Box>
          <Layout flexBasis='16px' />
        </Column>
      ))}
      <Layout flexBasis='24px' />
      <Button
        height='60px'
        border='lightBlue'
        backgroundColor='white'
        onClick={() => setOpenedNewCarModal(true)}
      >
        <Text fontWeight='semiBold' fontSize='semiMedium' whiteSpace='nowrap' color='blue'>
          <Row alignItems='center'>
            <CrossIcon color='rgba(24, 84, 205, 1)' />
            <Space count={2} />
            {intl.formatMessage(messages.addCar)}
          </Row>
        </Text>
      </Button>
      <NewCarModal
        opened={openedNewCarModal}
        onClose={() => setOpenedNewCarModal(false)}
        setCars={setCars}
      />
      <EditCarModal
        id={currentCarId}
        opened={currentCarId !== null}
        onClose={() => setCurrentCarId(null)}
        setCars={setCars}
      />
    </Column>
  )
}

export default injectIntl(UserCabinetCar)
