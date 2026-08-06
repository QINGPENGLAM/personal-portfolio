export const navigation = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
  { href: '/resume', label: 'Resume' },
] as const

export const directRoutes = ['/', '/world', ...navigation.map((item) => item.href)] as const
