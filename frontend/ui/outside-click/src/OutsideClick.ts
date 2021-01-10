import onClickOutside from 'react-onclickoutside'
import { ReactNode }  from 'react'

interface Props {
  children: ReactNode
  targets: any
  onOutsideClick: (event: MouseEvent) => void
}

const OutsideClick: any = ({ children, targets, onOutsideClick }: Props): ReactNode => {
  OutsideClick.handleClickOutside = event => {
    let isOutsideClick = true
    targets.map(target => {
      if (target && target.current && target.current.contains(event.target)) {
        isOutsideClick = false
      }
      return target
    })
    if (onOutsideClick && isOutsideClick) {
      onOutsideClick(event)
    }
    return null
  }

  return children
}

const clickOutsideConfig = {
  handleClickOutside: () => OutsideClick.handleClickOutside,
}

OutsideClick.prototype = {}

export default onClickOutside<any, Props>(OutsideClick, clickOutsideConfig)
