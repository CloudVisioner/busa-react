const TOKEN_COOKIE = 'busa_admin_token';

function getCookieValue(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const row = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`));
  return row?.split('=')[1];
}

function getUploadEndpoint(): string {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL?.trim() ?? 'http://localhost:3001/graphql';
  const origin = new URL(apiUrl).origin;
  return `${origin}/upload/image`;
}

export async function uploadImage(file: File): Promise<string> {
  const token = getCookieValue(TOKEN_COOKIE);
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(getUploadEndpoint(), {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!response.ok) {
    let message = `Upload failed (${response.status})`;
    try {
      const payload = (await response.json()) as { message?: string };
      if (payload.message) message = payload.message;
    } catch {
      // Keep fallback error message.
    }
    throw new Error(message);
  }

  const data = (await response.json()) as { url?: string };
  if (!data.url) throw new Error('Upload succeeded but URL is missing');
  return data.url;
}
