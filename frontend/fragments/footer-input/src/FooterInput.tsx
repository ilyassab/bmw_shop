import React, { FC, useState } from 'react'
import { useApolloClient }     from '@apollo/react-hooks'

import { SubscribeModal }      from '@fragments/subscribe-modal'
import { SubscribeInput }      from '@ui/input'

import messages                from './messages'
import { useData }             from './useData'

const FooterInput: FC = () => {
  const [inputText, setInputText] = useState('')
  const [opened, setOpened] = useState(false)
  const [validResponseText, setNotValidResponseText] = useState('')
  const [id, setId] = useState(null)
  const client = useApolloClient()

  const onClick = async () => {
    const { id: userId, description } = await useData(client, inputText)
    if (userId) {
      setId(userId)
      setNotValidResponseText(description)
      setOpened(true)
    } else {
      setNotValidResponseText(description)
    }
  }

  return (
    <>
      <SubscribeInput
        setInputText={setInputText}
        inputText={inputText}
        messages={messages}
        validResponseText={validResponseText}
        setNotValidResponseText={setNotValidResponseText}
        id={id}
        onClick={onClick}
      />
      <SubscribeModal id={id} opened={opened} onClose={() => setOpened(false)} />
    </>
  )
}

export default FooterInput
