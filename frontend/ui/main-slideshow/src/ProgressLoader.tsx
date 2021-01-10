import React   from 'react'
import styled  from '@emotion/styled'
import { Box } from '@atlantis-lab/layout'

const SVGButton = styled.svg({
  width: '60px',
  height: '60px',
  transform: 'rotate(270deg)',
})

const SVGCircleDynamic = styled.circle(({ strokeDashoffset }) => ({
  fill: 'none',
  stroke: 'white',
  transition: '0.2s',
  strokeWidth: '2px',
  strokeDasharray: '220',
  strokeDashoffset,
}))

export const ProgressLoader = ({ strokeDashoffset }) => {
  return (
    <Box>
      <SVGButton>
        <SVGCircleDynamic cx='30' cy='30' r='28.5' strokeDashoffset={strokeDashoffset} />
      </SVGButton>
    </Box>
  )
}
