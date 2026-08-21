import type { Metadata } from "next";
import { cookies, draftMode } from "next/headers";
import { cache } from "react";
import GraniteHomepage from "../../components/graniteView/GraniteHomepage.tsx";
import PreviewGraniteHomepage from "../../components/graniteView/PreviewGraniteHomepage.tsx";
import { previewApiKeyCookieName } from "../../lib/constants/cookies.ts";
import { graniteMetadata } from "../../lib/constants/graniteView.ts";
import { getHomepageItems } from "../../lib/kontentClient.ts";
import { parseFlatted, stringifyAsType } from "../../lib/utils/circularityUtils.ts";

const getItems = cache(async (envId: string, previewApiKey?: string) =>
  getHomepageItems({ envId, previewApiKey }, !!previewApiKey),
);

const Home = async ({ params }: { params: Promise<{ envId: string }> }) => {
  const envId = (await params).envId;
  const draft = await draftMode();
  const previewApiKey = draft.isEnabled
    ? (await cookies()).get(previewApiKeyCookieName)?.value
    : undefined;
  const itemData = await getItems(envId, previewApiKey);
  const items = parseFlatted(stringifyAsType(itemData));

  const HomepageComponent = draft.isEnabled ? PreviewGraniteHomepage : GraniteHomepage;

  return <HomepageComponent items={items} />;
};

export function generateMetadata(): Metadata {
  return {
    description: graniteMetadata.description,
    title: graniteMetadata.title,
  };
}

export default Home;
