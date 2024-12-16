export function detectSpam(...body: string[]) {
  const spamKeywords = ['buy now', 'free money', 'lottery'];

  return body.every((item) => {
    const lowerCaseBody = item.toLowerCase();
    return spamKeywords.some((keyword) => lowerCaseBody.includes(keyword));
  });
}
