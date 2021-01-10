import React, { FC, useEffect, useState } from 'react'
import { Box, Column, Layout }            from '@atlantis-lab/layout'

import { CategoryItem }                   from '@fragments/category-item'
import { TabSwitcher }                    from '@fragments/tab-switcher'
import { Condition }                      from '@ui/condition'
import { Loader }                         from '@ui/loader'
import { Text }                           from '@ui/text'
import { Transition }                     from '@ui/transition'

import { useData }                        from './useData'

interface Props {
  isMobile?: boolean
  catalogName?: string
  catalogTitle?: string
}

const Category: FC<Props> = ({ isMobile, catalogName, catalogTitle }) => {
  const [canRender, setCanRender] = useState(true)
  const [overflowHidden, setOverflowHidden] = useState(false)
  const { state, setState, loading } = useData(catalogName, catalogTitle)
  const itemsLength = state.items.length
  const heights = [
    Math.ceil(itemsLength) * 430 || 60,
    Math.ceil(itemsLength / 2) * 430 || 60,
    Math.ceil(itemsLength / 3) * 430 || 60,
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!catalogName) {
        setCanRender(true)
        setOverflowHidden(true)
        setTimeout(() => {
          setOverflowHidden(false)
        }, 300)
      }
    }, 450)
    return () => clearTimeout(timeout)
  }, [state.items])

  return (
    <Layout justifyContent='center' backgroundColor='white'>
      <Box maxWidth={['90%', '90%', '1200px']} width='100%' alignSelf='center' alignItems='center'>
        <Column>
          <Text
            color='semiBlack'
            fontSize={['semiLarge', 'large', 'xlarge']}
            fontWeight='tiny'
            lineHeight='normal'
            textTransform='uppercase'
          >
            {state.currentMenuName}.
          </Text>
          <Condition match={!catalogName}>
            <Layout flexBasis='24px' />
            <TabSwitcher
              onClick={(currentMenu, currentMenuName) => {
                setState({
                  ...state,
                  currentMenuName,
                  currentMenu,
                })
                setCanRender(false)
              }}
              isMobile={isMobile}
            />
          </Condition>
          <Layout flexBasis={['16px', '24px', '48px']} />
          <Transition
            flexWrap='wrap'
            height={!canRender || loading ? 60 : heights}
            boxSizing='border-box'
            alignItems='flex-start'
            width='100%'
            overflow={overflowHidden ? 'hidden' : 'visible'}
            transition='0.5s'
            maxHeight={!canRender || loading ? 60 : heights}
          >
            <Condition match={canRender}>
              {state.items.map(item => (
                <CategoryItem key={item.id} item={item} category={state.currentMenu} />
              ))}
            </Condition>
            <Condition match={loading || !canRender}>
              <Box height='60px' width='100%' justifyContent='center' alignItems='center'>
                <Loader />
              </Box>
            </Condition>
          </Transition>
        </Column>
      </Box>
    </Layout>
  )
}

export default Category
