<script setup lang="ts">
import { Loader2, AlertTriangle, Link, XCircle, Info, Copy, Globe, FileCode, Check } from 'lucide-vue-next'

const route = useRoute();
const owner = computed(() => route.params.owner as string);
const repo = computed(() => route.params.repo as string);
const branch = computed(() => (route.query.branch as string) || undefined);

const { loading, error, result, processRepository } = useGithubWorker();
const { copy, copied } = useClipboard();
const config = useRuntimeConfig();

const activeTab = ref('compose');

const { copy: copyCompose, copied: copiedCompose } = useClipboard();
const { copy: copyConfig, copied: copiedConfig } = useClipboard();

onMounted(() => {
  if (owner.value && repo.value) {
    processRepository(owner.value, repo.value, branch.value);
  }
});
</script>

<template>
  <div class="max-w-5xl mx-auto py-10 px-4">
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

    <div v-else-if="result" class="space-y-8">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row md:items-center gap-6">
        <Avatar v-if="result.dokployfile.meta.logo" class="w-24 h-24 rounded-xl border bg-card p-4">
          <AvatarImage
            :src="result.dokployfile.meta.logo.startsWith('http') 
              ? result.dokployfile.meta.logo 
              : `https://raw.githubusercontent.com/${owner}/${repo}/${result.branch}/${result.dokployfile.meta.logo.replace(/^\.?\//, '')}`"
            :alt="result.dokployfile.meta.name"
            class="object-contain"
          />
          <AvatarFallback class="rounded-xl text-2xl">{{ result.dokployfile.meta.name.substring(0, 2).toUpperCase() }}</AvatarFallback>
        </Avatar>
        <div class="space-y-2">
          <h1 class="text-4xl font-bold tracking-tight">{{ result.dokployfile.meta.name }}</h1>
          <div class="flex items-center gap-4 text-sm text-muted-foreground">
            <span class="font-mono bg-muted px-2 py-0.5 rounded">{{ result.dokployfile.meta.version }}</span>
            <div class="flex gap-3">
              <a :href="`https://github.com/${owner}/${repo}`" target="_blank" class="hover:text-primary flex items-center gap-1 transition-colors">
                <Globe class="w-4 h-4" /> Template source
              </a>
              <template v-if="result.dokployfile.meta.links">
                <a 
                  v-for="(url, label) in result.dokployfile.meta.links"
                  :key="label"
                  :href="url"
                  target="_blank"
                  class="hover:text-primary flex items-center gap-1 transition-colors"
                >
                  <Link class="w-4 h-4" /> {{ label }}
                </a>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Description & Tags -->
      <div class="space-y-4">
        <p class="text-lg text-muted-foreground leading-relaxed">{{ result.dokployfile.meta.description }}</p>
        <div class="flex gap-2 flex-wrap">
          <Badge v-for="tag in result.dokployfile.meta.tags" :key="tag" variant="secondary" class="px-3">
            {{ tag }}
          </Badge>
        </div>
      </div>

      <!-- Base64 Section -->
      <div class="space-y-3">
        <div>
          <h2 class="text-2xl font-bold">Base64 Configuration</h2>
          <p class="text-sm text-muted-foreground">Encoded template file</p>
        </div>
        
        <div class="relative group">
          <div class="bg-muted/50 font-mono text-xs rounded-xl p-4 pr-14 break-all border overflow-hidden max-h-24">
            {{ result.base64 }}
          </div>
          <Button
            @click="copy(result.base64)"
            size="icon"
            variant="secondary"
            class="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Check v-if="copied" class="w-4 h-4" />
            <Copy v-else class="w-4 h-4" />
          </Button>
        </div>
      </div>

      <!-- File TABS Section -->
      <Tabs v-model="activeTab" class="w-full">
        <TabsList class="grid w-full max-w-md grid-cols-2 bg-muted/50 p-1">
          <TabsTrigger value="compose" class="rounded-md">
            Docker Compose
          </TabsTrigger>
          <TabsTrigger value="config" class="rounded-md">
            Configuration
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compose" class="mt-6">
          <div class="space-y-2">
            <div class="flex justify-between items-end">
              <div>
                <h3 class="text-xl font-bold">Docker Compose</h3>
                <p class="text-sm text-muted-foreground">docker-compose.yml</p>
              </div>
              <Button size="sm" variant="outline" class="gap-2" @click="copyCompose(result.compose)">
                <Check v-if="copiedCompose" class="w-4 h-4" />
                <Copy v-else class="w-4 h-4" />
                Copy
              </Button>
            </div>
            <div class="relative mt-2 border rounded-xl overflow-hidden bg-[#0d1117]">
              <ScrollArea class="h-[500px] w-full">
                <pre class="p-6 text-sm font-mono leading-relaxed text-gray-300"><code>{{ result.compose }}</code></pre>
              </ScrollArea>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="config" class="mt-6">
          <div class="space-y-2">
            <div class="flex justify-between items-end">
              <div>
                <h3 class="text-xl font-bold">Configuration</h3>
                <p class="text-sm text-muted-foreground">template.toml</p>
              </div>
              <Button size="sm" variant="outline" class="gap-2" @click="copyConfig(result.config)">
                <Check v-if="copiedConfig" class="w-4 h-4" />
                <Copy v-else class="w-4 h-4" />
                Copy
              </Button>
            </div>
            <div class="relative mt-2 border rounded-xl overflow-hidden bg-[#0d1117]">
              <ScrollArea class="h-[500px] w-full">
                <pre class="p-6 text-sm font-mono leading-relaxed text-gray-300"><code>{{ result.config || "# No configuration provided" }}</code></pre>
              </ScrollArea>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <!-- Recommendations -->
      <div v-if="result.lintResults.length > 0" class="pt-8 border-top">
        <h3 class="text-xl font-bold mb-4">Dokploy Recommendations</h3>
        <ul class="space-y-3">
          <li v-for="(lint, i) in result.lintResults" :key="i" class="flex gap-3 text-sm p-3 rounded-lg border bg-card">
            <XCircle v-if="lint.level === 'error'" class="w-5 h-5 text-destructive shrink-0" />
            <Info v-else class="w-5 h-5 text-blue-500 shrink-0" />
            <span>{{ lint.message }}</span>
          </li>
        </ul>
      </div>

      <!-- Badge Helper -->
      <div class="pt-10">
        <Card class="bg-muted/30 border-dashed">
          <CardHeader>
            <CardTitle class="text-lg">Add to your README</CardTitle>
          </CardHeader>
          <CardContent class="space-y-4">
            <p class="text-sm text-muted-foreground">Copy this Markdown to add a Dokploy deployment badge:</p>
            <div class="bg-muted p-3 rounded-md border text-xs font-mono break-all text-primary">
              [![Deploy with Dokploy](https://img.shields.io/badge/Deploy_with-Dokploy-black)]({{ config.public.baseUrl }}{{ owner }}/{{ repo }})
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
