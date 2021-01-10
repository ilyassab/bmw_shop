import styled  from '@emotion/styled'
import { Box } from '@atlantis-lab/layout'

interface Props {
  width?: string | number | string[] | number[]
  height?: string | number | string[] | number[]
}

export const ImageStub = styled(Box)<Props>({
  backgroundColor: 'white',
  position: 'relative',
  backgroundSize: 'contain',
  backgroundImage: 'url(/static/img/imageStub.svg)',
})
