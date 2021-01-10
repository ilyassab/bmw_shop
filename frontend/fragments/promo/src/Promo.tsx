import React, { FC }           from 'react'
import { Box, Column, Layout } from '@atlantis-lab/layout'

import { PromoItem }           from '@fragments/promo-item'
import { Condition }           from '@ui/condition'
import { Loader }              from '@ui/loader'

import { useData }             from './useData'

interface Props {
  iblock?: string
}

const Promo: FC<Props> = ({ iblock }) => {
  const { promoItemsBlock } = useData(iblock)

  if (!promoItemsBlock || promoItemsBlock.length === 0) {
    return (
      <Box height='400px' justifyContent='center' alignItems='center'>
        <Loader />
      </Box>
    )
  }

  return (
    <Layout justifyContent='center' backgroundColor='white'>
      <Box
        maxWidth='1200px'
        flexBasis={['320px', '676px', '1200px']}
        flexGrow={1}
        width='100%'
        alignSelf='center'
        alignItems='center'
      >
        <Column>
          <Box flexDirection={['column', 'column', 'row']}>
            <PromoItem item={promoItemsBlock[0]} />
            <Condition match={!!promoItemsBlock[3]}>
              <Layout flexBasis={['0', '0', '20px']} flexShrink={0} />
              <PromoItem item={promoItemsBlock[3]} />
            </Condition>
          </Box>
          <Layout flexBasis={['0', '0', '20px']} />
          <Box flexDirection={['column', 'column', 'row']}>
            <PromoItem item={promoItemsBlock[1]} />
            <Condition match={!!promoItemsBlock[2]}>
              <Layout flexBasis={['0', '0', '20px']} flexShrink={0} />
              <PromoItem item={promoItemsBlock[2]} />
            </Condition>
          </Box>
        </Column>
      </Box>
    </Layout>
  )
}

export default Promo
