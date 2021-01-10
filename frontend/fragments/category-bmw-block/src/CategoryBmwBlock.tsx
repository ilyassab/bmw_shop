import React, { useEffect, useState }                 from 'react'
import { Box, Column, Layout }                        from '@atlantis-lab/layout'
import { useApolloClient }                            from '@apollo/react-hooks'
import { useRouter }                                  from 'next/router'
import { useIntl }                                    from 'react-intl'

import { Condition }                                  from '@ui/condition'
import { BmwBlockIcon, CloseIcon }                    from '@ui/icons'
import { BMWBlockSelect }                             from '@ui/select'
import { Text }                                       from '@ui/text'
import { Transition }                                 from '@ui/transition'
import { cookieStorage }                              from '@utils/cookie-storage'
import { filterParser }                               from '@utils/filter-parser'

import messages                                       from './messages'
import { useDataCarcaseFilter, useDataSeries }        from './useData'
import { useDataCar, useDataCarcases, useDataModels } from './useData'

const CategoryBmwBlock = () => {
  const router: any = useRouter()
  const [query, setQuery] = useState((router && router.query) || {})
  const [state, setState] = useState({
    currentSeries: '',
    currentCarcase: '',
    currentModel: '',
    series: [],
    carcases: [],
    models: [],
  })
  const [series, setSeries] = useState([])
  const [models, setModels] = useState([])
  const [carcases, setCarcases] = useState([])
  const [hover, setHover] = useState(false)
  const client = useApolloClient()
  const intl = useIntl()

  useEffect(() => {
    const currentSeries = cookieStorage.getItem('currentSeries')
    const currentCarcase = cookieStorage.getItem('currentCarcase')
    const currentModel = cookieStorage.getItem('currentModel')
    if (query.series) {
      setState({
        ...state,
        currentSeries: decodeURI(query.series) || '',
        currentCarcase: decodeURI(query.carcase) || '',
        currentModel: decodeURI(query.model) || '',
      })
    } else {
      setState({
        ...state,
        currentSeries: currentSeries || '',
        currentCarcase: currentCarcase || '',
        currentModel: currentModel || '',
      })
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const data = await useDataSeries(client)
      setSeries(data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (state.currentSeries) {
        const data = await useDataCarcases(client, state.currentSeries)
        setCarcases(data)
      }
    }
    fetchData()
  }, [state.currentSeries])

  useEffect(() => {
    const fetchData = async () => {
      if (state.currentCarcase) {
        const data = await useDataModels(client, state.currentSeries, state.currentCarcase)
        setModels(data)
      }
    }
    fetchData()
  }, [state.currentCarcase])

  useEffect(() => {
    const fetchData = async () => {
      if (state.currentSeries && state.currentCarcase) {
        const data = await useDataCarcaseFilter(client, state.currentSeries, state.currentCarcase)
        const bmwFilter = []
        data.map(item => bmwFilter.push({ key: item.key, value: item.value }))
        filterParser.addAdditionalFilter(
          data,
          state.currentSeries,
          state.currentCarcase,
          state.currentModel,
          true
        )
      }
    }
    fetchData()
  }, [state.currentCarcase])

  useEffect(() => {
    const fetchData = async () => {
      if (state.currentCarcase && state.currentModel && state.currentSeries) {
        const data = await useDataCar(
          client,
          state.currentSeries,
          state.currentCarcase,
          state.currentModel
        )
        const bmwFilter = []
        data.map(item => bmwFilter.push({ key: item.key, value: item.value }))
        filterParser.addAdditionalFilter(
          data,
          state.currentSeries,
          state.currentCarcase,
          state.currentModel
        )
      }
    }
    fetchData()
  }, [state.currentModel])

  useEffect(() => {
    const handleRouteChanged = () => {
      if (window && window.history) {
        setQuery(window.history.state.url.query || {})
      }
    }
    router.events.on('routeChangeComplete', handleRouteChanged)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChanged)
    }
  }, [])

  return (
    <Box width='100%' backgroundColor='slightlyGray' justifyContent='center' position='relative'>
      <Box width='100%' height='100%' position='absolute'>
        <Box width='100%' height='100%' position='relative' overflow='hidden'>
          <Box position='absolute' right={0} bottom={[-12, -12, -80]}>
            <BmwBlockIcon width='200px' height='210px' />
          </Box>
        </Box>
      </Box>
      <Column maxWidth={['90%', '90%', '828px']} position='relative'>
        <Condition match={state.currentSeries}>
          <Transition
            cursor='pointer'
            boxSizing='border-box'
            position='absolute'
            border={hover ? 'solidBlack' : 'gray'}
            svgTransform={hover ? 'rotate(90deg)' : 'rotate(0deg)'}
            alignItems='center'
            justifyContent='center'
            width='40px'
            height='40px'
            top={[15, 15, 30]}
            right={0}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => {
              cookieStorage.removeItem('currentSeries')
              cookieStorage.removeItem('currentCarcase')
              cookieStorage.removeItem('currentModel')
              if (query.additionalFilter) {
                filterParser.resetAdditionalFilter()
              }
              setState({
                ...state,
                currentSeries: '',
                currentCarcase: '',
                currentModel: '',
              })
              setCarcases([])
              setModels([])
            }}
          >
            <CloseIcon width='12px' height='12px' color='#000' />
          </Transition>
        </Condition>
        <Layout flexBasis='32px' />
        <Layout maxWidth='85%'>
          <Text textTransform='uppercase' fontSize='semiLarge' fontWeight='small'>
            {intl.formatMessage(messages.findAccessories)}
          </Text>
        </Layout>
        <Layout flexBasis='24px' />
        <Box width='100%' flexDirection={['column', 'column', 'row']}>
          <Layout
            alignSelf={['center', 'center', 'flex-start']}
            position='relative'
            width={['100%', '100%', '266px']}
            alignItems='center'
          >
            <BMWBlockSelect
              items={series}
              value={state.currentSeries || intl.formatMessage(messages.series)}
              onClick={item => {
                if (item !== state.currentSeries) {
                  if (query.additionalFilter) {
                    filterParser.resetAdditionalFilter()
                  }
                  cookieStorage.setItem('currentSeries', item)
                  cookieStorage.setItem('currentCarcase', '')
                  cookieStorage.setItem('currentModel', '')
                  setState({
                    ...state,
                    currentSeries: item,
                    currentCarcase: '',
                    currentModel: '',
                  })
                  setCarcases([])
                  setModels([])
                }
              }}
            />
          </Layout>
          <Layout flexShrink={0} flexBasis='16px' />
          <Layout
            position='relative'
            width={['100%', '100%', '266px']}
            alignSelf={['center', 'center', 'flex-start']}
          >
            <BMWBlockSelect
              items={carcases}
              value={state.currentCarcase || intl.formatMessage(messages.carcase)}
              onClick={item => {
                if (item !== state.currentCarcase) {
                  cookieStorage.setItem('currentModel', '')
                  cookieStorage.setItem('currentCarcase', item)
                  setState({
                    ...state,
                    currentCarcase: item,
                    currentModel: '',
                  })
                  setModels([])
                }
              }}
            />
          </Layout>
          <Layout flexShrink={0} flexBasis='16px' />
          <Layout
            position='relative'
            width={['100%', '100%', '266px']}
            alignSelf={['center', 'center', 'flex-start']}
          >
            <BMWBlockSelect
              items={models}
              value={state.currentModel || intl.formatMessage(messages.model)}
              onClick={item => {
                if (item !== state.currentModel) {
                  cookieStorage.setItem('currentModel', item)
                  setState({
                    ...state,
                    currentModel: item,
                  })
                }
              }}
            />
          </Layout>
        </Box>
        <Layout flexBasis='30px' />
      </Column>
    </Box>
  )
}

export default CategoryBmwBlock
