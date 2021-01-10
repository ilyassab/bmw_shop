import React, { FC }          from 'react'

import { Link }               from '@ui/link'
import { useNavigationState } from '@store/stores'

import { useData }            from './useData'

const TopBarPhone: FC = () => {
  const { phone } = useData()
  const { state } = useNavigationState()

  return (
    <>
      <Link
        href={`tel:${phone}`}
        fontSize='small'
        lineHeight='normal'
        fontWeight='bold'
        clickedColor='telGray'
        whiteSpace='nowrap'
        hoverColor='telGray'
        underline
        underlineColor='underlineGray'
        color={state.transparent ? 'white' : 'semiBlack'}
      >
        {phone}
      </Link>
    </>
  )
}

export default TopBarPhone
