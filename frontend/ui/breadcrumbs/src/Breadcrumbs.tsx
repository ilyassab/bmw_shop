import React, { FC }                                            from 'react'
import { Layout, Row }                                          from '@atlantis-lab/layout'
import { MessageDescriptor, WrappedComponentProps, injectIntl } from 'react-intl'

import { Condition }                                            from '@ui/condition'
import { IconsManager }                                         from '@ui/icons-manager'
import { NextLink }                                             from '@ui/link'
import { Space, Text }                                          from '@ui/text'

import messages                                                 from './messages'

interface Props {
  secondText?: MessageDescriptor | string
  secondHref?: string
  secondAs?: string
  fourthText?: string
  fifthText?: string
  thirdText?: string | string[]
  onThirdClick?: () => void
  onFourthClick?: () => void
}

const Breadcrumbs: FC<Props & WrappedComponentProps> = ({
  secondText,
  secondHref,
  secondAs,
  thirdText = '',
  onThirdClick,
  fourthText = '',
  onFourthClick,
  fifthText = '',
  intl,
}) => (
  <Row>
    <NextLink
      as='/'
      href='/'
      color='blue'
      hoverColor='crumbsGray'
      clickedColor='crumbsGray'
      fontSize='semiMedium'
      fontWeight='300'
    >
      {intl.formatMessage(messages.main)}
    </NextLink>
    <Condition match={!!secondText}>
      <Text color='crumbsGray' fontSize='semiMedium' fontWeight='300'>
        <Space count={2} />
        /
        <Space count={2} />
      </Text>
      <NextLink
        href={secondHref}
        as={secondAs}
        color={thirdText ? 'blue' : 'crumbsGray'}
        hoverColor='crumbsGray'
        clickedColor='crumbsGray'
        fontSize='semiMedium'
        fontWeight='300'
        dangerouslySetInnerHTML={{
          __html: typeof secondText === 'string' ? secondText : intl.formatMessage(secondText),
        }}
      />
    </Condition>
    <Condition match={!!thirdText}>
      <Text color='crumbsGray' fontSize='semiMedium' fontWeight='300'>
        <Space count={2} />
        /
        <Space count={2} />
      </Text>
      <Layout maxWidth='362px'>
        <IconsManager
          color={onThirdClick ? 'blue' : 'crumbsGray'}
          hoverColor='crumbsGray'
          clickedColor='crumbsGray'
        >
          <Text
            onClick={onThirdClick}
            fontSize='semiMedium'
            fontWeight='300'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
            dangerouslySetInnerHTML={{ __html: thirdText }}
          />
        </IconsManager>
      </Layout>
    </Condition>
    <Condition match={!!fourthText}>
      <Text color='crumbsGray' fontSize='semiMedium' fontWeight='300'>
        <Space count={2} />
        /
        <Space count={2} />
      </Text>
      <Layout maxWidth='362px'>
        <IconsManager
          color={onFourthClick ? 'blue' : 'crumbsGray'}
          hoverColor='crumbsGray'
          clickedColor='crumbsGray'
        >
          <Text
            onClick={onFourthClick}
            color='crumbsGray'
            fontSize='semiMedium'
            fontWeight='300'
            whiteSpace='nowrap'
            textOverflow='ellipsis'
            overflow='hidden'
            dangerouslySetInnerHTML={{ __html: fourthText }}
          />
        </IconsManager>
      </Layout>
    </Condition>
    <Condition match={!!fifthText}>
      <Text color='crumbsGray' fontSize='semiMedium' fontWeight='300'>
        <Space count={2} />
        /
        <Space count={2} />
      </Text>
      <Layout maxWidth='600px'>
        <Text
          color='crumbsGray'
          fontSize='semiMedium'
          fontWeight='300'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          overflow='hidden'
          dangerouslySetInnerHTML={{ __html: fifthText }}
        />
      </Layout>
    </Condition>
  </Row>
)

export default injectIntl(Breadcrumbs)
