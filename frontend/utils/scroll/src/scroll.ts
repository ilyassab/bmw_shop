import { useEffect, useState } from 'react'

export const useScroll = borderline => {
  if (process.browser) {
    const [scrollTop, setScrollTop] = useState(0)
    useEffect(() => {
      function updateScroll() {
        let top = 0
        return () => {
          if (top > borderline && window.pageYOffset <= borderline) {
            setScrollTop(window.pageYOffset)
          } else if (top <= borderline && window.pageYOffset > borderline) {
            setScrollTop(window.pageYOffset)
          }
          top = window.pageYOffset
        }
      }
      window.document.addEventListener('scroll', updateScroll())
      return () => window.document.removeEventListener('scroll', updateScroll())
    }, [])
    return scrollTop
  }
  return 0
}
