import React, { FC, useState } from 'react'
import { Column, Layout, Row } from '@atlantis-lab/layout'
import { useIntl }             from 'react-intl'

import { FiltersModal }        from '@fragments/filters-modal'
import { Button }              from '@ui/button'
import { FilterIcon }          from '@ui/icons'
import { Text }                from '@ui/text'

import messages                from './messages'

interface Props {
  isTablet?: boolean
  isMobile?: boolean
  block?: string
}

const Mobile: FC<Props> = ({ block }) => {
  const [opened, setOpened] = useState(false)
  const intl = useIntl()

  return (
    <Column>
      <Button
        onClick={() => setOpened(true)}
        height='44px'
        backgroundColor='slightlyGray'
        borderRadius='0px'
      >
        <Row alignItems='center'>
          <Layout flexBasis='16px' />
          <Text fontWeight='semiBold' fontSize={['semiMedium', 'semiMedium', 'semiMedium']}>
            {intl.formatMessage(messages.filter)}
          </Text>
          <Layout flexGrow={1} />
          <FilterIcon width='14px' height='10px' />
          <Layout flexBasis='16px' />
        </Row>
      </Button>
      <FiltersModal opened={opened} block={block} onClose={() => setOpened(false)} />
    </Column>
  )
}

export default Mobile
