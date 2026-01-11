<script setup lang="ts">
import { Copy, Check, XCircle, Info, ArrowLeft, HelpCircle, Database, ExternalLink, Rocket, LayoutGrid, Terminal, FileCheck } from 'lucide-vue-next'

const compose = ref('');
const config = ref('');

const examples = {
  databasus: {
    name: 'Databasus',
    compose: `version: "3.8"

services:
  databasus:
    image: databasus/databasus:latest
    ports:
      - "4005"
    volumes:
      # Persistent data storage
      - ./databasus-data:/databasus-data
    restart: unless-stopped
    environment:
      # Optional: Set timezone
      - TZ=UTC
    healthcheck:
      test: [ "CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:4005" ]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  databasus-data:
    driver: local`,
    config: `[variables]
main_domain = "\${domain}"

[config]
env = []
mounts = []

[[config.domains]]
serviceName = "databasus"
port = 4005
host = "\${main_domain}"`
  },
  grafana: {
    name: 'Grafana',
    compose: `version: "3.8"

services:
  grafana:
    image: grafana/grafana-enterprise:9.5.20
    restart: unless-stopped
    volumes:
      - grafana-storage:/var/lib/grafana
volumes:
  grafana-storage: {}`,
    config: `[variables]
main_domain = "\${domain}"

[config]
[[config.domains]]
serviceName = "grafana"
port = 3000
host = "\${main_domain}"

[config.env]

[[config.mounts]]`
  }
}

