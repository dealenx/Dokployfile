export function generateDokployPayload(
  compose: string,
  config: string
): string {
  const payload = {
    compose,
    config,
  };

  const jsonString = JSON.stringify(payload);
  // Use btoa for browser-compatible base64 encoding
  // For Unicode support, we use the standard trick:
  return btoa(unescape(encodeURIComponent(jsonString)));
}

export function decodeDokployPayload(base64: string): {
  compose: string;
  config: string;
} {
  const jsonString = decodeURIComponent(escape(atob(base64)));
  return JSON.parse(jsonString);
}
