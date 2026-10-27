const memoryCache = new Map<string, unknown>();

export function useGithubWorker() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const result = ref<any>(null);

  const processRepository = (
    owner: string,
    repo: string,
    branch?: string,
    force = false
  ) => {
    loading.value = true;
    error.value = null;

    const cacheKey = `${owner}/${repo}:${branch || "default"}`;
    if (!force) {
      const cached = memoryCache.get(cacheKey);
      if (cached) {
        result.value = cached;
        loading.value = false;
        return;
      }
    } else {
      memoryCache.delete(cacheKey);
    }

    const worker = new Worker(
      new URL("../workers/github-worker.ts", import.meta.url),
      { type: "module" }
    );

    worker.onmessage = (e) => {
      if (e.data.success) {
        result.value = e.data.data;
        memoryCache.set(cacheKey, e.data.data);
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

  return { loading, error, result, processRepository };
}