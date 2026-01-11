<script setup lang="ts">
import { Copy, Check, XCircle, Info, ArrowLeft } from 'lucide-vue-next'

const compose = ref('');
const config = ref('');

useSeoMeta({
  title: 'Manual Payload Generator - Dokploy Template Generator',
  ogTitle: 'Manual Payload Generator',
  description: 'Create a Dokploy import payload manually by pasting your docker-compose.yml and template.toml content.',
  ogDescription: 'Create a Dokploy import payload manually by pasting your docker-compose.yml and template.toml content.',
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://dealenx.github.io/Dokployfile/generate' }
  ]
})

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
      <p class="text-muted-foreground">Paste your configuration files to generate a Dokploy import payload without needing a repository.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="space-y-4">
        <Label class="text-base font-semibold">docker-compose.yml</Label>
        <Textarea
          v-model="compose"
          placeholder="services: ..."
          class="font-mono text-xs h-[400px]"
        />
      </div>
      <div class="space-y-4">
        <Label class="text-base font-semibold">template.toml</Label>
        <Textarea
          v-model="config"
          placeholder="[config] ..."
          class="font-mono text-xs h-[400px]"
        />
      </div>
    </div>

    <Card v-if="base64">
      <CardHeader>
        <div class="flex justify-between items-center">
          <CardTitle>Generated Payload</CardTitle>
          <Button
            @click="copy(base64)"
            variant="default"
            size="sm"
            class="gap-2"
          >
            <Check v-if="copied" class="w-4 h-4" />
            <Copy v-else class="w-4 h-4" />
            {{ copied ? 'Copied!' : 'Copy for Dokploy' }}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Textarea
          readonly
          :model-value="base64"
          class="font-mono text-xs h-32"
        />
      </CardContent>
    </Card>

    <!-- How to deploy guide -->
    <div v-if="base64" class="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-4">
      <div class="flex items-center gap-2 text-primary font-bold">
        <Info class="w-5 h-5" />
        <span>How to use this template</span>
      </div>
      <ol class="space-y-3 text-sm list-decimal list-inside text-muted-foreground">
        <li>Click the <strong>Copy Button</strong> in the Generated Payload section above.</li>
        <li>Go to your Dokploy instance and <strong>create a new Compose Service</strong>.</li>
        <li>Navigate to the <strong>Advanced</strong> section and scroll down to <strong>Import</strong>.</li>
        <li><strong>Paste the Base64 value</strong> into the input field and click <strong>Import</strong>.</li>
        <li>Verify the details (Compose File, Environment Variables, etc.) in the modal.</li>
        <li>Click <strong>Deploy</strong> and wait for the process to finish.</li>
      </ol>
    </div>

    <div v-if="lintResults.length > 0" class="mt-8">
      <h3 class="font-bold mb-2">Dokploy Recommendations</h3>
      <ul class="space-y-2">
        <li v-for="(lint, i) in lintResults" :key="i" class="flex gap-2 text-sm">
          <XCircle v-if="lint.level === 'error'" class="w-4 h-4 text-destructive" />
          <Info v-else class="w-4 h-4 text-blue-500" />
          <span>{{ lint.message }}</span>
        </li>
      </ul>
    </div>

    <div class="mt-10 text-center">
      <Button variant="ghost" as-child class="gap-2">
        <NuxtLink to="/">
          <ArrowLeft class="w-4 h-4" />
          Back to Home
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
