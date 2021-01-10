import React, { FC }                         from 'react'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { Space }                             from '@ui/text'
import { declOfNum }                         from '@utils/decl-of-num'

import messages                              from './messages'

interface ViewsProps {
  views?: number
  date?: string
  fixedDate?: boolean
}

const PostInfo: FC<ViewsProps & WrappedComponentProps> = ({ views, date, fixedDate, intl }) => {
  return (
    <>
      {fixedDate ? date : intl.formatDate(date)}
      <Space count={2} />
      {'\u2022'}
      <Space count={2} />
      {views}
      <Space />
      {declOfNum(views, [
        intl.formatMessage(messages.oneView),
        intl.formatMessage(messages.twoViews),
        intl.formatMessage(messages.fiveViews),
      ])}
    </>
  )
}

export default injectIntl(PostInfo)
