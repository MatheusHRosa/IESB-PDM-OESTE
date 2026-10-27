export const COLORS = {
  light: {
    background: '#F5F7FA',
    card: '#FFFFFF',
    text: '#18212F',
    muted: '#667085',
    primary: '#246BFD',
    border: '#D9DEE8',
    danger: '#D92D20',
    input: '#FFFFFF',
    chip: '#E8EEFF',
    overlay: 'rgba(0,0,0,0.35)',
  },
  dark: {
    background: '#101828',
    card: '#1D2939',
    text: '#F2F4F7',
    muted: '#98A2B3',
    primary: '#84ADFF',
    border: '#344054',
    danger: '#FDA29B',
    input: '#182230',
    chip: '#253B63',
    overlay: 'rgba(0,0,0,0.65)',
  },
};

export function getTheme(colorScheme) {
  return colorScheme === 'dark' ? COLORS.dark : COLORS.light;
}
