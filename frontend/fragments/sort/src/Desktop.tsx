import React, { FC, useState }               from 'react'
import { Box, Layout }                       from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'
import { useRouter }                         from 'next/router'

import { Select }                            from '@ui/select'
import { Text }                              from '@ui/text'
import { filterParser }                      from '@utils/filter-parser'

import messages                              from './messages'

const Desktop: FC<WrappedComponentProps> = ({ intl }) => {
  const router = useRouter()

  const selectArray = [
    { id: '1', name: intl.formatMessage(messages.down), selectValue: 'DESC' },
    { id: '2', name: intl.formatMessage(messages.up), selectValue: 'ASC' },
    { id: '3', name: intl.formatMessage(messages.popular), selectValue: '' },
  ]
  const [selectValue, setSelectValue] = useState(
    selectArray.find(
      selectItem => selectItem.selectValue === (router && router.query && router.query.sort)
    ) || {
      id: '3',
      name: intl.formatMessage(messages.popular),
    }
  )

  return (
    <Box justifyContent='flex-end'>
      <Text whiteSpace='nowrap' lineHeight='medium' fontSize='semiMedium' color='motionGray'>
        {intl.formatMessage(messages.sortBy)}
      </Text>
      <Layout flexBasis='5px' />
      <Layout flexBasis='160px'>
        <Select
          options={selectArray}
          value={selectValue}
          fontSize='semiMedium'
          height='18px'
          padding='0 0 0 5px'
          valueField='id'
          displayField='name'
          onSelect={data => {
            setSelectValue(data)
            filterParser.addSort(data.selectValue)
          }}
        />
      </Layout>
    </Box>
  )
}

export default injectIntl(Desktop)
