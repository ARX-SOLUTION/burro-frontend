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

    let meta: HTMLMetaElement | null = null;
    let created = false;
    if (description) {
      meta = getDescriptionTag();
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
        created = true;
      }
      meta.content = description;
    }

    return () => {
      if (created && meta) {
        document.head.removeChild(meta);
      }
    };
  }, [title, description]);
};
