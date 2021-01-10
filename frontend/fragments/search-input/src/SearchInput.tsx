import React, { FC, useEffect, useRef, useState } from 'react'
import { Layout, Row }                            from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl }      from 'react-intl'
import { useRouter }                              from 'next/router'

import { Condition }                              from '@ui/condition'
import { SearchIcon }                             from '@ui/icons'
import { IconsManager }                           from '@ui/icons-manager'
import { SearchInput as Input }                   from '@ui/input'
import { NextLink }                               from '@ui/link'
import { OutsideClick }                           from '@ui/outside-click'

import messages                                   from './messages'

interface Props {
  isMobile?: boolean
  transparent?: boolean
}

const SearchInput: FC<WrappedComponentProps & Props> = ({ intl, transparent, isMobile }) => {
  const [opened, setOpened] = useState(false)
  const [text, setText] = useState('')
  const inputRef = useRef(null)
  const nodeRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (opened) {
      inputRef.current.focus()
    }
  }, [opened])

  return (
    <>
      <Condition match={!isMobile}>
        <Row width='310px' alignItems='center' ref={nodeRef} onClick={() => setOpened(true)}>
          <OutsideClick onOutsideClick={() => setOpened(false)} targets={[nodeRef]}>
            <IconsManager color={transparent ? 'white' : ''}>
              <SearchIcon width='20px' height='20px' />
            </IconsManager>
            <Layout flexShrink={0} flexBasis='20px' />
            <Condition match={opened}>
              <Input
                placeholder={intl.formatMessage(messages.search)}
                ref={inputRef}
                onChange={e => {
                  setText(e.target.value)
                }}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    router.push(`/search?search=${text}`)
                  }
                }}
                backgroundColor='transparent'
                transparent={transparent}
                border='none'
                fontWeight='small'
                fontSize='medium'
                lineHeight='normal'
                color={transparent ? 'white' : 'semiBlack'}
              />
              <Layout flexShrink={0} flexBasis='20px' />
              <NextLink
                href={`/search?search=${text}`}
                color={transparent ? 'white' : 'blue'}
                textTransform='uppercase'
                fontSize='small'
                fontWeight='semiBold'
              >
                {intl.formatMessage(messages.find)}
              </NextLink>
            </Condition>
          </OutsideClick>
        </Row>
      </Condition>
      <Condition match={isMobile}>
        <Layout position='relative' width='100%'>
          <Input
            placeholder={intl.formatMessage(messages.find)}
            ref={inputRef}
            onChange={e => {
              setText(e.target.value)
            }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                router.push(`/search?search=${text}`)
              }
            }}
            border='none'
            padding='0 45px 0 20px'
            width='100%'
            height='40px'
            backgroundColor='inputGray'
            fontWeight='small'
            fontSize='medium'
            lineHeight='normal'
            color='semiBlack'
          />
          <Layout position='absolute' right={20} top={12}>
            <SearchIcon
              width='20px'
              height='20px'
              onClick={() => router.push(`/search?search=${text}`)}
            />
          </Layout>
        </Layout>
      </Condition>
    </>
  )
}

export default injectIntl(SearchInput)
