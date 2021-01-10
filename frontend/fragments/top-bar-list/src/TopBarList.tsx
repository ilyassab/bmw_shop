import React, { FC, Fragment } from 'react'
import { Layout }              from '@atlantis-lab/layout'

import { Condition }           from '@ui/condition'
import { NextLink }            from '@ui/link'
import { useNavigationState }  from '@store/stores'

import { useData }             from './useData'

const TopBarList: FC = () => {
  const { menu } = useData()
  const { state } = useNavigationState()

  return (
    <>
      {menu.map((item, index) => (
        <Fragment key={item.name}>
          <NextLink
            href={item.url}
            color={state.transparent ? 'white' : 'dustyGray'}
            hoverColor='lightGray'
            clickedColor='lightGray'
            fontSize='small'
            lineHeight='normal'
          >
            {item.name}
          </NextLink>
          <Condition match={index !== menu.length - 1}>
            <Layout flexBasis='16px' />
          </Condition>
        </Fragment>
      ))}
    </>
  )
}

export default TopBarList
