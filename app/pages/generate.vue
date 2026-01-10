<script setup lang="ts">
const compose = ref('');
const config = ref('');
const base64 = computed(() => {
  if (!compose.value) return '';
  try {
    return generateDokployPayload(compose.value, config.value);
  } catch (e) {
    return 'Error encoding...';
  }
});

const lintResults = computed(() => lintComposeFile(compose.value));

const { copy, copied } = useClipboard();
</script>

<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Manual Template Generator</h1>
      <p class="text-gray-500">Paste your configuration files to generate a Dokploy import payload without needing a repository.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="space-y-2">
        <label class="block text-sm font-medium">docker-compose.yml</label>
        <UTextarea
          v-model="compose"
          placeholder="services: ..."
          rows="15"
          autoresize
          class="font-mono text-xs"
        />
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-medium">template.toml</label>
        <UTextarea
          v-model="config"
          placeholder="[config] ..."
          rows="15"
          autoresize
          class="font-mono text-xs"
        />
      </div>
    </div>

    <UCard v-if="base64">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="font-bold">Generated Payload</h3>
          <UButton
            :color="copied ? 'success' : 'primary'"
            variant="solid"
            icon="i-heroicons-clipboard-document"
            @click="copy(base64)"
          >
            {{ copied ? 'Copied!' : 'Copy for Dokploy' }}
          </UButton>
        </div>
      </template>
      <UTextarea
        readonly
        autoresize
        :model-value="base64"
        class="font-mono text-xs"
        rows="5"
      />
    </UCard>

    <div v-if="lintResults.length > 0" class="mt-8">
      <h3 class="font-bold mb-2">Dokploy Recommendations</h3>
      <ul class="space-y-2">
        <li v-for="(lint, i) in lintResults" :key="i" class="flex gap-2 text-sm">
          <UIcon
            :name="lint.level === 'error' ? 'i-heroicons-x-circle' : 'i-heroicons-information-circle'"
            :class="lint.level === 'error' ? 'text-error' : 'text-warning'"
          />
          <span>{{ lint.message }}</span>
        </li>
      </ul>
    </div>

    <div class="mt-10 text-center">
      <UButton to="/" variant="ghost" icon="i-heroicons-arrow-left">Back to Home</UButton>
    </div>
  </div>
</template>
