import React, { FC }                            from 'react'
import { IconsManager as AtlantisIconsManager } from '@atlantis-lab/icons-manager'

import { Transition }                           from '@ui/transition'
import { theme }                                from '@ui/theme'

interface Props {
  color?: string
  hoverColor?: string
  clickedColor?: string
  children?: any
}

export const IconsManager: FC<Props> = ({ children, hoverColor, clickedColor, color }) => {
  return (
    <Transition>
      <AtlantisIconsManager hoverColor={hoverColor} clickedColor={clickedColor} color={color}>
        {children}
      </AtlantisIconsManager>
    </Transition>
  )
}

IconsManager.defaultProps = {
  hoverColor: theme.colors.blue,
  clickedColor: theme.colors.darkBlue,
}
