import { Inter } from "next/font/google";
import type { FC } from "react";
import type { HomepageItem } from "../../lib/types/homepageContent.ts";
import { groupHomepageItemsByCollection } from "../../lib/utils/homepageContent.ts";
import { GraniteFeaturedAlert } from "./GraniteFeaturedAlert.tsx";
import { GraniteFooter } from "./GraniteFooter.tsx";
import { GraniteHeader } from "./GraniteHeader.tsx";
import { GraniteHero } from "./GraniteHero.tsx";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

type Props = Readonly<{
  items: ReadonlyArray<HomepageItem>;
}>;

export const GraniteHomepage: FC<Props> = ({ items }) => {
  const groups = groupHomepageItemsByCollection(items);

  return (
    <div className={`${inter.className} w-full bg-white text-granite-navy`}>
      <GraniteHeader />
      <main>
        <GraniteHero />
        <section className="granite-dots px-6 py-16" id="insights">
          {groups.length > 0 ? (
            <div className="mx-auto flex max-w-5xl flex-col gap-16">
              {groups.map((group) => (
                <section
                  aria-labelledby={`${group.codename}-heading`}
                  className="flex flex-col gap-8"
                  id={group.sectionId}
                  key={group.codename}
                >
                  <h2
                    className="m-0 border-b border-granite-line pb-3 text-2xl font-bold tracking-tight text-granite-navy md:text-3xl"
                    id={`${group.codename}-heading`}
                  >
                    {group.heading}
                  </h2>
                  {group.items.map((item) => (
                    <GraniteFeaturedAlert item={item} key={item.system.id} />
                  ))}
                </section>
              ))}
            </div>
          ) : (
            <p className="mx-auto max-w-5xl m-0 text-sm text-granite-muted">
              No public content was returned from Kontent.
            </p>
          )}
        </section>
      </main>
      <GraniteFooter />
    </div>
  );
};

export default GraniteHomepage;
