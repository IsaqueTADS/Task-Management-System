import React from "react";

interface UseFetchResponse {
  loading: boolean;
  error: string | null;
  request: <T>(
    url: RequestInfo | URL,
    options?: RequestInit
  ) => Promise<{
    json: T;
    response: Response;
  }>;
}

export const useFetch = (): UseFetchResponse => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const request = async <T>(
    url: RequestInfo | URL,
    options?: RequestInit
  ): Promise<{ json: T; response: Response }> => {
    const controller = new AbortController();
    const { signal } = controller;

    let response: Response;
    let json: T;

    try {
      setLoading(true);
      setError(null);

      response = await fetch(url, {
        signal,
        ...options,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      json = await response.json();
    } catch (err) {
      if (!signal.aborted && err instanceof Error)
        setError(err.message ?? "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }

    return { json, response };
  };

  return { loading, error, request };
};
