<script setup lang="ts">
	import CourseView from '@/components/CourseView.vue';
	import CourseFocus from '@/components/layout/CourseFocus.vue';

	import FastBackward from '@/components/icons/FastBackward.vue';
	import FastForward from '@/components/icons/FastForward.vue';

	import { ref, onMounted, watch } from 'vue';

	import type { Course } from 'celcat';

	import { loadWeek, focusedCourse } from '@/scripts/timetable';
	import { toFormatJJMoisAAAA } from '@/scripts/utils';


	const isMobileViewport = ref<boolean>(false);

	const groups: Record<string, string> = {
		'1A1': "G1-QJ2DMFYC5987",
		'1A2': "G1-PW2GUKMM5988",
		'1B1': "G1-HN2CHYNX5990",
		'1B2': "G1-QW2SJTJH5991",
		'2A1': "G1-QS2QEJVB5994",
		'2A2': "G1-EG2LDXAM5995",
		'2B1': "G1-AE2BGJHX5997",
		'2B2': "G1-TM2VJCBU5998"
	}

	const group_id = ref<string>(groups["1A2"]!);

	const weekdays = [
		'Lundi',
		'Mardi',
		'Mercredi',
		'Jeudi',
		'Vendredi',
		'Samedi',
		'Dimanche'
	]

	const offset = ref<number>(0)
	const viewport = ref<number>(5)

	const days = ref<Course[][]>([[], [], [], [], [], [], []]);

	const day = ref<Date>(new Date());


	onMounted(async () => {
		const mediaQuery = window.matchMedia('(max-width: 720px)');
		isMobileViewport.value = mediaQuery.matches;

		const handleChange = (e: MediaQueryListEvent) => {
			isMobileViewport.value = e.matches;
		};
		mediaQuery.addEventListener('change', handleChange);

		days.value = await loadWeek(group_id.value, day.value)
	});

	watch(isMobileViewport, () => {
		viewport.value = isMobileViewport.value ? 1 : 5
		offset.value = isMobileViewport.value ? day.value.getDay() - 1 : 0
	})

	watch(group_id, async () => {
		days.value = await loadWeek(group_id.value, day.value)
	})


	async function fwd() {
		offset.value += 1

		if (offset.value > 5) {
			offset.value = 0
			day.value = new Date(day.value.getFullYear(), day.value.getMonth(), day.value.getDate() + 7);
		}

		days.value = await loadWeek(group_id.value, day.value);
	}

	async function bwd() {
		offset.value -= 1

		if (offset.value < 0) {
			offset.value = 5
			day.value = new Date(day.value.getFullYear(), day.value.getMonth(), day.value.getDate() - 7);
		}

		days.value = await loadWeek(group_id.value, day.value);
	}

	async function ffwd() {
		let _max: number = isMobileViewport.value ? 1 : 6

		for (let i = 0; i < _max; i++) {
			await fwd()
		}
	}

	async function fbwd() {
		let _max: number = isMobileViewport.value ? 1 : 6

		for (let i = 0; i < _max; i++) {
			await bwd()
		}
	}

	function sectionDate(index: number) {
		return new Date(day.value.getTime() + (index + offset.value - day.value.getDay() + 1) * 24 * 3600 * 1000 );
	}

	function isSameWeek(date: Date, other: Date = new Date()) {
		const getMonday = (d: Date) => {
			const copy = new Date(d.getFullYear(), d.getMonth(), d.getDate());
			const dayOfWeek = copy.getDay();
			const diff = (dayOfWeek === 0) ? -6 : 1 - dayOfWeek; // convert Sunday(0) to previous Monday
			copy.setDate(copy.getDate() + diff);
			copy.setHours(0,0,0,0);
			return copy;
		}

		const a = getMonday(date);
		const b = getMonday(other);

		return a.getFullYear() === b.getFullYear() && a.getTime() === b.getTime();
	}
</script>
<template>
	<CourseFocus v-if="focusedCourse" :course="focusedCourse" />

	<header class="p-8 space-y-6 max-sm:space-y-4">
		<div class="flex items-center justify-center gap-2">
			<img src="@/assets/logo.svg" class="block w-10 h-10 max-sm:w-5 max-sm:h-5" /> <h1 class="select-none text-4xl font-bold max-sm:text-xl">BetterCelcat</h1>
		</div>
		<div class="flex gap-2 justify-center">
			<button class="text-white text-sm font-semibold rounded-full px-3 py-2 duration-150 hover:scale-105" @click="fbwd"><FastBackward className="fill-slate-950 w-6 h-6 dark:fill-white" /></button>

			<select v-model="group_id" class="block bg-slate-500/15 text-sm font-bold rounded-full px-4 py-2">
				<option class="text-slate-900 text-sm text-center font-semibold" v-for="group in Object.keys(groups)" :value="groups[group]">{{ group }}</option>
			</select>

			<button class="text-white text-sm font-semibold rounded-full px-3 py-2 duration-150 hover:scale-105" @click="ffwd"><FastForward className="fill-slate-950 w-6 h-6 dark:fill-white" /></button>
		</div>
	</header>
	<main class="flex px-4 pb-4 gap-2 md:p-8">
		<section v-for="(item, index) in viewport" :key="index + offset" class="flex-1 flex flex-col">
			<div class="text-xl text-center mb-8 -space-y-1 max-sm:mb-4">
				<p class="font-bold">{{ weekdays[index + offset] }}</p>
				<p v-if="!isSameWeek(sectionDate(index))" class="text-sm font-semibold opacity-50">{{ sectionDate(index).getFullYear() == 2026 ? toFormatJJMoisAAAA(sectionDate(index)).full : toFormatJJMoisAAAA(sectionDate(index)).month  }}</p>
			</div>
			<CourseView v-for="(course, idx) in (days[index + offset] || [])" :key="(course.uid || '') + '-' + (new Date(course.start)).getTime()" :course="course" :index="idx" />
		</section>
	</main>
</template>