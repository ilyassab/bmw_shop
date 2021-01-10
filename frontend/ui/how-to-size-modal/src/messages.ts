import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  howTo: {
    id: `${scope}.howTo`,
    defaultMessage: 'Как узнать свой размер',
  },
  measure: {
    id: `${scope}.measure`,
    defaultMessage: 'Измерьте и запомните свои параметры и найдите свой размер',
  },
  tableSize: {
    id: `${scope}.tableSize`,
    defaultMessage: 'в таблице размеров.',
  },
  chest: {
    id: `${scope}.chest`,
    defaultMessage: 'Обхват груди',
  },
  closeTo: {
    id: `${scope}.chest`,
    defaultMessage:
      'Лента должна плотно прилегать к телу, спереди проходить по наиболее выступающим точкам, сбоку через подмышечные впадины, сзади обхватывая лопатки.',
  },
  waist: {
    id: `${scope}.waist`,
    defaultMessage: 'Обхват талии',
  },
  strictMeasure: {
    id: `${scope}.strictMeasure`,
    defaultMessage:
      'Измеряется строго горизонтально по самой узкой части тела, проходя через самую выступающую точку живота.',
  },
  hips: {
    id: `${scope}.hips`,
    defaultMessage: 'Обхват бедер',
  },
  horizontally: {
    id: `${scope}.horizontally`,
    defaultMessage:
      'Лента должна находиться горизонтально, проходя посредине бедра и сзади по наиболее выступающим точкам ягодиц.',
  },
})
