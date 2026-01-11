<script setup lang="ts">
import { Globe, FileText } from 'lucide-vue-next'

const repoInput = ref('');
const router = useRouter();

useSeoMeta({
  title: 'Dokploy Template Generator - GitHub and Manual Payload Creation',
  ogTitle: 'Dokploy Template Generator',
  description: 'Generate the Base64 import string for your Dokploy templates directly from GitHub or manually.',
  ogDescription: 'Generate the Base64 import string for your Dokploy templates directly from GitHub or manually.',
  ogImage: 'https://dealenx.github.io/Dokployfile/og-image.png', // Replace with actual image url if exists
  twitterCard: 'summary_large_image',
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://dealenx.github.io/Dokployfile/' }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': 'Dokploy Template Generator',
        'description': 'Generate the Base64 import string for your Dokploy templates directly from GitHub or manually.',
        'url': 'https://dealenx.github.io/Dokployfile/',
        'applicationCategory': 'DeveloperApplication',
        'operatingSystem': 'Any',
        'author': {
          '@type': 'Organization',
          'name': 'Dokploy'
        }
      })
    }
  ]
})

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
            <div class="flex items-center justify-between">
              <Label>Repository URL or owner/repo</Label>
              <NuxtLink to="/dealenx/dokployfile-template-databasus" class="text-xs text-primary hover:underline">
                See Example
              </NuxtLink>
            </div>
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
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="space-y-2">
          <Badge variant="secondary" class="px-3 py-1 text-sm font-semibold">Step 1</Badge>
          <h3 class="font-bold text-lg">Generate Template</h3>
          <p class="text-sm text-muted-foreground">
            Enter your GitHub repository or use the Manual Generator to create your template configuration.
          </p>
        </div>
        <div class="space-y-2">
          <Badge variant="secondary" class="px-3 py-1 text-sm font-semibold">Step 2</Badge>
          <h3 class="font-bold text-lg">Copy Base64</h3>
          <p class="text-sm text-muted-foreground">
            Click on the Template Card, and click the Copy Button in the Base64 Configuration section.
          </p>
        </div>
        <div class="space-y-2">
          <Badge variant="secondary" class="px-3 py-1 text-sm font-semibold">Step 3</Badge>
          <h3 class="font-bold text-lg">Import in Dokploy</h3>
          <p class="text-sm text-muted-foreground">
            In Dokploy, create a Compose Service, go to <strong>Advanced</strong> -> <strong>Import</strong> and paste the Base64.
          </p>
        </div>
        <div class="space-y-2">
          <Badge variant="secondary" class="px-3 py-1 text-sm font-semibold">Step 4</Badge>
          <h3 class="font-bold text-lg">Deploy</h3>
          <p class="text-sm text-muted-foreground">
            Verify the details in the modal, click <strong>Import</strong>, and then <strong>Deploy</strong> to finish.
          </p>
        </div>
      </div>
    </div>

    <!-- Useful Materials -->
    <div class="mt-20 pt-10 border-t">
      <h2 class="text-2xl font-bold mb-6">Useful Materials</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a 
          href="https://github.com/Dokploy/templates" 
          target="_blank"
          class="flex items-center gap-3 p-4 rounded-xl border bg-card hover:border-primary transition-colors group"
        >
          <div class="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <Globe class="w-5 h-5" />
          </div>
          <div>
            <div class="font-bold">Official Templates</div>
            <p class="text-sm text-muted-foreground">Explore the official Dokploy templates repository.</p>
          </div>
        </a>
        <a 
          href="https://docs.dokploy.com/docs/core/templates" 
          target="_blank"
          class="flex items-center gap-3 p-4 rounded-xl border bg-card hover:border-primary transition-colors group"
        >
          <div class="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <FileText class="w-5 h-5" />
          </div>
          <div>
            <div class="font-bold">Documentation</div>
            <p class="text-sm text-muted-foreground">Learn how to create and manage templates in Dokploy.</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
