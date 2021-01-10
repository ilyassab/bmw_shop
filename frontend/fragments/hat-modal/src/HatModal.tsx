import React, { FC, useEffect, useRef, useState } from 'react'
import { Box, Column, Layout }                    from '@atlantis-lab/layout'
import { useApolloClient }                        from '@apollo/react-hooks'

import { Modal }                                  from '@atlantis-lab/modal'
import { Cross }                                  from '@ui/cross'
import { TBody, TD, THead, TR, Table }            from '@ui/table'
import { Text }                                   from '@ui/text'

import { useData }                                from './useData'

interface Props {
  onClose?: () => void
  onPickCity?: () => void
  isMobile?: boolean
  opened?: boolean
}

const HatModal: FC<Props> = ({ onClose, opened }) => {
  const modalRef = useRef(null)
  const [title, setTitle] = useState({ data: { text: '' } })
  const [currentTable, setCurrentTable] = useState({ data: { content: [] } })
  const [currentTableHead, setCurrentTableHead] = useState([])
  const [currentTableBody, setCurrentTableBody] = useState([])
  const client = useApolloClient()

  useEffect(() => {
    const fetchData = async () => {
      const data = await useData(client)
      const tableArr =
        data && data.content && data.content.blocks.filter(item => item.type === 'table')
      setTitle(data && data.content && data.content.blocks.find(item => item.type === 'header'))
      setCurrentTable(tableArr && tableArr[0])
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (currentTable && currentTable.data && currentTable.data.content) {
      setCurrentTableHead(currentTable.data.content && currentTable.data.content.slice(0, 1))
      setCurrentTableBody(currentTable.data.content && currentTable.data.content.slice(1))
    }
  }, [currentTable])

  /* eslint-disable */
  return (
    <Modal visible={opened} onClose={onClose} alignItems={['flex-start', 'flex-start', 'center']}>
      <Box
        position='relative'
        justifyContent='center'
        width='100%'
        minHeight={['100%', '100%', 'auto']}
        backgroundColor='white'
        maxWidth={['100%', '100%', '1116px']}
        ref={modalRef}
      >
        <Box position='absolute' top={[20, 32, 32]} right={[20, 32, 32]} onClick={onClose}>
          <Cross />
        </Box>
        <Column maxWidth={['90%', '90%', '996px']} width='100%'>
          <Layout flexBasis={['16px', '32px', '60px']} />
          <Text fontSize={['semiLarge', 'large', 'large']} fontWeight='tiny' lineHeight='normal' textTransform='uppercase'>
            {title && title.data && title.data.text}
          </Text>
          <Layout flexBasis='32px' />
          <Table>
            <THead>
              <TR contentCenter firstColumnCenter>
                {currentTableHead &&
                  currentTableHead[0] &&
                  currentTableHead[0].map((text, index) => (
                    <TD key={text + index} textAlign='center'>
                      <Text fontSize='semiMedium' color='inherit' fontWeight='normal'>
                        {text}
                      </Text>
                    </TD>
                  ))}
              </TR>
            </THead>
            <TBody>
              {currentTableBody &&
                currentTableBody.map((tableBody, index) => (
                  <TR key={`index-${index}`} contentCenter firstColumnCenter>
                    {tableBody &&
                      tableBody.map((bodyText, index) => (
                        <TD key={`tableIndex-${index}`}>
                          <Text color='inherit'>{bodyText}</Text>
                        </TD>
                      ))}
                  </TR>
                ))}
            </TBody>
          </Table>
          <Layout flexBasis={['16px', '32px', '60px']} />
        </Column>
      </Box>
    </Modal>
  )
  /* eslint-enable */
}

export default HatModal
