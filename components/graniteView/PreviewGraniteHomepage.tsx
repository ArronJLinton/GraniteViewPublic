"use client";

import type { IContentItem } from "@kontent-ai/delivery-sdk";
import { applyUpdateOnItemAndLoadLinkedItems } from "@kontent-ai/smart-link";
import { type FC, useState } from "react";
import type { HomepageItem } from "../../lib/types/homepageContent.ts";
import { useLivePreview } from "../../lib/useLivePreview.ts";
import { parseFlatted, stringifyAsType } from "../../lib/utils/circularityUtils.ts";
import GraniteHomepage from "./GraniteHomepage.tsx";

type Props = Readonly<{
  items: ReadonlyArray<HomepageItem>;
}>;

const PreviewGraniteHomepage: FC<Props> = ({ items }) => {
  const [previewItems, setPreviewItems] = useState(parseFlatted(stringifyAsType(items)));

  useLivePreview(async (data) => {
    const updatedItems = await Promise.all(
      previewItems.map(async (item) => {
        const updatedItem = await applyUpdateOnItemAndLoadLinkedItems(
          item,
          data,
          async (codenamesToFetch) => {
            const response = await fetch(`/api/items?codenames=${codenamesToFetch.join(",")}`);

            return (await response.json()) as ReadonlyArray<IContentItem>;
          },
        );

        return updatedItem as unknown as HomepageItem;
      }),
    );

    setPreviewItems(updatedItems);
  });

  return <GraniteHomepage items={previewItems} />;
};

export default PreviewGraniteHomepage;
