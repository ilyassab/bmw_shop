import React, { FC, Fragment, useEffect, useState } from 'react'
import { Column, Layout, Row }                      from '@atlantis-lab/layout'
import { Collapse }                                 from 'react-collapse'

import { Condition }                                from '@ui/condition'
import { MinusIcon, PlusIcon }                      from '@ui/icons'
import { Checkbox }                                 from '@ui/input'
import { Text }                                     from '@ui/text'
import { filterParser }                             from '@utils/filter-parser'

interface Props {
  item?: any
}

// TODO wrap фильтров

const FilterItem: FC<Props> = ({ item }) => {
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (item && item.items) {
      setOpened(item.items.filter(filterItem => filterItem.selected === true).length > 0)
    }
  }, [item])

  return (
    <Collapse isOpened>
      <Column>
        <Text cursor='pointer'>
          <Column onClick={() => setOpened(!opened)}>
            <Layout flexBasis='20px' />
            <Row alignItems='center'>
              <Text color='dustyGray' fontSize='semiMedium' fontWeight='normal'>
                {item.title}
              </Text>
              <Layout flexGrow={1} />
              <Condition match={!opened}>
                <PlusIcon width='14px' height='14px' />
              </Condition>
              <Condition match={opened}>
                <MinusIcon width='14px' height='2px' />
              </Condition>
            </Row>
            <Layout flexBasis='20px' />
          </Column>
        </Text>
        <Row flexWrap='wrap' display={opened ? 'flex' : 'none'}>
          {item.items &&
            item.items.map(filter => (
              <Fragment key={filter.cONTROLID}>
                <Column
                  overflow='hidden'
                  maxWidth={item.title.search('Тип зимней шины|Коллекция') !== -1 ? '100%' : '45%'}
                >
                  <Checkbox
                    checked={filter.selected}
                    onChange={checked => {
                      if (checked) {
                        filterParser.addFilter(item.key, filter.value)
                      } else {
                        filterParser.removeFilter(item.key, filter.value)
                      }
                    }}
                  >
                    <Layout flexBasis='12px' />
                    <Text
                      textOverflow='ellipsis'
                      overflow='hidden'
                      whiteSpace='nowrap'
                      color='motionGray'
                      fontSize='semiMedium'
                      fontWeight='normal'
                    >
                      {filter.value}
                    </Text>
                  </Checkbox>
                  <Layout flexBasis='20px' />
                </Column>
                <Layout flexBasis='5%' />
              </Fragment>
            ))}
        </Row>
      </Column>
    </Collapse>
  )
}

export default FilterItem
