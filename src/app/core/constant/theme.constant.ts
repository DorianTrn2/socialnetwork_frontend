export const EVENT_THEME = {
  SPORT: 'Sport',
  CULTURE: 'Culture',
  FESTIF: 'Festif',
  PROFESSIONNEL: 'Professionnel',
  AUTRE: 'Autre'
} as const;

export type EventTheme = keyof typeof EVENT_THEME;

