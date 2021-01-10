import React, { FC, Fragment, useEffect, useRef, useState } from 'react'
import { Box, Column, Layout }                              from '@atlantis-lab/layout'
import { useApolloClient }                                  from '@apollo/react-hooks'

import { Modal }                                            from '@atlantis-lab/modal'
import { Cross }                                            from '@ui/cross'
import { TBody, TD, THead, TR, Table }                      from '@ui/table'
import { Text }                                             from '@ui/text'

import { useData }                                          from './useData'

interface Props {
  onClose?: () => void
  onPickCity?: () => void
  isMobile?: boolean
  opened?: boolean
}

const SizeModal: FC<Props> = ({ onClose, opened }) => {
  const modalRef = useRef(null)
  const [title, setTitle] = useState({ data: { text: '' } })
  const [tables, setTables] = useState([])
  const client = useApolloClient()

  useEffect(() => {
    const fetchData = async () => {
      const data = await useData(client)
      setTitle(data && data.content && data.content.blocks.filter(item => item.type === 'header'))
      setTables(data && data.content && data.content.blocks.filter(item => item.type === 'table'))
    }
    fetchData()
  }, [])

  /* eslint-disable */
  return (
    <Modal visible={opened} onClose={onClose} alignItems={['flex-start', 'flex-start', 'center']}>
      <Box
        position='relative'
        justifyContent='center'
        width='100%'
        backgroundColor='white'
        maxWidth={['100%', '100%', '1116px']}
        minHeight={['100%', '100%', 'auto']}
        ref={modalRef}
      >
        <Box position='absolute' top={[20, 20, 32]} right={[16, 16, 32]} onClick={onClose}>
          <Cross />
        </Box>
        <Column maxWidth={['auto', 'auto', '996px']} width='100%' display={['none', 'none', 'flex']}>
          <Layout flexBasis='60px' />
          <Text fontSize='large' fontWeight='tiny' lineHeight='normal' textTransform='uppercase'>
            {title && title[0] && title[0].data && title[0].data.text}
          </Text>
          <Layout flexBasis='32px' />
          {tables.map((table, index) => (
            <Fragment key={`table-${index}`}>
              <Text fontWeight='semiBold' fontSize='xmedium'>
                {title && title[index + 1] && title[index + 1].data && title[index + 1].data.text}
              </Text>
              <Layout flexBasis='24px' />
              <Table>
                <THead>
                  <TR contentCenter secondColumnGray firstColumnCenter>
                    {table &&
                      table.data &&
                      table.data.content.slice(0, 1)[0].map((text, index) => (
                        <TD key={text + index} textAlign='center'>
                          <Text fontSize='semiMedium' color='inherit' fontWeight='normal'>
                            {text}
                          </Text>
                        </TD>
                      ))}
                  </TR>
                </THead>
                <TBody>
                  {table &&
                    table.data &&
                    table.data.content.slice(1).map((tableBody, index) => (
                      <TR key={`index-${index}`} contentCenter secondColumnGray firstColumnCenter>
                        {tableBody &&
                          tableBody.map((bodyText, index) => (
                            <TD key={`tableIndex-${index}`}>
                              <Text lineHeight='small' color='inherit'>{bodyText}</Text>
                            </TD>
                          ))}
                      </TR>
                    ))}
                </TBody>
              </Table>
              <Layout flexBasis='48px' />
            </Fragment>
          ))}
          <Layout flexBasis='12px' />
        </Column>
        <Column maxWidth={['90%', '90%', '996px']} display={['flex', 'flex', 'none']}>
          <Layout flexBasis={['16px', '16px', '60px']} />
          <Box
            width='100%'
            maxWidth='80%'
          >
            <Text fontSize={['semiLarge', 'semiLarge', 'large']} fontWeight='tiny' lineHeight='normal' textTransform='uppercase'>
              {title && title[0] && title[0].data && title[0].data.text}
            </Text>
          </Box>
          <Layout flexBasis={['20px', '20px', '32px']} />
          {tables.map((table, index) => (
            <Fragment key={`table-${index}`}>
              <Text fontWeight='semiBold' fontSize={['default', 'default', 'xmedium']}>
                {title && title[index + 1] && title[index + 1].data && title[index + 1].data.text}
              </Text>
              <Layout flexBasis={['12px', '12px', '24px']} />
              <Table
                fixed
              >
                <THead>
                  <TR contentCenter secondColumnGray firstColumnCenter>
                    {table &&
                    table.data &&
                    table.data.content.slice(0, 1)[0].map((text, index) => (
                      <TD padding={['5px 0px', '5px 0px', '5px 0px']}  key={text + index} textAlign='center'>
                        <Text fontSize='semiMedium' color='inherit' fontWeight='normal'>
                          {text}
                        </Text>
                      </TD>
                    ))}
                  </TR>
                </THead>
                <TBody>
                  {table &&
                  table.data &&
                  table.data.content.slice(1).map((tableBody, index) => (
                    <TR key={`index-${index}`} contentCenter secondColumnGray firstColumnCenter>
                      {tableBody &&
                      tableBody.map((bodyText, index) => (
                        <TD padding={['5px 0px', '5px 0px', '5px 0px']} key={`tableIndex-${index}`}>
                          <Text lineHeight='small' color='inherit'>{bodyText}</Text>
                        </TD>
                      ))}
                    </TR>
                  ))}
                </TBody>
              </Table>
              <Layout flexBasis={['20px', '20px', '48px']} />
            </Fragment>
          ))}
          <Layout flexBasis='12px' />
        </Column>
      </Box>
    </Modal>
  )
  /* eslint-enable */
}

export default SizeModal
