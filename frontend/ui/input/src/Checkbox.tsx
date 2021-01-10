import React, { FC }                    from 'react'
import { Checkbox as AtlantisCheckbox } from '@atlantis-lab/input'

export const Checkbox: FC<any> = ({ onChange, checked, children, ...props }) => (
  <AtlantisCheckbox
    onChange={() => {
      onChange(!checked)
    }}
    checked={checked}
    {...props}
  >
    {children}
  </AtlantisCheckbox>
)

Checkbox.defaultProps = {
  height: '24px',
  width: '24px',
  markBorderWidth: '3px',
  markWidth: '8px',
  markHeight: '13px',
  borderRadius: 'zero',
  markColor: 'semiBlack',
}
