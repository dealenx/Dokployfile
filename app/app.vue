<script setup lang="ts">
import { ExternalLink } from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col">
    <NuxtRouteAnnouncer />
    <header class="border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div class="max-w-5xl mx-auto px-4 w-full h-16 flex items-center justify-between">
        <NuxtLink to="/" class="font-bold text-xl tracking-tight">
          Dokployfile
        </NuxtLink>
        <nav>
          <a 
            href="https://dokploy.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Dokploy
            <ExternalLink class="w-3 h-3" />
          </a>
        </nav>
      </div>
    </header>
    
    <main class="flex-grow">
      <NuxtPage />
    </main>

    <footer class="border-t py-8">
      <div class="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center gap-4">
        <p class="text-sm text-muted-foreground text-center">
          Generator by <a href="https://github.com/dealenx" target="_blank" rel="noopener noreferrer" class="font-medium text-foreground hover:underline underline-offset-4 inline-flex items-center gap-1">
            dealenx
            <ExternalLink class="w-3 h-3" />
          </a>
        </p>
        <p class="text-xs text-muted-foreground/50">
          Not affiliated with Dokploy.
        </p>
      </div>
    </footer>
  </div>
</template>
