<script setup lang="ts">
import type { AvatarImageProps } from "reka-ui"
import { AvatarImage } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"

const props = defineProps<AvatarImageProps & { class?: HTMLAttributes["class"] }>()
</script>

<template>
  <AvatarImage v-bind="props" :class="cn('h-full w-full object-cover', props.class)">
    <slot />
  </AvatarImage>
</template>
