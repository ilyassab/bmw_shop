import React, { FC }      from 'react'
import { Box, Layout }    from '@atlantis-lab/layout'
import { useIntl }        from 'react-intl'

import { ShowMoreButton } from '@ui/button'
import { Condition }      from '@ui/condition'
import { CrossIcon }      from '@ui/icons'
import { Loader }         from '@ui/loader'
import { Text }           from '@ui/text'
import { declOfNum }      from '@utils/decl-of-num'

import messages           from './messages'

interface Props {
  loading?: boolean
  perPage?: number
  page?: number
  totalShown?: number
  total?: number
  setFetchMore?: (arg0?: number) => void
}

export const FetchMoreBlock: FC<Props> = ({
  loading,
  perPage,
  page,
  total,
  totalShown,
  setFetchMore,
}) => {
  const intl = useIntl()

  const showPages = total - totalShown >= perPage ? perPage : total - totalShown

  return (
    <>
      <Condition match={totalShown < total && !loading}>
        <Text
          color='semiBlack'
          cursor='pointer'
          fontSize='semiMedium'
          fontWeight='semiBold'
          onClick={() => setFetchMore(page + 1)}
        >
          <ShowMoreButton height='56px' justifyContent='center' alignItems='center' width='100%'>
            <CrossIcon />
            {intl.formatMessage(messages.showMore)}
            {showPages}
            {declOfNum(showPages, [
              intl.formatMessage(messages.oneItem),
              intl.formatMessage(messages.twoItem),
              intl.formatMessage(messages.fiveItem),
            ])}
          </ShowMoreButton>
        </Text>
      </Condition>
      <Condition match={loading}>
        <Box height='56px' width='100%' justifyContent='center' alignItems='center'>
          <Loader />
        </Box>
      </Condition>
      <Layout flexBasis={['24px', '32px', '70px']} />
    </>
  )
}
