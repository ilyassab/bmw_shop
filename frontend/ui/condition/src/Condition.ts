import { Fragment, ReactNode, createElement } from 'react'

interface ConditionProps {
  match?: boolean | number | string
  children?: ReactNode
}

const Condition = ({ children, match }: ConditionProps) => {
  if (match) {
    return createElement(Fragment, {}, children)
  }

  return null
}

export default Condition
