let lastId = 0

export const unique = (prefix = 'id') => {
  const newId = `${prefix}${(lastId += 1)}`
  return newId
}
