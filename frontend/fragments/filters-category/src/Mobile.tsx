import React, { FC, Fragment }               from 'react'
import { Box, Column, Layout, Row }          from '@atlantis-lab/layout'
import { WrappedComponentProps, injectIntl } from 'react-intl'

import { Modal }                             from '@atlantis-lab/modal'
import { ArrowLeftIcon, SearchIcon }         from '@ui/icons'
import { IconsManager }                      from '@ui/icons-manager'
import { Input }                             from '@ui/input'
import { Text }                              from '@ui/text'
import { filterParser }                      from '@utils/filter-parser'

import messages                              from './messages'

interface Props {
  onClickClose?: () => void
  onClose?: () => void
  opened?: boolean
  loading?: boolean
  id?: string
  items?: any
  query?: any
}

const FiltersCheckboxesModal: FC<Props & WrappedComponentProps> = ({
  onClose,
  onClickClose,
  opened,
  query,
  intl,
  items,
}) => {
  return (
    <Modal
      visible={opened}
      onClose={onClose}
      alignItems='flex-start'
      justifyContent={['flex-end', 'flex-end', 'center']}
    >
      <Box
        position='relative'
        justifyContent='center'
        width='100%'
        minHeight='100%'
        backgroundColor='white'
        maxWidth='90%'
      >
        <Column backgroundColor='white' width='100%'>
          <Box flexDirection='column' backgroundColor='white'>
            <Box flexDirection='column' boxShadow='gray' alignItems='center'>
              <Layout flexShrink={0} flexBasis='23px' />
              <Row alignItems='center'>
                <Layout flexBasis='5%' />
                <ArrowLeftIcon
                  color='rgb(38, 38, 38)'
                  width='9px'
                  height='20px'
                  onClick={onClose}
                />
                <Layout flexBasis='16px' onClick={onClose} />
                <Text
                  fontSize={['default', 'default', 'large']}
                  fontWeight={['semiBold', 'semiBold', 'tiny']}
                  textTransform='uppercase'
                  onClick={onClose}
                >
                  {intl.formatMessage(messages.categories)}
                </Text>
              </Row>
              <Layout flexShrink={0} flexBasis='23px' />
            </Box>
            <Layout flexShrink={0} flexBasis='24px' />
            <Layout position='relative' width='90%' alignSelf='center'>
              <Input
                placeholder={intl.formatMessage(messages.search)}
                border='none'
                padding='0 45px 0 20px'
                width='100%'
                height='60px'
                backgroundColor='inputGray'
                fontWeight='small'
                fontSize='medium'
                lineHeight='normal'
                color='semiBlack'
              />
              <Layout position='absolute' right={20} top={22}>
                <IconsManager>
                  <SearchIcon width='20px' height='20px' />
                </IconsManager>
              </Layout>
            </Layout>
            <Layout flexShrink={0} flexBasis='12px' />
            <Column>
              <Layout flexBasis='12px' />
              <Row alignItems='center'>
                <Layout flexBasis='5%' />
                <Row maxWidth='90%'>
                  <Text
                    color={!query.category ? 'blue' : 'semiBlack'}
                    textOverflow='ellipsis'
                    fontWeight='normal'
                    overflow='hidden'
                    whiteSpace='nowrap'
                    fontSize='semiMedium'
                    onClick={() => {
                      onClickClose()
                      filterParser.removeCategory()
                    }}
                  >
                    {intl.formatMessage(messages.all)}
                  </Text>
                </Row>
                <Layout flexBasis='5%' />
              </Row>
              <Layout flexBasis='12px' />
            </Column>
            {items &&
              items.map(item => (
                <Fragment key={item.slug}>
                  <Column>
                    <Layout flexBasis='12px' />
                    <Row alignItems='center'>
                      <Layout flexBasis='5%' />
                      <Row maxWidth='90%'>
                        <Text
                          color={decodeURI(query.category) === item.slug ? 'blue' : 'semiBlack'}
                          textOverflow='ellipsis'
                          fontWeight='normal'
                          overflow='hidden'
                          whiteSpace='nowrap'
                          fontSize='semiMedium'
                          onClick={() => {
                            onClickClose()
                            filterParser.addCategory(item.slug)
                          }}
                        >
                          {item.name}
                        </Text>
                      </Row>
                      <Layout flexBasis='5%' />
                    </Row>
                    <Layout flexBasis='12px' />
                  </Column>
                </Fragment>
              ))}
          </Box>
        </Column>
      </Box>
    </Modal>
  )
}

export default injectIntl(FiltersCheckboxesModal)
