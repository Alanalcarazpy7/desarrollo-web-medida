import type { ServiceJsonLdNodes } from "@/lib/service-schema";

/**
 * Renderiza los <script type="application/ld+json"> a partir de los nodos
 * generados por buildServiceJsonLd(). Componente de servidor, sin estado.
 */
export default function ServiceJsonLd({ nodes }: { nodes: ServiceJsonLdNodes }) {
  const items = [nodes.service, nodes.breadcrumb, nodes.faqPage].filter(
    (n): n is Record<string, unknown> => n !== null
  );

  return (
    <>
      {items.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
