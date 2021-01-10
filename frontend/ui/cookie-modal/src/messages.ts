import { defineMessages } from 'react-intl'

import { name as scope }  from '../package.json'

export default defineMessages({
  cookie: {
    id: `${scope}.cookie`,
    defaultMessage: 'Мы используем cookie',
  },
  cookieText: {
    id: `${scope}.cookie_text`,
    defaultMessage:
      'На сайте shop.bmw.ru используются cookie-файлы и другие аналогичные технологии. Если, прочитав это сообщение, вы останетесь на сайте, это означает, что вы не возражаете против использования этих технологий.',
  },
  moreAbout: {
    id: `${scope}.more_about`,
    defaultMessage: 'Подробнее о cookie-файлах',
  },
  continue: {
    id: `${scope}.continue`,
    defaultMessage: 'Породолжить',
  },
})
