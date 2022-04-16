<script setup lang="ts">
import hljs from 'highlight.js';
import { outdent } from 'outdent';
import { onMounted } from 'vue';
import AnimateHeight from 'vue-animate-height';

const height = $ref<string | number>(0);
const height2 = $ref<string | number>('auto');
const height3 = $ref<string | number>('auto');
const delay = $ref(0);

const { console } = window;

const exampleCode = outdent`
	import AnimateHeight from 'vue-animate-height';

	<AnimateHeight
	  :duration='500'
	  height='auto'
	>
	  <h1>Your content goes here</h1>
	  <p>Put as many React or HTML components here.</p>
	</AnimateHeight>
`;

onMounted(() => {
	hljs.highlightAll();
});
</script>

<template>
	<div class="p-8 column items-center">
		<div class="max-w-6xl">
			<div class="column gap-4">
				<h1 class="text-4xl">Vue Animate Height</h1>

				<p>
					Lightweight Vue component for animating height using CSS transitions.
					Slide up/down the element, and to any specific height. Check the
					<a href="#demo">demo</a> lower on this page.
				</p>
				<p>
					CSS classes are applied in specific animation states, check
					<code>animationStateClasses</code> prop.
				</p>
				<p>
					Detailed documentation is available on
					<a
						target="_blank"
						href="https://github.com/leonzalion/vue-animate-height"
						>GitHub</a
					>.
				</p>

				<h3>Usage</h3>
				<p>
					Import the component, and use it to wrap content whose height you want
					to animate.
				</p>
				<div class="border-1 border-gray-300 rounded-md p-1">
					<pre><code>{{ exampleCode }}</code></pre>
				</div>
			</div>

			<div id="demo" class="mt-4">
				<h3>Demo, starting height = 0</h3>
				<p>
					Current Height: <b>{{ height !== null ? height : 'null' }}</b>
				</p>
				<p>Set height to:</p>
				<div class="buttons">
					<button class="btn" @click="height = 0">0</button>
					<button class="btn" @click="height = 100">100</button>
					<button class="btn" @click="height = 200">200</button>
					<button class="btn" @click="height = 300">300</button>
					<button class="btn" @click="height = 'auto'">auto</button>
				</div>
				<AnimateHeight :height="height" class="demo demo-1">
					<div class="demo-content">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Pellentesque molestie fringilla lobortis. Ut luctus, nisi mattis
							sagittis cursus, magna urna efficitur felis, eu efficitur felis
							sem vitae tortor. Curabitur interdum nisi ut ultricies tincidunt.
							Phasellus consequat ultricies tincidunt. Ut pellentesque justo et
							ante accumsan, consectetur tempus libero consectetur. Fusce
							molestie a urna eu hendrerit. Donec molestie lacinia sem non
							maximus. Nulla quis lorem vel turpis molestie euismod non id mi.
							Vestibulum placerat lobortis volutpat. Sed auctor mattis ipsum
							cursus volutpat. Nunc vel elit mi. Ut rhoncus ex rhoncus orci
							aliquet molestie. Aliquam et orci at ligula porttitor imperdiet.
							Nullam at sollicitudin dolor, eget ullamcorper mauris.
						</p>
						<input
							class="form-control"
							type="text"
							placeholder="Test for focus"
							@focus="() => console.log('Input 1 focused')"
						/>
						<p>
							Donec rhoncus vulputate eros, vitae consectetur est lobortis a.
							Nam et metus tincidunt, posuere arcu non, iaculis est. Donec
							feugiat ipsum sit amet nibh dictum tempus. Phasellus nec fermentum
							arcu, ac facilisis lorem.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
							erat volutpat. Nam semper eget velit sed efficitur. Suspendisse
							aliquam malesuada augue, nec aliquam diam posuere id. Vestibulum
							ut vestibulum arcu. Maecenas ex ipsum, lacinia vitae metus non,
							efficitur luctus nunc. Morbi ullamcorper porttitor rhoncus. Aenean
							eleifend nunc a urna consectetur, egestas feugiat justo sodales.
							Integer ut sem ac purus iaculis iaculis eu id nibh. Morbi mauris
							sapien, ultrices sit amet sodales in, aliquet rhoncus massa. Sed
							tristique ex quis ante malesuada, nec rhoncus dolor consectetur.
							Nulla ipsum ex, suscipit tincidunt ipsum nec, dignissim
							scelerisque eros. Curabitur quis augue elit. Morbi porta elit in
							urna consectetur scelerisque. Proin vel iaculis lectus, non
							bibendum nisi. Maecenas convallis nibh ut risus rhoncus, sit amet
							tincidunt massa consequat. Fusce dignissim, turpis ut dignissim
							mattis, nunc orci dignissim lacus, in feugiat lectus turpis ut
							turpis. Aenean pharetra, arcu quis luctus scelerisque, nibh ligula
							auctor massa, sed ullamcorper tortor mauris tempus quam.
						</p>
					</div>
				</AnimateHeight>

				<h3>Demo, starting height = auto</h3>
				<p>
					For this example, duration is set to 500ms. If you open up the
					console, you&apos;ll see <code>onAnimationEnd</code> and
					<code>onAnimationStart</code> callbacks.
					<code>animateOpacity</code> is set to true.
				</p>
				<p>
					Current Height: <b>{{ height !== null ? height2 : 'null' }}</b>
				</p>
				<p class="">Set height to:</p>
				<div class="buttons">
					<button class="btn btn-sm" @click="height2 = 0">0</button>
					<button class="btn btn-sm" @click="height2 = 100">100</button>
					<button class="btn btn-sm" @click="height2 = 200">200</button>
					<button class="btn btn-sm" @click="height2 = 300">300</button>
					<button class="btn btn-sm" @click="height2 = 'auto'">auto</button>
				</div>
				<AnimateHeight
					:height="height2"
					:duration="500"
					class="demo demo-2"
					animate-opacity
					@animation-end="
				(params: unknown) => {
					console.log('Vue Animate Height - animation started', params);
				}
			"
					@animation-start="
				(params: unknown) => {
					console.log('Vue Animate Height - animation ended', params);
				}
			"
				>
					<div class="demo-content">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Pellentesque molestie fringilla lobortis. Ut luctus, nisi mattis
							sagittis cursus, magna urna efficitur felis, eu efficitur felis
							sem vitae tortor. Curabitur interdum nisi ut ultricies tincidunt.
							Phasellus consequat ultricies tincidunt. Ut pellentesque justo et
							ante accumsan, consectetur tempus libero consectetur. Fusce
							molestie a urna eu hendrerit. Donec molestie lacinia sem non
							maximus. Nulla quis lorem vel turpis molestie euismod non id mi.
							Vestibulum placerat lobortis volutpat. Sed auctor mattis ipsum
							cursus volutpat. Nunc vel elit mi. Ut rhoncus ex rhoncus orci
							aliquet molestie. Aliquam et orci at ligula porttitor imperdiet.
							Nullam at sollicitudin dolor, eget ullamcorper mauris.
						</p>
						<input
							class="form-control"
							type="text"
							placeholder="Test for focus"
							@focus="console.log('Input 2 focused')"
						/>
						<p>
							Donec rhoncus vulputate eros, vitae consectetur est lobortis a.
							Nam et metus tincidunt, posuere arcu non, iaculis est. Donec
							feugiat ipsum sit amet nibh dictum tempus. Phasellus nec fermentum
							arcu, ac facilisis lorem.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
							erat volutpat. Nam semper eget velit sed efficitur. Suspendisse
							aliquam malesuada augue, nec aliquam diam posuere id. Vestibulum
							ut vestibulum arcu. Maecenas ex ipsum, lacinia vitae metus non,
							efficitur luctus nunc. Morbi ullamcorper porttitor rhoncus. Aenean
							eleifend nunc a urna consectetur, egestas feugiat justo sodales.
							Integer ut sem ac purus iaculis iaculis eu id nibh. Morbi mauris
							sapien, ultrices sit amet sodales in, aliquet rhoncus massa. Sed
							tristique ex quis ante malesuada, nec rhoncus dolor consectetur.
							Nulla ipsum ex, suscipit tincidunt ipsum nec, dignissim
							scelerisque eros. Curabitur quis augue elit. Morbi porta elit in
							urna consectetur scelerisque. Proin vel iaculis lectus, non
							bibendum nisi. Maecenas convallis nibh ut risus rhoncus, sit amet
							tincidunt massa consequat. Fusce dignissim, turpis ut dignissim
							mattis, nunc orci dignissim lacus, in feugiat lectus turpis ut
							turpis. Aenean pharetra, arcu quis luctus scelerisque, nibh ligula
							auctor massa, sed ullamcorper tortor mauris tempus quam.
						</p>
					</div>
				</AnimateHeight>

				<h3>Demo, with transition delay</h3>
				<p>
					Here you can see the <code>delay</code> prop in action. The
					parent&apos;s div height is set to 500px.
				</p>
				<p>
					Current Height: <b>{{ height3 }}</b
					><br />
					Current Delay: <b>{{ delay }}</b>
				</p>
				<p>Set delay to:</p>
				<div class="buttons">
					<button class="btn" @click="delay = 0">0 (default)</button>
					<button class="btn" @click="delay = 300">300</button>
					<button class="btn" @click="delay = 600">600</button>
					<button class="btn" @click="delay = 1000">1000</button>
				</div>
				<p class="">Set height to:</p>
				<div class="buttons">
					<button class="btn btn-sm" @click="height3 = 0">0</button>
					<button class="btn btn-sm" @click="height3 = 100">100</button>
					<button class="btn btn-sm" @click="height3 = 200">200</button>
					<button class="btn btn-sm" @click="height3 = 300">300</button>
					<button class="btn btn-sm" @click="height3 = 'auto'">auto</button>
				</div>
				<div class="buttons">
					<button class="btn btn-sm" @click="height3 = '50%'">
						50% (of the parent height)
					</button>
					<button class="btn btn-sm" @click="height3 = '100%'">
						100% (of the parent height)
					</button>
				</div>
				<div class="demo-3-wrapper">
					<AnimateHeight
						:height="height3"
						:delay="delay"
						:duration="500"
						class="demo demo-3"
					>
						<div class="demo-content">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Pellentesque molestie fringilla lobortis. Ut luctus, nisi mattis
								sagittis cursus, magna urna efficitur felis, eu efficitur felis
								sem vitae tortor. Curabitur interdum nisi ut ultricies
								tincidunt. Phasellus consequat ultricies tincidunt. Ut
								pellentesque justo et ante accumsan, consectetur tempus libero
								consectetur. Fusce molestie a urna eu hendrerit. Donec molestie
								lacinia sem non maximus. Nulla quis lorem vel turpis molestie
								euismod non id mi. Vestibulum placerat lobortis volutpat. Sed
								auctor mattis ipsum cursus volutpat. Nunc vel elit mi. Ut
								rhoncus ex rhoncus orci aliquet molestie. Aliquam et orci at
								ligula porttitor imperdiet. Nullam at sollicitudin dolor, eget
								ullamcorper mauris.
							</p>
							<input
								class="form-control"
								type="text"
								placeholder="Test for focus"
								@focus="() => console.log('Input 2 focused')"
							/>
							<p>
								Donec rhoncus vulputate eros, vitae consectetur est lobortis a.
								Nam et metus tincidunt, posuere arcu non, iaculis est. Donec
								feugiat ipsum sit amet nibh dictum tempus. Phasellus nec
								fermentum arcu, ac facilisis lorem.
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
								erat volutpat. Nam semper eget velit sed efficitur. Suspendisse
								aliquam malesuada augue, nec aliquam diam posuere id. Vestibulum
								ut vestibulum arcu. Maecenas ex ipsum, lacinia vitae metus non,
								efficitur luctus nunc. Morbi ullamcorper porttitor rhoncus.
								Aenean eleifend nunc a urna consectetur, egestas feugiat justo
								sodales. Integer ut sem ac purus iaculis iaculis eu id nibh.
								Morbi mauris sapien, ultrices sit amet sodales in, aliquet
								rhoncus massa. Sed tristique ex quis ante malesuada, nec rhoncus
								dolor consectetur. Nulla ipsum ex, suscipit tincidunt ipsum nec,
								dignissim scelerisque eros. Curabitur quis augue elit. Morbi
								porta elit in urna consectetur scelerisque. Proin vel iaculis
								lectus, non bibendum nisi. Maecenas convallis nibh ut risus
								rhoncus, sit amet tincidunt massa consequat. Fusce dignissim,
								turpis ut dignissim mattis, nunc orci dignissim lacus, in
								feugiat lectus turpis ut turpis. Aenean pharetra, arcu quis
								luctus scelerisque, nibh ligula auctor massa, sed ullamcorper
								tortor mauris tempus quam.
							</p>
						</div>
					</AnimateHeight>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="postcss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

a {
	@apply text-red-500 hover:text-red-700;
}

.btn {
	@apply relative py-0.5 px-4 bg-black rounded-sm text-white hover:bg-blue-500 transition-all active:top-0.5;
}

.buttons {
	@apply row gap-2 text-sm my-2;
}

h3 {
	@apply text-red-500 text-3xl mt-9;
}

.demo {
	@apply border-2;
}

.demo-content {
	@apply p-4;
}

input {
	@apply my-4 px-4 py-2 border-2  rounded-md border-blue-200 focus:border-blue-300;
}

.demo-3-wrapper {
	height: 500px;
}
</style>
