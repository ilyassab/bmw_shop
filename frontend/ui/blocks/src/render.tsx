import { createElement } from 'react'

export const render = (blocks = [], renderers = {}) => {
  return blocks.map((block, index) => {
    const renderer = renderers[block.type]

    if (!renderer) {
      return null
    }

    return createElement(renderer, {
      ...block,
      key: `${block.name}-${index}`,
      render,
      renderers,
    })
  })
}
