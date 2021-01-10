import React, { FC, Fragment } from 'react'
import { Box, Layout }         from '@atlantis-lab/layout'

import { Condition }           from '@ui/condition'
import { NextLink }            from '@ui/link'
import { unique }              from '@utils/unique'

interface Props {
  menuItem?: {
    slug?: string
    items?: Array<{
      slug?: string
      url?: string
      name?: string
      items?: Array<{
        name?: string
        style?: string
        url?: string
      }>
    }>
  }
}

const MegaMenuItem: FC<Props> = ({ menuItem }) => (
  <>
    <Box key={menuItem.slug} width='100%' flexDirection='column' maxWidth='160px' overflow='hidden'>
      <Layout flexBasis='48px' />
      {menuItem.items &&
        menuItem.items.map(category => (
          <Fragment key={unique()}>
            <NextLink
              href={category.url}
              fontSize='small'
              lineHeight='extra'
              fontWeight='semiBold'
              textTransform='uppercase'
              color='semiBlack'
            >
              {category.name}
            </NextLink>
            <Layout flexBasis='18px' />
            {category.items &&
              category.items.map(categoryItem => (
                <Fragment key={categoryItem.name}>
                  <Condition match={categoryItem.style === 'default'}>
                    <NextLink
                      href={categoryItem.url}
                      color='dustyGray'
                      hoverColor='semiBlack'
                      fontSize='semiMedium'
                      lineHeight='extra'
                    >
                      {categoryItem.name}
                    </NextLink>
                  </Condition>
                  <Condition match={categoryItem.style === 'link'}>
                    <Layout>
                      <NextLink
                        href='/catalog/wheels'
                        color='blue'
                        fontSize='semiMedium'
                        lineHeight='extra'
                        underline
                      >
                        {categoryItem.name}
                      </NextLink>
                    </Layout>
                  </Condition>
                  <Layout flexBasis='9px' />
                </Fragment>
              ))}
          </Fragment>
        ))}
    </Box>
    <Layout flexBasis='21px' />
  </>
)

export default MegaMenuItem
