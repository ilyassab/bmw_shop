import React, { useEffect, useState }                         from 'react'
import { Box, Column, Layout }                                from '@atlantis-lab/layout'

import { AnchorBlocks as AnchorRenderer, Blocks as Renderer } from '@ui/blocks'
import { Text }                                               from '@ui/text'

import { mockedData }                                         from './mock'

interface FaqDataProps {
  title?: string
  content?: {
    blocks?: any
  }
}

const Faq = () => {
  const [faqData, setFaqData] = useState<FaqDataProps>({})

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const data = mockedData
        setFaqData(data)
      } catch {
        setFaqData({})
      }
    }
    fetchQuery()
  })

  return (
    <Layout flexGrow={1} justifyContent='center'>
      <Column maxWidth={['90%', '90%', '996px']} justifyContent='space-between'>
        <Layout flexBasis={['34px', '34px', '64px']} />
        <Box width='100%' flexDirection={['column', 'column', 'row']}>
          <Column
            display={['flex', 'flex', 'none']}
            width='100%'
            maxWidth={['100%', '100%', '690px']}
          >
            <Text fontSize='huge' fontWeight='tiny'>
              {faqData.title}
            </Text>
          </Column>
          <Layout display={['flex', 'flex', 'none']} flexBasis='24px' />
          <Box width='100%' maxWidth={['100%', '100%', '282px']} position='sticky'>
            <AnchorRenderer blocks={faqData.content && faqData.content.blocks} />
          </Box>
          <Layout flexBasis='24px' />
          <Column width='100%' maxWidth={['100%', '100%', '690px']}>
            <Layout display={['none', 'none', 'flex']}>
              <Text fontSize='huge' fontWeight='tiny'>
                {faqData.title}
              </Text>
            </Layout>
            <Layout flexBasis={['0', '0', '48px']} />
            <Renderer blocks={faqData.content && faqData.content.blocks} />
          </Column>
        </Box>
      </Column>
    </Layout>
  )
}

export default Faq
