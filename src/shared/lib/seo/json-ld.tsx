import Script from "next/script";

type JsonLdProps = {
  id: string;
  schema: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ id, schema }: JsonLdProps) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
