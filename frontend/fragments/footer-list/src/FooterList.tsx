import React, { FC, Fragment, useEffect, useState } from 'react'
import { Column, Layout }                           from '@atlantis-lab/layout'
import { useApolloClient }                          from '@apollo/react-hooks'

import { Link }                                     from '@ui/link'
import { Text }                                     from '@ui/text'

import { useData }                                  from './useData'

const FooterList: FC = () => {
  const [state, setState] = useState([])
  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const data = await useData(client)
        setState(data)
      } catch {
        setState([])
      }
    }
    fetchQuery()
  }, [])

  return (
    <>
      {state.map(footerColumn => (
        <Fragment key={footerColumn.name}>
          <Column width='100%' maxWidth='180px'>
            <Layout flexBasis={['32px', '32px', '64px']} />
            <Text
              lineHeight='extra'
              fontWeight='semiBold'
              fontSize='small'
              textTransform='uppercase'
              color='white'
            >
              {footerColumn.name}
            </Text>
            <Layout flexBasis='24px' />
            {footerColumn.items.map(footerColumnItem => (
              <Fragment key={footerColumnItem.name}>
                <Link
                  href={footerColumnItem.url}
                  fontWeight='small'
                  fontSize='medium'
                  color='dustyGray'
                  hoverColor='slightlyGray'
                  clickedColor='crumbsGray'
                >
                  {footerColumnItem.name}
                </Link>
                <Layout flexBasis='16px' />
              </Fragment>
            ))}
          </Column>
          <Layout flexBasis='24px' />
        </Fragment>
      ))}
    </>
  )
}

export default FooterList
