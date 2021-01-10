import React           from 'react'
import { Column, Row } from '@atlantis-lab/layout'

import { Condition }   from '@ui/condition'
import { Space, Text } from '@ui/text'

export const List = ({ data }) => (
  <Column>
    <Condition match={data.style === 'UNORDERED'}>
      {data.items.map(item => (
        <Row pb='19px'>
          <Text
            key={item}
            fontSize='semiMedium'
            lineHeight='extra'
            fontWeight='semiBold'
            color='listGray'
            pt={['0px', '2px', '3px']}
          >
            {'\u2022'}
          </Text>
          <Space count={5} />
          <Text
            fontSize={['semiMedium', 'medium', 'default']}
            lineHeight='extra'
            fontWeight='small'
            color='semiBlack'
            dangerouslySetInnerHTML={{ __html: item }}
          />
        </Row>
      ))}
    </Condition>
    <Condition match={data.style === 'ORDERED'}>
      {data.items.map((item, index) => (
        <Row pb='19px'>
          <Text
            key={item}
            fontSize='semiMedium'
            lineHeight='extra'
            fontWeight='semiBold'
            color='listGray'
            pt={['0px', '2px', '3px']}
          >
            {index + 1}.
          </Text>
          <Space count={5} />
          <Text
            fontSize={['semiMedium', 'medium', 'default']}
            lineHeight='extra'
            fontWeight='small'
            color='semiBlack'
            dangerouslySetInnerHTML={{ __html: item }}
          />
        </Row>
      ))}
    </Condition>
  </Column>
)
