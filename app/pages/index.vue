<script setup lang="ts">
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
      <p class="text-xl text-gray-400 max-w-2xl mx-auto">
        Generate the Base64 import string for your Dokploy templates directly from GitHub or manually.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
      <UCard class="flex flex-col h-full">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-globe-alt" class="text-primary" />
            <h2 class="text-xl font-bold">From GitHub</h2>
          </div>
        </template>
        <div class="space-y-4 flex-grow">
          <p class="text-sm text-gray-500">
            Enter your GitHub repository to fetch <code>Dokployfile.yml</code>, <code>docker-compose.yml</code> and <code>template.toml</code>.
          </p>
          <UFormGroup label="Repository URL or owner/repo">
            <UInput
              v-model="repoInput"
              placeholder="e.g. Dokploy/templates"
              class="w-full"
              @keyup.enter="handleGenerate"
            >
              <template #trailing>
                <UButton
                  color="primary"
                  variant="solid"
                  size="sm"
                  class="mr-1"
                  @click="handleGenerate"
                >
                  Go
                </UButton>
              </template>
            </UInput>
          </UFormGroup>
        </div>
      </UCard>

      <UCard class="flex flex-col h-full">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-document-text" class="text-primary" />
            <h2 class="text-xl font-bold">Manual Generator</h2>
          </div>
        </template>
        <div class="space-y-4 flex-grow flex flex-col justify-between">
          <p class="text-sm text-gray-500">
            Don't have a repository yet? Paste your raw Compose and TOML content to get the Base64 payload instantly.
          </p>
          <UButton to="/generate" color="neutral" variant="soft" block class="mt-4">Open Manual Generator</UButton>
        </div>
      </UCard>
    </div>

    <div class="space-y-12">
      <h2 class="text-3xl font-bold text-center">How to use</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="space-y-2">
          <UBadge color="primary" variant="subtle" size="lg">Step 1</UBadge>
          <h3 class="font-bold">Add Dokployfile</h3>
          <p class="text-sm text-gray-500">
            Add a <code>Dokployfile.yml</code> to your repository root to define metadata like name, logo, and tags.
          </p>
        </div>
        <div class="space-y-2">
          <UBadge color="primary" variant="subtle" size="lg">Step 2</UBadge>
          <h3 class="font-bold">Link your Repo</h3>
          <p class="text-sm text-gray-500">
            Use this service to generate a direct link or a badge for your repository README.
          </p>
        </div>
        <div class="space-y-2">
          <UBadge color="primary" variant="subtle" size="lg">Step 3</UBadge>
          <h3 class="font-bold">Import in Dokploy</h3>
          <p class="text-sm text-gray-500">
            Users can copy the generated Base64 and paste it into Dokploy's "Import" section.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
