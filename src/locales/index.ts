export interface L10nData {
  locale: string
  messages: Record<string, string>
}

export const SUPPORTED_LOCALES = ['ru', 'en']

export const DEFAULT_LOCALE = 'ru'

export const localePathReg = `/:locale(${SUPPORTED_LOCALES.join('|')})`