function loadExample(key: keyof typeof examples) {
  compose.value = examples[key].compose;
  config.value = examples[key].config;
}

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
    <div class="mb-10 text-center">
      <h1 class="text-4xl font-extrabold mb-4 tracking-tight">Manual Template Generator</h1>
      <p class="text-xl text-muted-foreground">
        Paste your configuration files to generate a Dokploy import payload without needing a GitHub repository.
      </p>
    </div>

    <div class="mb-8 flex flex-col items-center gap-4 p-6 bg-secondary/30 rounded-2xl border border-border">
      <div class="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
        <Database class="w-4 h-4" />
        Quick Start with Examples
      </div>
      <div class="flex flex-wrap justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          class="rounded-full px-6 hover:bg-primary hover:text-primary-foreground transition-all"
          @click="loadExample('databasus')"
        >
          Databasus
        </Button>
        <Button
          variant="outline"
          size="sm"
          class="rounded-full px-6 hover:bg-primary hover:text-primary-foreground transition-all"
          @click="loadExample('grafana')"
        >
          Grafana
        </Button>
      </div>
      <p class="text-xs text-muted-foreground">Click an example to pre-fill the fields below and see how it works.</p>
    </div>

    <Tabs default-value="compose" class="w-full mb-10">
      <TabsList class="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="compose">docker-compose.yml</TabsTrigger>
        <TabsTrigger value="config">template.toml</TabsTrigger>
      </TabsList>
      
      <TabsContent value="compose" class="space-y-4 outline-none">
        <div class="flex flex-col gap-1.5 px-1">
          <div class="flex items-center gap-2">
            <Label class="text-lg font-bold">docker-compose.yml</Label>
            <Badge variant="secondary" class="font-normal text-[10px] px-1.5 h-4 uppercase">Required</Badge>
          </div>
          <p class="text-sm text-muted-foreground">
            The standard Docker Compose file that defines your multi-container application services, networks, and volumes.
          </p>
        </div>
        <Textarea
          v-model="compose"
          placeholder="version: '3.8'&#10;services:&#10;  grafana:&#10;    image: grafana/grafana-enterprise:9.5.20&#10;    restart: unless-stopped&#10;    volumes:&#10;      - grafana-storage:/var/lib/grafana&#10;volumes:&#10;  grafana-storage: {}"
          class="font-mono text-xs h-[450px] resize-none border-2 focus-visible:ring-primary bg-muted/20 shadow-inner"
        />
      </TabsContent>
      
      <TabsContent value="config" class="space-y-4 outline-none">
        <div class="flex flex-col gap-1.5 px-1">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Label class="text-lg font-bold">template.toml</Label>
              <Badge variant="outline" class="font-normal text-[10px] px-1.5 h-4 uppercase">Optional</Badge>
            </div>
            <a 
              href="https://github.com/Dokploy/templates" 
              target="_blank" 
              class="text-xs flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Learn Syntax
              <ExternalLink class="w-3.5 h-3.5" />
            </a>
          </div>
          <p class="text-sm text-muted-foreground">
            An optional configuration file for Dokploy to define environment variable inputs, metadata, and service-specific settings.
          </p>
        </div>
        <Textarea
          v-model="config"
          placeholder="[variables]&#10;main_domain = '${domain}'&#10;&#10;[config]&#10;[[config.domains]]&#10;serviceName = 'grafana'&#10;port = 3000&#10;host = '${main_domain}'&#10;&#10;[config.env]&#10;&#10;[[config.mounts]]"
          class="font-mono text-xs h-[450px] resize-none border-2 focus-visible:ring-primary bg-muted/20 shadow-inner"
        />
      </TabsContent>
    </Tabs>

    <div v-if="base64" class="space-y-10">
      <Separator />
      
      <section class="space-y-6">
        <div class="flex justify-between items-end">
          <div>
            <h2 class="text-2xl font-bold">Generated Result</h2>
            <p class="text-sm text-muted-foreground">Copy this payload to use in the Dokploy dashboard.</p>
          </div>
          <Button
            @click="copy(base64)"
            :variant="copied ? 'outline' : 'default'"
            size="lg"
            class="gap-2 transition-all duration-300"
          >
            <Check v-if="copied" class="w-5 h-5 text-green-500" />
            <Copy v-else class="w-5 h-5" />
            {{ copied ? 'Copied Successfully!' : 'Copy Payload' }}
          </Button>
        </div>
        
        <Textarea
          readonly
          :model-value="base64"
          class="font-mono text-xs h-32 bg-muted/50 cursor-text"
        />
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2 space-y-6">
          <h3 class="font-bold text-xl flex items-center gap-2">
            <Rocket class="w-6 h-6 text-primary" />
            Launch Instructions
          </h3>
          
          <div class="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
            <!-- Step 1 -->
            <div class="relative flex items-start gap-6 group">
              <div class="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-primary text-primary font-bold shadow-sm transition-transform group-hover:scale-110">
                1
              </div>
              <div class="pl-14">
                <h4 class="font-bold text-foreground flex items-center gap-2">
                  Copy the Payload 
                  <LayoutGrid class="w-4 h-4 text-muted-foreground/50" />
                </h4>
                <p class="text-sm text-muted-foreground leading-relaxed mt-1">
                  Click the <strong class="text-foreground">"Copy Payload"</strong> button above. This encodes your Compose and TOML files into a single Base64 string that Dokploy understands.
                </p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="relative flex items-start gap-6 group">
              <div class="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-border text-muted-foreground font-bold shadow-sm group-hover:border-primary group-hover:text-primary transition-colors">
                2
              </div>
              <div class="pl-14">
                <h4 class="font-bold text-foreground flex items-center gap-2">
                  Navigate to Dokploy
                  <Terminal class="w-4 h-4 text-muted-foreground/50" />
                </h4>
                <p class="text-sm text-muted-foreground leading-relaxed mt-1">
                  Open your Dokploy dashboard, go to your project, and click <strong class="text-foreground">"Create Service"</strong> → <strong class="text-foreground">"Compose"</strong>.
                </p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="relative flex items-start gap-6 group">
              <div class="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-border text-muted-foreground font-bold shadow-sm group-hover:border-primary group-hover:text-primary transition-colors">
                3
              </div>
              <div class="pl-14">
                <h4 class="font-bold text-foreground flex items-center gap-2">
                  Import Template
                  <FileCheck class="w-4 h-4 text-muted-foreground/50" />
                </h4>
                <p class="text-sm text-muted-foreground leading-relaxed mt-1">
                  In the service creation modal, find the <strong class="text-foreground">"Import"</strong> section. Paste the Base64 string into the input and click <strong class="text-foreground">"Import"</strong>.
                </p>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="relative flex items-start gap-6 group">
              <div class="absolute left-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20">
                4
              </div>
              <div class="pl-14">
                <h4 class="font-bold text-foreground">Deploy Application</h4>
                <p class="text-sm text-muted-foreground leading-relaxed mt-1">
                  Review the automatically populated settings and environment variables, then click <strong class="text-foreground">"Deploy"</strong>. Your stack is ready!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="lintResults.length > 0" class="space-y-6">
          <h3 class="font-bold text-xl flex items-center gap-2">
            <Check class="w-6 h-6 text-green-500" />
            Checks
          </h3>
          <div class="space-y-4">
            <Alert v-for="(lint, i) in lintResults" :key="i" :variant="lint.level === 'error' ? 'destructive' : 'default'" class="border-2 shadow-sm">
              <XCircle v-if="lint.level === 'error'" class="w-4 h-4" />
              <Info v-else class="w-4 h-4" />
              <AlertTitle class="capitalize font-bold">{{ lint.level }}</AlertTitle>
              <AlertDescription class="text-xs">
                {{ lint.message }}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    </div>

    <div class="mt-16 pt-8 border-t text-center">
      <Button variant="ghost" as-child class="gap-2 text-muted-foreground hover:text-foreground">
        <NuxtLink to="/">
          <ArrowLeft class="w-4 h-4" />
          Back to Template Home
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
