import React, { FC, Fragment } from 'react'
import { Box, Layout }         from '@atlantis-lab/layout'

import { HowToItem }           from '@fragments/how-to-item'
import { Condition }           from '@ui/condition'
import { Loader }              from '@ui/loader'

import { useData }             from './useData'

const HowTo: FC = () => {
  const { state, loading } = useData()

  return (
    <Layout backgroundColor='semiGray' justifyContent='center'>
      <Box
        flexDirection={['column', 'column', 'row']}
        maxWidth={['288px', '688px', '1200px']}
        minHeight={['auto', 'auto', '532px']}
        alignItems={['none', 'none', 'center']}
        flexWrap='wrap'
        width='100%'
      >
        <Layout flexShrink={0} flexBasis={['24px', '24px', '0px']} />
        {state.items.map((item, index) => (
          <Fragment key={item.title}>
            <HowToItem link={item.link} text={item.text} title={item.title} url={item.url} />
            <Condition match={index !== state.items.length - 1}>
              <Layout flexShrink={0} flexBasis={['16px', '16px', '24px']} />
            </Condition>
          </Fragment>
        ))}
        <Layout flexShrink={0} flexBasis={['24px', '24px', '0px']} />
        <Condition match={loading}>
          <Box height='120px' width='100%' justifyContent='center' alignItems='center'>
            <Loader />
          </Box>
        </Condition>
      </Box>
    </Layout>
  )
}

export default HowTo
