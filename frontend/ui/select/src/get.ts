import { GetCurrency, GetSelectValue } from './types'

export const value: GetSelectValue = (valueOfInput, options, valueField, displayField) => {
  if (typeof valueOfInput === 'string') {
    const [current] = options.filter(option => option[valueField] === valueOfInput)

    if (current && current[displayField]) {
      return current[displayField]
    }
  }

  if (valueOfInput && valueOfInput[displayField]) {
    return valueOfInput[displayField]
  }

  return ''
}

export const currency: GetCurrency = (val, intl) =>
  intl.formatNumber(val, {
    style: 'currency',
    currency: 'RUB',
    maximumSignificantDigits: 10,
  })
