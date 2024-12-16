import sanitize from 'sanitize-html';

export const sanitizeEmailBody = (...body: string[]): boolean => {
  return body.every((item) => {
    const sanitizedContent = sanitize(item, {
      allowedTags: [],
      allowedAttributes: {},
    });

    const isScriptIncluded = /<script>/i.test(item);
    const isContentValid = sanitizedContent.trim().length > 0;

    return isContentValid && !isScriptIncluded;
  });
};
