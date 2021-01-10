import React, { useState } from 'react'
import { Column, Layout }  from '@atlantis-lab/layout'

import { Modal }           from '@atlantis-lab/modal'
import { SizeModal }       from '@fragments/size-modal'

import Desktop             from './Desktop'
import Mobile              from './Mobile'

export const HowToSizeModal = ({ onClose, opened }) => {
  const [sizeModalOpened, setSizeModalOpened] = useState(false)

  return (
    <Modal visible={opened} onClose={onClose} alignItems={['flex-start', 'flex-start', 'center']}>
      <Column>
        <Layout width='100%' display={['none', 'none', 'flex']} justifyContent='center'>
          <Desktop onClose={onClose} setSizeModalOpened={setSizeModalOpened} />
        </Layout>
        <Layout
          width='100%'
          display={['flex', 'flex', 'none']}
          minHeight='100%'
          justifyContent='center'
        >
          <Mobile onClose={onClose} setSizeModalOpened={setSizeModalOpened} />
        </Layout>
      </Column>
      <SizeModal opened={sizeModalOpened} onClose={() => setSizeModalOpened(false)} />
    </Modal>
  )
}
