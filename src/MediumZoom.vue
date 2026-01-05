<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vitepress';

import mediumZoom, {
  type Zoom,
  type ZoomSelector,
  type ZoomOptions
} from 'medium-zoom';

const props = withDefaults(
  defineProps<{
    selector?: ZoomSelector;
    options?: ZoomOptions;
    zIndex?: number;
  }>(),
  {
    selector: '.vp-doc img',
    options: () => ({}),
    zIndex: 999
  }
);

let zoom: Zoom | undefined;
let timeoutId: ReturnType<typeof setTimeout> | undefined;

const router = useRouter();
router.onAfterRouteChange = setupMediumZoom;

onMounted(setupMediumZoom);
onBeforeUnmount(() => {
  clearTimeout(timeoutId);
  if (zoom) {
    zoom.detach();
    zoom.close();
  }
});

function setupMediumZoom() {
  nextTick(() => {
    if (zoom) {
      zoom.detach();
      zoom.close();
      zoom = undefined;
    }
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      zoom = mediumZoom(props.selector, {
        background: 'var(--vp-c-bg)',
        ...props.options
      });
    }, 100);
  });
}
</script>

<style>
/* https://github.com/francoischalifour/medium-zoom#debugging */
.medium-zoom-overlay,
.medium-zoom-image--opened {
  z-index: v-bind(zIndex);
}
</style>
