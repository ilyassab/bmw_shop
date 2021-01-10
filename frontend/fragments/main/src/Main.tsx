import React              from 'react'
import { Column, Layout } from '@atlantis-lab/layout'

import { Catalog }        from '@fragments/catalog'
import { Category }       from '@fragments/category'
import { HowTo }          from '@fragments/how-to'
import { Promo }          from '@fragments/promo'
import { Slider }         from '@fragments/slider'
import { Slideshow }      from '@fragments/slideshow'

const Main = ({ isMobile, isTablet }) => (
  <>
    <Slideshow isMobile={isMobile} />
    <Layout height={['40px', '40px', '96px']} />
    <Column flexGrow={1} overflowX='hidden'>
      <Slider isMobile={isMobile} iblock='lifestyle' />
      <Layout height={['40px', '40px', '96px']} />
      <Promo iblock='indexBlock1' />
      <Layout height={['40px', '40px', '96px']} />
      <Slider isMobile={isMobile} iblock='accessories' />
      <Layout height={['40px', '40px', '96px']} />
      <Promo iblock='indexBlock2' />
      <Layout height={['40px', '40px', '96px']} />
      <Catalog isMobile={isMobile} isTablet={isTablet} />
      <Layout height={['40px', '40px', '96px']} />
      <Promo iblock='indexBlock3' />
      <Layout height={['40px', '40px', '96px']} />
      <Category isMobile={isMobile} />
      <Layout height={['40px', '40px', '96px']} />
      <HowTo />
    </Column>
  </>
)

export default Main
