import React, { FC, useState }               from 'react'
import { Box, Column, Layout, Row }          from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { SortModal }                         from '@fragments/sort-modal'
import { Button }                            from '@ui/button'
import { SelectDownArrowIcon }               from '@ui/icons'
import { Text }                              from '@ui/text'

import messages                              from './messages'

const Mobile: FC<WrappedComponentProps> = ({ intl }) => {
  const [opened, setOpened] = useState(false)

  return (
    <Column>
      <Button
        height='44px'
        backgroundColor='slightlyGray'
        borderRadius='0px'
        onClick={() => setOpened(true)}
      >
        <Row alignItems='center'>
          <Layout flexBasis='16px' />
          <Text fontWeight='semiBold' fontSize={['semiMedium', 'semiMedium', 'semiMedium']}>
            {intl.formatMessage(messages.sort)}
          </Text>
          <Layout flexGrow={1} />
          <Box mt='3px'>
            <SelectDownArrowIcon width='10px' height='6px' />
          </Box>
          <Layout flexBasis='16px' />
        </Row>
      </Button>
      <SortModal opened={opened} onClose={() => setOpened(false)} />
    </Column>
  )
}

export default injectIntl(Mobile)
