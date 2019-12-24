import { L10nData } from '@app/locales'
import { Loader } from '@app/ui/loader'
import { Fragment, PropsWithChildren, useEffect, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { useParams } from 'react-router-dom'

export function Bootstrap({ children }: PropsWithChildren<{}>) {
  const [l10n, setL10n] = useState<L10nData>()
  const { locale } = useParams<{ locale: string }>()

  useEffect(() => {
    import(`@app/locales/${locale}.json`).then(
      (res: { default: L10nData['messages'] }) => {
        setL10n({ locale, messages: res.default })
      }
    )
  }, [locale])

  if (!l10n) return <Loader loading />

  return (
    <IntlProvider
      locale={l10n.locale}
      messages={l10n.messages}
      textComponent={Fragment}
      timeZone="UTC"
    >
      {children}
    </IntlProvider>
  )
}
