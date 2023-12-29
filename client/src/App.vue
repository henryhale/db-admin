<script setup>
import BaseTerminal from "./components/BaseTerminal.vue";
</script>

<template>
	<div class="w-full h-full relative">
		<nav>
			<div class="brand">
				<svg class="w-6 h-6">
					<use href="#cli"></use>
				</svg>
				<span class="text-base font-semibold">DB-Admin</span>
			</div>
			<div class="flex-grow"></div>
			<div class="py-1 pr-2">
				<a href="#" title="View source code on GitHub">
					<svg>
						<use href="#code"></use>
					</svg>
					<span class="text-base">GitHub</span>
				</a>
			</div>
		</nav>
		<main>
			<BaseTerminal class="flex-grow" />
		</main>
	</div>
</template>

<style scoped>
nav {
	@apply fixed top-0 right-0 left-0 z-10 border-b border-slate-600 flex bg-slate-700 text-slate-200;
}

.brand {
	@apply flex items-center justify-center space-x-3 py-1.5 md:py-3 px-3 text-slate-800 bg-green-300;
}

a {
	@apply inline-flex items-center justify-center space-x-1 transition-all hover:bg-slate-600 border border-slate-600 hover:border-slate-500 hover:text-green-300 py-2 md:py-4 px-4 md:px-6;
}

a>svg {
	@apply w-4 h-4 md:w-5 md:h-5 inline-block;
}

main {
	@apply pt-12 md:pt-[4.1rem] h-full flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-300;
}
</style>
