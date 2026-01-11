<script setup lang="ts">
import { Globe, FileText } from 'lucide-vue-next'

const repoInput = ref('');
const router = useRouter();

function handleGenerate() {
  if (!repoInput.value) return;
  
  let owner = '';
  let repo = '';
  
  if (repoInput.value.includes('github.com/')) {
    const parts = repoInput.value.split('github.com/')[1].split('/');
    owner = parts[0];
    repo = parts[1];
  } else if (repoInput.value.includes('/')) {
    const parts = repoInput.value.split('/');
    owner = parts[0];
    repo = parts[1];
  }
  
  if (owner && repo) {
    router.push(`/${owner}/${repo}`);
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto py-20 px-4">
    <div class="text-center mb-16">
      <h1 class="text-5xl font-extrabold mb-4 tracking-tight">Dokploy Template Generator</h1>
      <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
        Generate the Base64 import string for your Dokploy templates directly from GitHub or manually.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
      <Card class="flex flex-col h-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Globe class="w-5 h-5 text-primary" />
            <span>From GitHub</span>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 flex-grow">
          <p class="text-sm text-muted-foreground">
            Enter your GitHub repository to fetch <code class="bg-muted px-1 rounded">Dokployfile.yml</code>, <code class="bg-muted px-1 rounded">docker-compose.yml</code> and <code class="bg-muted px-1 rounded">template.toml</code>.
          </p>
          <div class="space-y-2">
            <Label>Repository URL or owner/repo</Label>
            <div class="relative">
              <Input
                v-model="repoInput"
                placeholder="e.g. Dokploy/templates"
                class="w-full pr-16"
                @keyup.enter="handleGenerate"
              />
              <Button
                size="sm"
                class="absolute right-1 top-1 bottom-1"
                @click="handleGenerate"
              >
                Go
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="flex flex-col h-full">
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <FileText class="w-5 h-5 text-primary" />
            <span>Manual Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4 flex-grow flex flex-col justify-between">
          <p class="text-sm text-muted-foreground">
            Don't have a repository yet? Paste your raw Compose and TOML content to get the Base64 payload instantly.
          </p>
          <Button variant="secondary" class="mt-4 w-full" as-child>
            <NuxtLink to="/generate">Open Manual Generator</NuxtLink>
          </Button>
        </CardContent>
      </Card>
    </div>

    <div class="space-y-12">
      <h2 class="text-3xl font-bold text-center">How to use</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="space-y-2">
          <Badge variant="secondary" class="px-3 py-1 text-sm font-semibold">Step 1</Badge>
          <h3 class="font-bold text-lg">Add Dokployfile</h3>
          <p class="text-sm text-muted-foreground">
            Add a <code class="bg-muted px-1 rounded">Dokployfile.yml</code> to your repository root to define metadata like name, logo, and tags.
          </p>
        </div>
        <div class="space-y-2">
          <Badge variant="secondary" class="px-3 py-1 text-sm font-semibold">Step 2</Badge>
          <h3 class="font-bold text-lg">Link your Repo</h3>
          <p class="text-sm text-muted-foreground">
            Use this service to generate a direct link or a badge for your repository README.
          </p>
        </div>
        <div class="space-y-2">
          <Badge variant="secondary" class="px-3 py-1 text-sm font-semibold">Step 3</Badge>
          <h3 class="font-bold text-lg">Import in Dokploy</h3>
          <p class="text-sm text-muted-foreground">
            Users can copy the generated Base64 and paste it into Dokploy's "Import" section.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
