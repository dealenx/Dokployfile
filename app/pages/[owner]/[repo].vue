<script setup lang="ts">
const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repo = computed(() => route.params.repo as string);
const branch = computed(() => (route.query.branch as string) || undefined);

const { loading, error, result, processRepository } = useGithubWorker();
const { copy } = useClipboard();
const config = useRuntimeConfig();

onMounted(() => {
  if (owner.value && repo.value) {
    processRepository(owner.value, repo.value, branch.value);
  }
});
</script>

<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <UCard v-if="loading" class="text-center py-20">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl mb-4 opacity-50" />
      <p>Fetching template from GitHub...</p>
    </UCard>

    <UAlert
      v-else-if="error"
      title="Error"
      icon="i-heroicons-exclamation-triangle"
      color="error"
      variant="soft"
      :description="error"
    />

    <div v-else-if="result" class="space-y-6">
      <div class="flex items-center gap-4">
        <UAvatar
          v-if="result.dokployfile.meta.logo"
          :src="result.dokployfile.meta.logo.startsWith('http') 
            ? result.dokployfile.meta.logo 
            : `https://raw.githubusercontent.com/${owner}/${repo}/${result.branch}/${result.dokployfile.meta.logo}`"
          :alt="result.dokployfile.meta.name"
          size="xl"
        />
        <div>
          <h1 class="text-3xl font-bold">{{ result.dokployfile.meta.name }}</h1>
          <p class="text-gray-500">{{ result.dokployfile.meta.description }}</p>
        </div>
      </div>

      <div class="flex gap-2 flex-wrap">
        <UBadge v-for="tag in result.dokployfile.meta.tags" :key="tag" variant="soft">
          {{ tag }}
        </UBadge>
        <UBadge color="neutral" variant="outline">v{{ result.dokployfile.meta.version }}</UBadge>
      </div>

      <div v-if="result.dokployfile.meta.links" class="flex gap-4">
        <UButton
          v-for="(url, label) in result.dokployfile.meta.links"
          :key="label"
          :to="url"
          target="_blank"
          variant="ghost"
          size="sm"
          icon="i-heroicons-link"
        >
          {{ label }}
        </UButton>
      </div>

      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="font-bold">Import Payload</h3>
            <UButton
              color="primary"
              variant="solid"
              icon="i-heroicons-clipboard-document"
              @click="copy(result.base64)"
            >
              Copy for Dokploy
            </UButton>
          </div>
        </template>
        <UTextarea
          readonly
          autoresize
          :model-value="result.base64"
          class="font-mono text-xs"
          rows="5"
        />
      </UCard>

      <div v-if="result.lintResults.length > 0">
        <h3 class="font-bold mb-2">Dokploy Recommendations</h3>
        <ul class="space-y-2">
          <li v-for="(lint, i) in result.lintResults" :key="i" class="flex gap-2 text-sm">
            <UIcon 
              :name="lint.level === 'error' ? 'i-heroicons-x-circle' : 'i-heroicons-information-circle'" 
              :class="lint.level === 'error' ? 'text-error' : 'text-warning'"
            />
            <span>{{ lint.message }}</span>
          </li>
        </ul>
      </div>

      <UCard>
        <template #header>
          <h3 class="font-bold">Add to your README</h3>
        </template>
        <div class="space-y-4">
          <p class="text-sm">Copy this Markdown to add a Dokploy badge to your repository:</p>
          <div class="bg-gray-900 p-2 rounded relative group">
            <pre class="text-xs text-blue-400 overflow-x-auto"><code>[![Deploy with Dokploy](https://img.shields.io/badge/Deploy_with-Dokploy-blue?logo=docker)]({{ $config.public.baseUrl }}#/{{ owner }}/{{ repo }})</code></pre>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
