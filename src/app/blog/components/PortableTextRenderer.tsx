// components/PortableTextRenderer.tsx
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/sanity/lib/image'

// Type for your image block
// interface SanityImage extends SanityImageObject {
//   alt?: string
//   caption?: string
// }

const components: PortableTextComponents = {
  types: {
    // image: ({ value }: { value: SanityImage }) => {
    //   if (!value?.asset?._ref) return null
    //   return (
    //     <figure>
    //       <img
    //         src={urlFor(value).width(800).auto('format').url()}
    //         alt={value.alt ?? ''}
    //         style={{ maxWidth: '100%', height: 'auto' }}
    //       />
    //       {value.caption && (
    //         <figcaption>{value.caption}</figcaption>
    //       )}
    //     </figure>
    //   )
    // },
  },

  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href: string } }) => {
      const href = value?.href ?? ''
      const isExternal = !href.startsWith('/')
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
  },

  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold my-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold my-2">{children}</h4>,
    normal: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="list-disc ml-6 my-2">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-6 my-2">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li className="my-1">{children}</li>,
    number: ({ children }) => <li className="my-1">{children}</li>,
  },
}

interface PortableTextRendererProps {
  value: PortableTextBlock[]
}

export default function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}