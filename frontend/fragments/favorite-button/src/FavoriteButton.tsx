import React, { FC, useEffect, useState }             from 'react'
import { useApolloClient }                            from '@apollo/react-hooks'
import { useRouter }                                  from 'next/router'

import { Button }                                     from '@ui/button'
import { Condition }                                  from '@ui/condition'
import { Favorite }                                   from '@ui/favorite'
import { Transition }                                 from '@ui/transition'
import { useFavoriteDispatch, useFavoriteState }      from '@store/stores'
import { cookieStorage }                              from '@utils/cookie-storage'

import { addToFavorite, deleteFavorite, useFavorite } from './useData'

interface Props {
  productId?: number | string
  isButton?: boolean
}

const FavoriteButton: FC<Props> = ({ productId, isButton }) => {
  const client = useApolloClient()
  const router = useRouter()
  const { dispatch: favoriteDispatch } = useFavoriteDispatch()
  const { state: favoriteState } = useFavoriteState()
  const [isFavorite, setIsFavorite] = useState(
    favoriteState && favoriteState.items.findIndex(item => item.id === productId) !== -1
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (favoriteState.items && favoriteState.items.length <= 0) {
      const fetchData = async () => {
        const token = cookieStorage.getItem('token') || ''
        if (token) {
          const data = await useFavorite(client, token)
          favoriteDispatch({ type: 'add', payload: data })
          setIsFavorite(data && data.items.findIndex(item => item.id === productId) !== -1)
        }
      }
      fetchData()
    }
  }, [])

  const onAddToFavorite = () => {
    const fetchData = async () => {
      const token = cookieStorage.getItem('token') || ''
      if (token) {
        setLoading(true)
        if (!isFavorite) {
          const data = await addToFavorite(client, productId, token)
          favoriteDispatch({ type: 'add', payload: data })
          setIsFavorite(data && data.items.findIndex(item => item.id === productId) !== -1)
        } else {
          const data = await deleteFavorite(client, productId, token)
          favoriteDispatch({ type: 'add', payload: data })
          setIsFavorite(data && data.items.findIndex(item => item.id === productId) !== -1)
        }
        setLoading(false)
      } else {
        router.push('/login')
      }
    }
    fetchData()
  }

  return (
    <>
      <Condition match={isButton}>
        <Button
          border='gray'
          borderRadius='0'
          backgroundColor='white'
          alignItems='center'
          justifyContent='center'
          width='60px'
          height='60px'
          onClick={onAddToFavorite}
        >
          <Favorite isFavorite={isFavorite} loading={loading} width='23px' height='20px' isButton />
        </Button>
      </Condition>
      <Condition match={!isButton}>
        <Transition cursor='pointer' onClick={onAddToFavorite}>
          <Favorite isFavorite={isFavorite} loading={loading} width='23px' height='20px' />
        </Transition>
      </Condition>
    </>
  )
}

export default FavoriteButton
