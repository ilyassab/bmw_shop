import React, { FC, useEffect, useRef, useState } from 'react'

import { Slider }                                 from '@ui/slider'

interface Props {
  min?: number
  max?: number
  opened?: boolean
  currentMin?: number
  currentMax?: number
  onChange?: (arg0?: number, arg1?: number) => void
}

export const PriceSlider: FC<Props> = ({ min, max, opened, currentMin, currentMax, onChange }) => {
  const [rightPosition, setRightPosition] = useState(0)
  const [leftPosition, setLeftPosition] = useState(0)
  const [leftClicked, setLeftClicked] = useState(false)
  const [rightClicked, setRightClicked] = useState(false)
  const [changed, setChanged] = useState(true)
  const [firstChanging, setFirstChanging] = useState(false)
  const [mouseUpEnded, setMouseUpEnded] = useState(true)
  const rowRef = useRef(null)
  const leftButton = useRef(null)
  const rightButton = useRef(null)
  const rangeRef = useRef(null)

  const minNumber = Number(min)
  const maxNumber = Number(max)
  const pricePerPercent = (maxNumber - minNumber) / 100
  const minValue = minNumber + Math.floor(pricePerPercent * leftPosition)
  const maxValue = maxNumber - Math.floor(pricePerPercent * rightPosition)

  useEffect(() => {
    if (mouseUpEnded && changed && firstChanging) {
      onChange(minValue, maxValue)
    }
  }, [changed, mouseUpEnded])
  /* eslint-disable */
  const throttle = (func, ms) => {
    let isThrottled = false
    let savedArgs
    let savedThis

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments
        savedThis = this
        return
      }

      func.apply(this, arguments)

      isThrottled = true

      setTimeout(function() {
        isThrottled = false
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs)
          savedArgs = savedThis = null
        }
      }, ms)
    }

    return wrapper
  }

  useEffect(() => {
    if (min && max) {
      if (currentMin) {
        const togglerLeftPosition = Math.floor((currentMin - min) / (max - min) * 100)
        setLeftPosition(togglerLeftPosition > 100 ? 100 : togglerLeftPosition < 0 ? 0 : togglerLeftPosition)
      } else {
        setLeftPosition(0)
      }
      if (currentMax) {
        const togglerRightPosition = 100 - Math.floor((currentMax - min) / (max - min) * 100)
        setRightPosition(togglerRightPosition > 100 ? 100 : togglerRightPosition < 0 ? 0 : togglerRightPosition)
      } else {
        setRightPosition(0)
      }
    }
  }, [min, max])

  useEffect(() => {
    if (!currentMin) {
      setLeftPosition(0)
    }
    if (!currentMax) {
      setRightPosition(0)
    }
  }, [currentMin, currentMax])

  useEffect(() => {
    if (leftButton.current && rangeRef.current && rightButton.current && rowRef.current) {
      if (rightPosition === 0 && leftPosition === 0) {
        leftButton.current.style.left = '0px'
        rangeRef.current.style.left = '8px'
        rightButton.current.style.right = '0px'
        rangeRef.current.style.right = '8px'
      } else {
        const rowStyle = rowRef.current.getBoundingClientRect()
        leftButton.current.style.left = `${(leftPosition * (rowStyle.width - 16)) / 100}px`
        rangeRef.current.style.left = `${(leftPosition * (rowStyle.width - 16)) / 100 + 8}px`
        rightButton.current.style.right = `${(rightPosition * (rowStyle.width - 16)) / 100}px`
        rangeRef.current.style.right = `${(rightPosition * (rowStyle.width - 16)) / 100 + 8}px`
      }
    }
  }, [leftButton.current, rangeRef.current, rightButton.current, rowRef.current, opened, rightPosition, leftPosition])

  const mouseLeftMove = e => {
    setChanged(false)
    let cursorPosition = {
      clientX: 0
    }
    if (e.changedTouches) {
      cursorPosition = e.changedTouches && e.changedTouches[0]
    } else {
      cursorPosition = e
    }
    const rowStyle = rowRef.current.getBoundingClientRect()
    const relativeCoordinates = cursorPosition.clientX - rowStyle.x - 8
    let percentageLeft = Math.floor((relativeCoordinates / (rowStyle.width - 16)) * 100)
    percentageLeft = percentageLeft > 100 ? 100 : percentageLeft < 0 ? 0 : percentageLeft
    if (rightPosition + percentageLeft > 100) {
      percentageLeft = 100 - rightPosition
    }
    setLeftPosition(percentageLeft)
    leftButton.current.style.left = `${(percentageLeft * (rowStyle.width - 16)) / 100}px`
    rangeRef.current.style.left = `${(percentageLeft * (rowStyle.width - 16)) / 100 + 8}px`
    setChanged(true)
  }

  const mouseRightMove = e => {
    setChanged(false)
    let cursorPosition = {
      clientX: 0
    }
    if (e.changedTouches) {
      cursorPosition = e.changedTouches && e.changedTouches[0]
    } else {
      cursorPosition = e
    }
    const rowStyle = rowRef.current.getBoundingClientRect()
    const relativeCoordinates = cursorPosition.clientX - rowStyle.x - rowStyle.width + 8
    let percentageRight = Math.floor((relativeCoordinates / (rowStyle.width - 16)) * 100 * -1)
    percentageRight = percentageRight > 100 ? 100 : percentageRight < 0 ? 0 : percentageRight
    if (leftPosition + percentageRight > 100) {
      percentageRight = 100 - leftPosition
    }
    setRightPosition(percentageRight)
    rightButton.current.style.right = `${(percentageRight * (rowStyle.width - 16)) / 100}px`
    rangeRef.current.style.right = `${(percentageRight * (rowStyle.width - 16)) / 100 + 8}px`
    setChanged(true)
  }

  const throttledMouseLeftMove = throttle(mouseLeftMove, 150)
  const throttledRightMouseMove = throttle(mouseRightMove, 150)

  const mouseDown = direction => {
    setMouseUpEnded(false)
    setFirstChanging(true)
    if (direction === 'left') {
      setLeftClicked(true)
      document.addEventListener('mousemove', throttledMouseLeftMove)
      document.addEventListener('touchmove', throttledMouseLeftMove)
      document.addEventListener('mouseup', mouseUp)
      document.addEventListener('touchend', mouseUp)
    } else {
      setRightClicked(true)
      document.addEventListener('mousemove', throttledRightMouseMove)
      document.addEventListener('touchmove', throttledRightMouseMove)
      document.addEventListener('mouseup', mouseUp)
      document.addEventListener('touchend', mouseUp)
    }
  }

  const mouseUp = () => {
    setLeftClicked(false)
    setRightClicked(false)
    document.removeEventListener('mousemove', throttledMouseLeftMove)
    document.removeEventListener('touchmove', throttledMouseLeftMove)
    document.removeEventListener('mousemove', throttledRightMouseMove)
    document.removeEventListener('touchmove', throttledRightMouseMove)
    document.removeEventListener('mouseup', mouseUp)
    document.removeEventListener('touchend', mouseUp)
    setMouseUpEnded(true)
  }
  /* eslint-enable */
  return (
    <Slider
      minNumber={minNumber}
      minValue={minValue}
      maxNumber={maxNumber}
      maxValue={maxValue}
      rowRef={rowRef}
      leftClicked={leftClicked}
      mouseDown={mouseDown}
      leftButton={leftButton}
      rangeRef={rangeRef}
      rightClicked={rightClicked}
      rightButton={rightButton}
    />
  )
}
