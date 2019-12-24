import { isValidElement, useMemo } from 'react'
import { MessageDescriptor, useIntl } from 'react-intl'

interface OwnProps extends MessageDescriptor {
  values?: { [key: string]: any }
}

export function T({ id, values }: OwnProps) {
  const { messages, formatMessage, formatHTMLMessage } = useIntl()

  const hasHtml = useMemo(() => {
    return {
      message: !!id && /<[a-z][\s\S]*>/i.test(messages[id] as string),
      values: values
        ? Object.keys(values).every(key => isValidElement(values[key]))
        : false
    }
  }, [id, messages, values])

  if (
    process.env.NODE_ENV === 'development' &&
    !id &&
    hasHtml.message &&
    hasHtml.values
  ) {
    throw new Error(`Not valid message and values ${id}`)
  }

  const descriptor = useMemo(() => ({ id }), [id])

  const isText = useMemo(() => {
    return values ? hasHtml.values && !hasHtml.message : !hasHtml.message
  }, [hasHtml, values])

  return (
    <>
      {isText ? (
        formatMessage(descriptor, values)
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: formatHTMLMessage(descriptor, values) as string
          }}
        />
      )}
    </>
  )
}
