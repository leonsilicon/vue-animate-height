<script setup lang="ts">
import { outdent } from 'outdent';
import AnimateHeight from 'vue-animate-height';
import hljs from 'highlight.js';
import { onMounted } from 'vue';

const height = $ref(0);
const height2 = $ref('auto');
const height3 = $ref('auto');
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
	<div class="content">
		<h1>Vue Animate Height</h1>

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
			<a href="https://github.com/leonzalion/vue-animate-height">GitHub</a>.
		</p>

		<h3>Usage</h3>
		<p>
			Import the component, and use it to wrap content whose height you want to
			animate.
		</p>
		<pre class="text-left"><code>{{ exampleCode }}</code></pre>
	</div>

	<div>
		<h3>Demo, starting height = 0</h3>
		<p>
			Current Height: <b>{{ height !== null ? height : 'null' }}</b>
		</p>
		<p class="">Set height to:</p>
		<div class="buttons">
			<button class="btn btn-sm" @click="height = 0">0</button>
			<button class="btn btn-sm" @click="height = 100">100</button>
			<button class="btn btn-sm" @click="height = 200">200</button>
			<button class="btn btn-sm" @click="height = 300">300</button>
			<button class="btn btn-sm" @click="height = 'auto'">auto</button>
		</div>
		<AnimateHeight :height="height" class="demo demo-1">
			<div class="demo-content">
				<p>
					It looked serious, but we in California, like everywhere else, were
					not alarmed. We were sure that the bacteriologists would find a way to
					overcome this new germ, just as they had overcome other germs in the
					past. But the trouble was the astonishing quickness with which this
					germ destroyed human beings, and the fact that it inevitably killed
					any human body it entered. No one ever recovered. There was the old
					Asiatic cholera, when you might eat dinner with a well man in the
					evening, and the next morning, if you got up early enough, you would
					see him being hauled by your window in the death-cart. But this new
					plague was quicker than that&mdash;much quicker.
				</p>
				<input
					class="form-control"
					type="text"
					placeholder="Test for focus"
					@focus="() => console.log('Input 1 focused')"
				/>
				<p>
					From the moment of the first signs of it, a man would be dead in an
					hour. Some lasted for several hours. Many died within ten or fifteen
					minutes of the appearance of the first signs.
				</p>
				<p>
					The heart began to beat faster and the heat of the body to increase.
					Then came the scarlet rash, spreading like wildfire over the face and
					body. Most persons never noticed the increase in heat and heart-beat,
					and the first they knew was when the scarlet rash came out. Usually,
					they had convulsions at the time of the appearance of the rash. But
					these convulsions did not last long and were not very severe. If one
					lived through them, he became perfectly quiet, and only did he feel a
					numbness swiftly creeping up his body from the feet. The heels became
					numb first, then the legs, and hips, and when the numbness reached as
					high as his heart he died. They did not rave or sleep. Their minds
					always remained cool and calm up to the moment their heart numbed and
					stopped. And another strange thing was the rapidity of decomposition.
					No sooner was a person dead than the body seemed to fall to pieces, to
					fly apart, to melt away even as you looked at it. That was one of the
					reasons the plague spread so rapidly. All the billions of germs in a
					corpse were so immediately released.
				</p>
			</div>
		</AnimateHeight>

		<h3>Demo, starting height = auto</h3>
		<p>
			For this example, duration is set to 500ms. If you open up the console,
			you&apos;ll see <code>onAnimationEnd</code> and
			<code>onAnimationStart</code> callbacks. <code>animateOpacity</code> is
			set to true.
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
			class-name="demo demo-2"
			animate-opacity
			@animation-end="
				(params) => {
					console.log('React Animate Height - animation started', params);
				}
			"
			@animation-start="
				(params) => {
					console.log('Vue Animate Height - animation ended', params);
				}
			"
		>
			<div class="demo-content">
				<p>
					It looked serious, but we in California, like everywhere else, were
					not alarmed. We were sure that the bacteriologists would find a way to
					overcome this new germ, just as they had overcome other germs in the
					past. But the trouble was the astonishing quickness with which this
					germ destroyed human beings, and the fact that it inevitably killed
					any human body it entered. No one ever recovered. There was the old
					Asiatic cholera, when you might eat dinner with a well man in the
					evening, and the next morning, if you got up early enough, you would
					see him being hauled by your window in the death-cart. But this new
					plague was quicker than that&mdash;much quicker.
				</p>
				<input
					class="form-control"
					type="text"
					placeholder="Test for focus"
					@focus="console.log('Input 2 focused')"
				/>
				<p>
					From the moment of the first signs of it, a man would be dead in an
					hour. Some lasted for several hours. Many died within ten or fifteen
					minutes of the appearance of the first signs.
				</p>
				<p>
					The heart began to beat faster and the heat of the body to increase.
					Then came the scarlet rash, spreading like wildfire over the face and
					body. Most persons never noticed the increase in heat and heart-beat,
					and the first they knew was when the scarlet rash came out. Usually,
					they had convulsions at the time of the appearance of the rash. But
					these convulsions did not last long and were not very severe. If one
					lived through them, he became perfectly quiet, and only did he feel a
					numbness swiftly creeping up his body from the feet. The heels became
					numb first, then the legs, and hips, and when the numbness reached as
					high as his heart he died. They did not rave or sleep. Their minds
					always remained cool and calm up to the moment their heart numbed and
					stopped. And another strange thing was the rapidity of decomposition.
					No sooner was a person dead than the body seemed to fall to pieces, to
					fly apart, to melt away even as you looked at it. That was one of the
					reasons the plague spread so rapidly. All the billions of germs in a
					corpse were so immediately released.
				</p>
			</div>
		</AnimateHeight>

		<h3>Demo, with transition delay</h3>
		<p>
			Here you can see <code>delay</code> prop in action. Parent&apos;s div
			height is set to 500px.
		</p>
		<p>
			Current Height: <b>{{ height3 }}</b
			><br />
			Current Delay: <b>{{ delay }}</b>
		</p>
		<p>Set delay to:</p>
		<div class="buttons">
			<button class="btn btn-sm" @click="delay = 0">0 (default)</button>
			<button class="btn btn-sm" @click="delay = 300">300</button>
			<button class="btn btn-sm" @click="delay = 600">600</button>
			<button class="btn btn-sm" @click="delay = 1000">1000</button>
		</div>
		<p class="">Set height to:</p>
		<div class="buttons">
			<button class="btn btn-sm" @click="height3 = 0">0</button>
			<button class="btn btn-sm" @click="height3 = 100">100</button>
			<button class="btn btn-sm" @click="height3 = 200">200</button>
			<button class="btn btn-sm" @click="height3 = 300">300</button>
			<button class="btn btn-sm" @click="height3 = 'auto'">auto</button>
			<br />
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
						It looked serious, but we in California, like everywhere else, were
						not alarmed. We were sure that the bacteriologists would find a way
						to overcome this new germ, just as they had overcome other germs in
						the past. But the trouble was the astonishing quickness with which
						this germ destroyed human beings, and the fact that it inevitably
						killed any human body it entered. No one ever recovered. There was
						the old Asiatic cholera, when you might eat dinner with a well man
						in the evening, and the next morning, if you got up early enough,
						you would see him being hauled by your window in the death-cart. But
						this new plague was quicker than that&mdash;much quicker.
					</p>
					<input
						class="form-control"
						type="text"
						placeholder="Test for focus"
						@focus="() => console.log('Input 2 focused')"
					/>
					<p>
						From the moment of the first signs of it, a man would be dead in an
						hour. Some lasted for several hours. Many died within ten or fifteen
						minutes of the appearance of the first signs.
					</p>
					<p>
						The heart began to beat faster and the heat of the body to increase.
						Then came the scarlet rash, spreading like wildfire over the face
						and body. Most persons never noticed the increase in heat and
						heart-beat, and the first they knew was when the scarlet rash came
						out. Usually, they had convulsions at the time of the appearance of
						the rash. But these convulsions did not last long and were not very
						severe. If one lived through them, he became perfectly quiet, and
						only did he feel a numbness swiftly creeping up his body from the
						feet. The heels became numb first, then the legs, and hips, and when
						the numbness reached as high as his heart he died. They did not rave
						or sleep. Their minds always remained cool and calm up to the moment
						their heart numbed and stopped. And another strange thing was the
						rapidity of decomposition. No sooner was a person dead than the body
						seemed to fall to pieces, to fly apart, to melt away even as you
						looked at it. That was one of the reasons the plague spread so
						rapidly. All the billions of germs in a corpse were so immediately
						released.
					</p>
				</div>
			</AnimateHeight>
		</div>
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
