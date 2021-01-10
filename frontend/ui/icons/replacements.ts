import { theme } from '@ui/theme'

export const replacements = {
  UnionIcon: {
    '#FFF': `{props.color || '${theme.colors.black}'}`,
  },
  CartIcon: {
    '#262626': `{props.color || '${theme.colors.semiBlack}'}`,
  },
  ExternalIcon: {
    currentColor: `{props.color || '${theme.colors.blue}'}`,
  },
  ArrowRightIcon: {
    white: "{props.color || 'white'}",
  },
  ArrowLeftIcon: {
    white: "{props.color || 'white'}",
  },
  UserIcon: {
    '#262626': `{props.color || '${theme.colors.semiBlack}'}`,
  },
  SearchIcon: {
    '#262626': `{props.color || '${theme.colors.semiBlack}'}`,
    '1em': '20px',
  },
  CityPinIcon: {
    '#727171': "{props.color || '#727171'}",
  },
  CloseIcon: {
    '#BABABA': "{props.color || '#BABABA'}",
  },
  BmwSelectIcon: {
    '#262626': "{props.color || '#262626'}",
  },
  EyeIcon: {
    '#BABABA': `{props.color || '${theme.colors.blue}'}`,
  },
  EnterIcon: {
    '#262626': "{props.color || '#262626'}",
  },
  MinusIcon: {
    '#BABABA': "{props.color || '#BABABA'}",
  },
  FavoriteIcon: {
    '#262626': "{props.color || '#262626'}",
  },
  CheckMarkIcon: {
    white: "{props.color || 'white'}",
  },
  TriangleIcon: {
    white: "{props.color || 'white'}",
  },
  ArrowToBottomIcon: {
    '#1854CD': "{props.color || '#1854CD'}",
  },
  CrossIcon: {
    '#262626': "{props.color || '#262626'}",
  },
}
