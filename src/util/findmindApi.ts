
export interface FinMindResponse<T = any> {
  status: string;
  data: T[];
  message?: string;
}



export async function fetchFinMindData<T = any>(
  endpoint: string,
  params: Record<string, string | number>
): Promise<FinMindResponse<T>> {
  const baseUrl = 'https://api.finmindtrade.com/api/v4/';
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const url = `${baseUrl}${endpoint}?${query}`;

  const response = await fetch(url,{
    headers: {
      'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wOC0wNSAxNjoyOToxMCIsInVzZXJfaWQiOiJmeWRkZDIyMiIsImlwIjoiNDMuMTk5LjQ3LjQ2In0.BBEmhlDkjODJrtjt-crX_oa7u1baZ7q6k3bOAlbZbg8`, // ✅ 设置 Authorization 头
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const json = (await response.json()) as FinMindResponse<T>;
  return json;
}
