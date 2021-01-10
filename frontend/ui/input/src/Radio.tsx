import React  from 'react'
import styled from '@emotion/styled'

const Container = styled.label(({ theme }: any) => ({
  display: 'flex',
  position: 'relative',
  paddingLeft: 23,
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover input ~ div': {
    backgroundColor: theme.colors.mountainmist,
  },
  '& input:checked ~ div': {
    backgroundColor: theme.colors.mountainmist,
  },
  '& input:checked ~ div:after': {
    display: 'block',
  },
}))

const Input = styled.input({
  position: 'absolute',
  opacity: 0,
  cursor: 'pointer',
  height: 0,
  width: 0,
})

const CheckMark = styled.div(({ theme }: any) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 24,
  height: 24,
  boxSizing: 'border-box',
  borderRadius: theme.radii.huge,
  backgroundColor: theme.colors.alto,
  '&:after': {
    content: '""',
    position: 'absolute',
    display: 'none',
    left: 6,
    top: 6,
    backgroundColor: 'rgba(38, 38, 38, 1)',
    width: 12,
    height: 12,
    boxSizing: 'border-box',
    borderRadius: theme.radii.huge,
  },
}))

export const Radio = ({ children, ...props }) => (
  <Container>
    {children}
    <Input
      type='checkbox'
      onChange={({ target }) => props.onChange && props.onChange(target.value)}
      {...props}
    />
    <CheckMark {...props} />
  </Container>
)
