<script setup>
import "xterminal/dist/xterminal.css";
import XTerminal from "xterminal";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { setupShell } from "../composables/shell";

const target = ref(null);
const terminal = ref();

onMounted(() => {
    const term = new XTerminal();
    const sh = setupShell(term);
    term.mount(target.value);
    sh.init();
    terminal.value = term;
    onBeforeUnmount(() => term.dispose());
    sh.run();
});

</script>

<template>
    <div ref="target" class="h-full w-full"></div>
</template>

<style>
.spinner:after {
    animation: changeContent 0.8s linear infinite;
    content: "⠋";
}

@keyframes changeContent {
    10% {
        content: "⠙";
    }

    20% {
        content: "⠹";
    }

    30% {
        content: "⠸";
    }

    40% {
        content: "⠼";
    }

    50% {
        content: "⠴";
    }

    60% {
        content: "⠦";
    }

    70% {
        content: "⠧";
    }

    80% {
        content: "⠇";
    }

    90% {
        content: "⠏";
    }
}</style>