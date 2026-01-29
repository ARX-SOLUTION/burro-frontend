import { useEffect } from 'react';

export type PageMetadata = {
  title?: string;
  description?: string;
};

const getDescriptionTag = () => {
  return document.querySelector<HTMLMetaElement>("meta[name='description']");
};

export const usePageMetadata = ({ title, description }: PageMetadata) => {
  useEffect(() => {
    if (!title && !description) {
      return;
    }

    if (title) {
      document.title = title;
    }

    if (description) {
      let meta = getDescriptionTag();
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }
  }, [title, description]);
};
