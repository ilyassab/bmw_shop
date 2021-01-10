import React, { useEffect, useState } from 'react'
import { Column, Layout }             from '@atlantis-lab/layout'
import { useApolloClient }            from '@apollo/react-hooks'
import { useRouter }                  from 'next/router'

import { Blocks as Renderer }         from '@ui/blocks'

import { useData }                    from './useData'

interface Props {
  title?: string
  content?: {
    blocks?: any
  }
}

const Static = () => {
  const [data, setData] = useState<Props>({})
  const router = useRouter()
  const client = useApolloClient()

  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const responseData = await useData(client, router && router.query && router.query.slug)
        setData(responseData)
      } catch {
        setData({})
      }
    }
    fetchQuery()
  }, [])

  return (
    <Column flexGrow={1} justifyContent='center'>
      <Layout flexBasis={['34px', '34px', '64px']} />
      <Column maxWidth={['90%', '90%', '1200px']} alignSelf='center'>
        <Renderer blocks={data.content && data.content.blocks} />
      </Column>
      <Layout flexBasis={['40px', '40px', '96px']} />
    </Column>
  )
}

export default Static
