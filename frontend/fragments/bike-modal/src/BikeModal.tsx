import React, { FC, Fragment, useEffect, useRef, useState } from 'react'
import { Box, Column, Layout, Row }                         from '@atlantis-lab/layout'
import { useApolloClient }                                  from '@apollo/react-hooks'

import { Modal }                                            from '@atlantis-lab/modal'
import { Background }                                       from '@ui/background'
import { Cross }                                            from '@ui/cross'
import { NavLink }                                          from '@ui/link'
import { NoScrollbar }                                      from '@ui/no-scrollbar'
import { Col, TBody, TD, THead, TR, Table }                 from '@ui/table'
import { Text }                                             from '@ui/text'

import { useData }                                          from './useData'

interface Props {
  onClose?: () => void
  onPickCity?: () => void
  isMobile?: boolean
  opened?: boolean
}

const BikeModal: FC<Props> = ({ onClose, opened }) => {
  const modalRef = useRef(null)
  const [title, setTitle] = useState({ data: { text: '' } })
  const [tabs, setTabs] = useState([{ data: { title: '' } }])
  const [tables, setTables] = useState([])
  const [image, setImage] = useState({ data: { file: { url: '' } } })
  const [currentTable, setCurrentTable] = useState({ data: { content: [] } })
  const [currentTableIndex, setCurrentTableIndex] = useState(0)
  const [currentTableHead, setCurrentTableHead] = useState([])
  const [currentTableBody, setCurrentTableBody] = useState([])
  const client = useApolloClient()

  useEffect(() => {
    const fetchData = async () => {
      const data = await useData(client)
      const tableArr =
        data && data.content && data.content.blocks.filter(item => item.type === 'table')
      setTitle(data && data.content && data.content.blocks.find(item => item.type === 'header'))
      setTabs(data && data.content && data.content.blocks.filter(item => item.type === 'anchor'))
      setImage(data && data.content && data.content.blocks.find(item => item.type === 'image'))
      setTables(tableArr)
      setCurrentTable(tableArr && tableArr[0])
      setCurrentTableIndex(0)
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
    <Modal visible={opened} onClose={onClose} alignItems='flex-start'>
      <Column
        alignItems='center'
      >
        <Box
          position='relative'
          justifyContent='center'
          width='100%'
          backgroundColor='white'
          maxWidth={['90%', '90%', '1116px']}
          display={['none', 'none', 'flex']}
          mt={80}
          mb={80}
          ref={modalRef}
        >
          <Box position='absolute' top={32} right={32} onClick={onClose}>
            <Cross />
          </Box>
          <Column maxWidth={['auto', '90%', '996px']} width='100%'>
            <Layout flexBasis='60px' />
            <Text fontSize='large' fontWeight='tiny' lineHeight='normal' textTransform='uppercase'>
              {title && title.data && title.data.text}
            </Text>
            <Layout flexBasis='39px' />
            <Layout width='100%' justifyContent='center'>
              <Background
                width='482px'
                height='285px'
                backgroundImage={`url(${image &&
                  image.data &&
                  image.data.file &&
                  image.data.file.url})`}
              />
            </Layout>
            <Layout flexBasis='79px' />
            <Row height='40px' alignItems='center' width='100%' overflow='auto'>
              {tabs.map((item, index) => (
                <Fragment key={item.data && item.data.title}>
                  <NavLink
                    color='semiBlack'
                    hoverColor='blue'
                    active={index === currentTableIndex}
                    onClick={() => {
                      setCurrentTable(tables[index])
                      setCurrentTableIndex(index)
                    }}
                  >
                    <Text color='inherit' fontSize='medium' lineHeight='extra'>
                      {item.data && item.data.title}
                    </Text>
                  </NavLink>
                  <Layout flexShrink={0} flexBasis='21px' />
                </Fragment>
              ))}
            </Row>
            <Layout flexBasis='32px' />
            <Table>
              <THead>
                <TR contentCenter>
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
                    <TR key={`index-${index}`} contentCenter>
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
            <Layout flexBasis='60px' />
          </Column>
        </Box>
        <Box
          position='relative'
          justifyContent='center'
          width='100%'
          minHeight='100vh'
          backgroundColor='white'
          maxWidth={['100%', '100%', '1116px']}
          display={['flex', 'flex', 'none']}
          mt={[0, 0, 80]}
          mb={[0, 0, 80]}
          ref={modalRef}
        >
          <Box position='absolute' top={[20, 20, 32]} right={[16, 16, 32]} onClick={onClose}>
            <Cross />
          </Box>
          <Column maxWidth={['90%', '90%', '996px']} width='100%'>
            <Layout flexBasis={['16px', '16px', '60px']} />
            <Text fontSize={['semiLarge', 'large', 'large']} fontWeight='tiny' lineHeight='normal' textTransform='uppercase'>
              {title && title.data && title.data.text}
            </Text>
            <Layout flexBasis='39px' />
            <Layout width='100%' justifyContent='center'>
              <Background
                width={['250px', '200px', '482px']}
                height={['200px', '200px', '285px']}
                backgroundImage={`url(${image &&
                image.data &&
                image.data.file &&
                image.data.file.url})`}
              />
            </Layout>
            <Layout flexBasis='79px' />
            <NoScrollbar height='40px' width='100%' overflowX='scroll'>
              {tabs.map((item, index) => (
                <Fragment key={item.data && item.data.title}>
                  <NavLink
                    color='semiBlack'
                    hoverColor='blue'
                    active={index === currentTableIndex}
                    mobile
                    onClick={() => {
                      setCurrentTable(tables[index])
                      setCurrentTableIndex(index)
                    }}
                  >
                    <Text color='inherit' fontSize='medium' lineHeight='extra'>
                      {item.data && item.data.title}
                    </Text>
                  </NavLink>
                  <Layout flexShrink={0} flexBasis='21px' />
                </Fragment>
              ))}
            </NoScrollbar>
            <Layout flexBasis='32px' />
            <Table>
              <Col width='70%' />
              <Col width='10%' />
              <Col width='10%' />
              <Col width='10%' />
              <THead>
                <TR contentCenter firstColumnGray>
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
                  <TR key={`index-${index}`} contentCenter>
                    {tableBody &&
                    tableBody.map((bodyText, index) => (
                      <TD padding={['10px 2px', '10px 2px', '12px 28px']} key={`tableIndex-${index}`}>
                        <Text fontSize='semiMedium' color='inherit'>{bodyText}</Text>
                      </TD>
                    ))}
                  </TR>
                ))}
              </TBody>
            </Table>
            <Layout flexBasis={['32px', '32px', '60px']} />
          </Column>
        </Box>
      </Column>
    </Modal>
  )
  /* eslint-enable */
}

export default BikeModal
