import { Organization, WebSite, BreadcrumbList, SearchAction } from 'schema-dts';

export default function StructuredData() {
  const organization: Organization = {
    '@type': 'Organization',
    name: 'Studio Six',
    url: 'https://studiosix.ai',
    logo: 'https://studiosix.ai/logo.png',
    sameAs: [
      'https://twitter.com/studiosix',
      'https://instagram.com/studiosix',
      'https://linkedin.com/company/studiosix',
    ],
    description: 'AI-powered architectural visualization and design platform',
  };

  const website: WebSite = {
    '@type': 'WebSite',
    name: 'Studio Six',
    url: 'https://studiosix.ai',
    description: 'Transform your sketches into stunning architectural renders with AI',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://studiosix.ai/search?q={search_term_string}',
      queryInput: 'required name=search_term_string',
    } as SearchAction,
  };

  const breadcrumb: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://studiosix.ai',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([organization, website, breadcrumb]),
      }}
    />
  );
} 