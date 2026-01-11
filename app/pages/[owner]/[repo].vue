<script setup lang="ts">
import { Loader2, AlertTriangle, Link, XCircle, Info, Copy } from 'lucide-vue-next'

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repo = computed(() => route.params.repo as string);
const branch = computed(() => (route.query.branch as string) || undefined);

const { loading, error, result, processRepository } = useGithubWorker();
const { copy, copied } = useClipboard();
const config = useRuntimeConfig();

onMounted(() => {
  if (owner.value && repo.value) {
    processRepository(owner.value, repo.value, branch.value);
  }
});
</script>

<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <Card v-if="loading" class="text-center py-20 flex flex-col items-center">
      <Loader2 class="animate-spin w-10 h-10 mb-4 opacity-50" />
      <p>Fetching template from GitHub...</p>
    </Card>

    <Alert
      v-else-if="error"
      variant="destructive"
    >
      <AlertTriangle class="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {{ error }}
      </AlertDescription>
    </Alert>

    <div v-else-if="result" class="space-y-6">
      <div class="flex items-center gap-4">
        <Avatar v-if="result.dokployfile.meta.logo" class="w-20 h-20">
          <AvatarImage
            :src="result.dokployfile.meta.logo.startsWith('http') 
              ? result.dokployfile.meta.logo 
              : `https://raw.githubusercontent.com/${owner}/${repo}/${result.branch}/${result.dokployfile.meta.logo}`"
            :alt="result.dokployfile.meta.name"
          />
          <AvatarFallback>{{ result.dokployfile.meta.name.substring(0, 2).toUpperCase() }}</AvatarFallback>
        </Avatar>
        <div>
          <h1 class="text-3xl font-bold">{{ result.dokployfile.meta.name }}</h1>
          <p class="text-muted-foreground">{{ result.dokployfile.meta.description }}</p>
        </div>
      </div>

      <div class="flex gap-2 flex-wrap">
        <Badge v-for="tag in result.dokployfile.meta.tags" :key="tag" variant="secondary">
          {{ tag }}
        </Badge>
        <Badge variant="outline" class="text-muted-foreground">v{{ result.dokployfile.meta.version }}</Badge>
      </div>

      <div v-if="result.dokployfile.meta.links" class="flex gap-4">
        <Button
          v-for="(url, label) in result.dokployfile.meta.links"
          :key="label"
          variant="ghost"
          size="sm"
          as-child
        >
          <a :href="url" target="_blank" class="flex items-center gap-2">
            <Link class="w-4 h-4" />
            {{ label }}
          </a>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div class="flex justify-between items-center">
            <CardTitle>Import Payload</CardTitle>
            <Button
              @click="copy(result.base64)"
              size="sm"
              class="gap-2"
            >
              <Copy class="w-4 h-4" />
              {{ copied ? 'Copied!' : 'Copy for Dokploy' }}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            readonly
            :model-value="result.base64"
            class="font-mono text-xs h-32"
          />
        </CardContent>
      </Card>

      <div v-if="result.lintResults.length > 0">
        <h3 class="font-bold mb-2">Dokploy Recommendations</h3>
        <ul class="space-y-2">
          <li v-for="(lint, i) in result.lintResults" :key="i" class="flex gap-2 text-sm">
            <XCircle v-if="lint.level === 'error'" class="w-4 h-4 text-destructive" />
            <Info v-else class="w-4 h-4 text-blue-500" />
            <span>{{ lint.message }}</span>
          </li>
        </ul>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add to your README</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-sm text-muted-foreground">Copy this Markdown to add a Dokploy badge to your repository:</p>
          <div class="bg-muted p-3 rounded-md relative group border">
            <pre class="text-xs text-primary overflow-x-auto"><code>[![Deploy with Dokploy](https://img.shields.io/badge/Deploy_with-Dokploy-blue?logo=docker)]({{ config.public.baseUrl }}{{ owner }}/{{ repo }})</code></pre>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
