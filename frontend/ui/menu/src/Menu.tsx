import styled  from '@emotion/styled'
import { Box } from '@atlantis-lab/layout'

export const MenuUI = styled(Box)(({ open }) => ({
  transition: open
    ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    : 'transform 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53), opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  transform: open ? 'translateY(0)' : 'translateY(-15px)',
  pointerEvents: open ? 'all' : 'none',
  opacity: open ? '1' : '0',
}))
