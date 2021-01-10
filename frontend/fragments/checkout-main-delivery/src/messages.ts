import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  personalInformation: {
    id: `${scope}.personalInformation`,
    defaultMessage: 'Личная информация',
  },
  contacts: {
    id: `${scope}.contacts`,
    defaultMessage: 'Контактные данные.',
  },
  firstStep: {
    id: `${scope}.firstStep`,
    defaultMessage:
      'На первом шаге оформления заказа (переписать) перехода на следующие шаги корзины, что поможет сэкономить Ваше время при оформлении заказа.',
  },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'Email',
  },
  firstName: {
    id: `${scope}.firstName`,
    defaultMessage: 'Имя',
  },
  secondName: {
    id: `${scope}.secondName`,
    defaultMessage: 'Фамилия',
  },
  telephone: {
    id: `${scope}.telephone`,
    defaultMessage: 'Телефон',
  },
  address: {
    id: `${scope}.address`,
    defaultMessage: 'адрес доставки.',
  },
  delivery: {
    id: `${scope}.delivery`,
    defaultMessage:
      'Про доставку курьером на дом и все такое, сроки бла бла бла. На первом шаге оформления заказа (переписать) перехода.',
  },
  city: {
    id: `${scope}.city`,
    defaultMessage: 'Город',
  },
  street: {
    id: `${scope}.street`,
    defaultMessage: 'Улица',
  },
  house: {
    id: `${scope}.house`,
    defaultMessage: 'Дом',
  },
  room: {
    id: `${scope}.room`,
    defaultMessage: 'Квартира',
  },
  save: {
    id: `${scope}.save`,
    defaultMessage: 'Сохранить изменения',
  },
  courier: {
    id: `${scope}.courier`,
    defaultMessage: 'Курьером на дом',
  },
  dealer: {
    id: `${scope}.dealer`,
    defaultMessage: 'В дилерский центр',
  },
  pickPoint: {
    id: `${scope}.pickPoint`,
    defaultMessage: 'В пункт выдачи',
  },
  textArea: {
    id: `${scope}.textArea`,
    defaultMessage: 'Дополнительная информация для доставки (не обязательно)',
  },
})
