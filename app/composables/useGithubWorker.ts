export function useGithubWorker() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const result = ref<any>(null);

  const processRepository = (owner: string, repo: string, branch?: string) => {
    loading.value = true;
    error.value = null;

    // Check cache
    const cacheKey = `dokploy:${owner}/${repo}:${branch || "default"}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      result.value = JSON.parse(cached);
      loading.value = false;
      return;
    }

    const worker = new Worker(
      new URL("../workers/github-worker.ts", import.meta.url),
      {
        type: "module",
      }
    );

    worker.onmessage = (e) => {
      if (e.data.success) {
        result.value = e.data.data;
        sessionStorage.setItem(cacheKey, JSON.stringify(e.data.data));
      } else {
        error.value = e.data.error;
      }
      loading.value = false;
      worker.terminate();
    };

    worker.onerror = (e) => {
      error.value = "Worker error: " + e.message;
      loading.value = false;
      worker.terminate();
    };

    worker.postMessage({ owner, repo, branch });
  };

  return {
    loading,
    error,
    result,
    processRepository,
  };
}
