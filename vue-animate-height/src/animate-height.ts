import classnames from 'classnames';
import omit from 'just-omit';
import type { CSSProperties, PropType } from 'vue';
import {
	defineComponent,
	h,
	onBeforeUnmount,
	onBeforeUpdate,
	onMounted,
	ref,
	watch,
} from 'vue';

import type { AnimationStateClasses } from '~/types.js';
import {
	cancelAnimationFrames,
	startAnimationHelper,
} from '~/utils/animation.js';
import { isNumber, isPercentage } from '~/utils/validation.js';

const ANIMATION_STATE_CLASSES = {
	animating: 'vah-animating',
	animatingUp: 'vah-animating--up',
	animatingDown: 'vah-animating--down',
	animatingToHeightZero: 'vah-animating--to-height-zero',
	animatingToHeightAuto: 'vah-animating--to-height-auto',
	animatingToHeightSpecific: 'vah-animating--to-height-specific',
	static: 'vah-static',
	staticHeightZero: 'vah-static--height-zero',
	staticHeightAuto: 'vah-static--height-auto',
	staticHeightSpecific: 'vah-static--height-specific',
};

const PROPS_TO_OMIT = [
	'animateOpacity',
	'animationStateClasses',
	'applyInlineTransitions',
	'children',
	'contentClassName',
	'delay',
	'duration',
	'easing',
	'height',
];

export const AnimateHeight = defineComponent({
	props: {
		ariaHidden: {
			type: Boolean,
		},
		animateOpacity: {
			type: Boolean,
			default: false,
		},
		animationStateClasses: {
			type: Object as PropType<AnimationStateClasses>,
			default: ANIMATION_STATE_CLASSES,
		},
		applyInlineTransitions: {
			type: Boolean,
			default: true,
		},
		contentClassName: {
			type: String,
			default: undefined,
		},
		delay: {
			type: Number,
			default: 0,
		},
		duration: {
			type: Number,
			default: 250,
		},
		easing: {
			type: String as PropType<
				'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string
			>,
			default: 'ease',
		},
		height: {
			type: [String, Number] as PropType<'auto' | number | `${number}%`>,
			validator(this: void, value: 'auto' | number): boolean {
				if (
					(typeof value === 'number' && value >= 0) ||
					isPercentage(value) ||
					value === 'auto'
				) {
					return true;
				}

				console.error(
					`value "${value}" of type "${typeof value}" is invalid type for \`height\` in \`AnimateHeight\`. It needs to be a positive number, string "auto" or percentage string (e.g. "15%").`
				);

				return false;
			},
			required: true,
		},
		id: {
			type: String,
			default: undefined,
		},
	},
	emits: {
		animationEnd(payload: { newHeight: number }) {
			return payload;
		},
		animationStart(payload: { newHeight: number }) {
			return payload;
		},
	},
	setup(props, { slots, emit, attrs }) {
		const contentElement = ref<HTMLDivElement>();

		let animationFrameIds: number[] = [];

		type Height = 'auto' | number | `${number}%`;

		let height: Height = 'auto';
		let overflow = 'visible';

		if (isNumber(props.height)) {
			height = Math.max(0, Number(props.height));
			overflow = 'hidden';
		} else if (isPercentage(props.height)) {
			// If value is string "0%" make sure we convert it to number 0
			height = props.height === '0%' ? 0 : props.height;
			overflow = 'hidden';
		}

		function showContent(height: Height) {
			if (height === 0) {
				contentElement.value!.style.display = '';
			}
		}

		function hideContent(newHeight: Height) {
			if (newHeight === 0) {
				contentElement.value!.style.display = 'none';
			}
		}

		const animationStateClasses = {
			...ANIMATION_STATE_CLASSES,
			...props.animationStateClasses,
		};

		function getStaticStateClasses(height: string | number) {
			return classnames({
				[animationStateClasses.static]: true,
				[animationStateClasses.staticHeightZero]: height === 0,
				[animationStateClasses.staticHeightSpecific]: height > 0,
				[animationStateClasses.staticHeightAuto]: height === 'auto',
			});
		}

		const animationStateStaticClasses = getStaticStateClasses(height);

		type State = {
			animationStateClasses: string;
			height: Height;
			overflow: string;
			shouldUseTransitions: boolean;
		};

		const state = ref<State>({
			animationStateClasses: animationStateStaticClasses,
			height,
			overflow,
			shouldUseTransitions: false,
		});

		const prevState = ref<State>();
		watch(state, (_newState, oldState) => {
			prevState.value = oldState;
		});
		let prevHeight: Height;

		let timeoutId: NodeJS.Timeout | undefined;
		let animationClassesTimeoutId: NodeJS.Timeout;

		onMounted(() => {
			const { height } = state.value;

			// Hide content if height is 0 (to prevent tabbing into it)
			// Check for contentElement is added cause this would fail in tests (react-test-renderer)
			// Read more here: https://github.com/Stanko/react-animate-height/issues/17
			if (contentElement.value?.style !== undefined) {
				hideContent(height);
			}
		});

		onBeforeUpdate(() => {
			const { delay, duration, height } = props;

			// Check if 'height' prop has changed
			if (contentElement.value !== undefined && height !== prevHeight) {
				// Remove display: none from the content div
				// if it was hidden to prevent tabbing into it
				if (prevHeight !== undefined) {
					showContent(prevHeight);
				}

				// Cache content height
				contentElement.value.style.overflow = 'hidden';
				const contentHeight = contentElement.value.offsetHeight;
				contentElement.value.style.overflow = '';

				// set total animation time
				const totalDuration = duration + delay;

				let newHeight: Height;
				const timeoutState: Partial<State> = {
					height: undefined, // it will be always set to either 'auto' or specific number
					overflow: 'hidden',
				};
				const isCurrentHeightAuto = prevState.value?.height === 'auto';

				if (isNumber(height)) {
					// If value is string "0" make sure we convert it to number 0
					newHeight = Math.max(0, Number(height));
					timeoutState.height = newHeight;
				} else if (isPercentage(height)) {
					// If value is string "0%" make sure we convert it to number 0
					newHeight = height === '0%' ? 0 : height;
					timeoutState.height = newHeight;
				} else {
					// If not, animate to content height
					// and then reset to auto
					newHeight = contentHeight; // TODO solve contentHeight = 0
					timeoutState.height = 'auto';
					timeoutState.overflow = undefined;
				}

				if (isCurrentHeightAuto) {
					// This is the height to be animated to
					timeoutState.height = newHeight;

					// If previous height was 'auto'
					// set starting height explicitly to be able to use transition
					newHeight = contentHeight;
				}

				// Animation classes
				const updatedAnimationStateClasses = classnames({
					[animationStateClasses.animating]: true,
					[animationStateClasses.animatingUp]:
						prevHeight === 'auto' || height < prevHeight,
					[animationStateClasses.animatingDown]:
						height === 'auto' || height > prevHeight!,
					[animationStateClasses.animatingToHeightZero]:
						timeoutState.height === 0,
					[animationStateClasses.animatingToHeightAuto]:
						timeoutState.height === 'auto',
					[animationStateClasses.animatingToHeightSpecific]:
						timeoutState.height > 0,
				});

				// Animation classes to be put after animation is complete
				const timeoutAnimationStateClasses = getStaticStateClasses(
					timeoutState.height
				);

				prevHeight = state.value.height;
				// Set starting height and animating classes
				state.value = {
					animationStateClasses: updatedAnimationStateClasses,
					height: newHeight,
					overflow: 'hidden',
					// When animating from 'auto' we first need to set fixed height
					// that change should be animated
					shouldUseTransitions: !isCurrentHeightAuto,
				};

				// Clear timeouts
				if (timeoutId !== undefined) {
					clearTimeout(timeoutId);
				}

				clearTimeout(animationClassesTimeoutId);

				if (isCurrentHeightAuto) {
					// When animating from 'auto' we use a short timeout to start animation
					// after setting fixed height above
					timeoutState.shouldUseTransitions = true;

					cancelAnimationFrames(animationFrameIds);
					animationFrameIds = startAnimationHelper(() => {
						state.value = { ...state.value, ...timeoutState };

						// ANIMATION STARTS
						emit('animationStart', { newHeight: timeoutState.height });
					});

					// Set static classes and remove transitions when animation ends
					animationClassesTimeoutId = setTimeout(() => {
						state.value = {
							...state.value,
							animationStateClasses: timeoutAnimationStateClasses,
							shouldUseTransitions: false,
						};

						// ANIMATION ENDS
						// Hide content if height is 0 (to prevent tabbing into it)
						if (timeoutState.height !== undefined) {
							hideContent(timeoutState.height);
						}

						emit('animationEnd', { newHeight: timeoutState.height });
					}, totalDuration);
				} else {
					// ANIMATION STARTS
					emit('animationStart', { newHeight });

					// Set end height, classes and remove transitions when animation is complete
					timeoutId = setTimeout(() => {
						timeoutState.animationStateClasses = timeoutAnimationStateClasses;
						timeoutState.shouldUseTransitions = false;

						state.value = { ...state.value, ...timeoutState };

						// ANIMATION ENDS
						// If height is auto, don't hide the content
						// (case when element is empty, therefore height is 0)
						if (height !== 'auto') {
							// Hide content if height is 0 (to prevent tabbing into it)
							hideContent(newHeight); // TODO solve newHeight = 0
						}

						// Run a callback if it exists
						emit('animationEnd', { newHeight });
					}, totalDuration);
				}
			}
		});

		onBeforeUnmount(() => {
			cancelAnimationFrames(animationFrameIds);

			if (timeoutId !== undefined) {
				clearTimeout(timeoutId);
			}

			clearTimeout(animationClassesTimeoutId);

			timeoutId = undefined;
		});

		return () => {
			const {
				animateOpacity,
				applyInlineTransitions,
				contentClassName,
				delay,
				duration,
				easing,
				id,
			} = props;

			const { height, overflow, animationStateClasses, shouldUseTransitions } =
				state.value;

			const style = attrs.style as CSSProperties | undefined;
			const heightStyle = typeof height === 'number' ? `${height}px` : height;

			const componentStyle: CSSProperties = {
				...style,
				height: heightStyle,
				overflow: overflow ?? style?.overflow,
			};

			if (shouldUseTransitions && applyInlineTransitions) {
				componentStyle.transition = `height ${duration}ms ${easing} ${delay}ms`;

				// Include transition passed through styles
				if (style?.transition !== undefined) {
					componentStyle.transition = `${style.transition}, ${componentStyle.transition}`;
				}

				// Add webkit vendor prefix still used by opera, blackberry...
				componentStyle.WebkitTransition = componentStyle.transition;
			}

			const contentStyle: CSSProperties = {};

			if (animateOpacity) {
				contentStyle.transition = `opacity ${duration}ms ${easing} ${delay}ms`;
				// Add webkit vendor prefix still used by opera, blackberry...
				contentStyle.WebkitTransition = contentStyle.transition;

				if (height === 0) {
					contentStyle.opacity = 0;
				}
			}

			const componentClasses = classnames({
				[animationStateClasses]: true,
				[attrs.class as string]: attrs.class,
			});

			// Check if user passed aria-hidden prop
			const hasAriaHiddenProp = typeof props.ariaHidden !== 'undefined';
			const ariaHidden = hasAriaHiddenProp ? props.ariaHidden : height === 0;

			return h(
				'div',
				{
					...omit(props, PROPS_TO_OMIT),
					'aria-hidden': ariaHidden,
					class: componentClasses,
					id,
					style: componentStyle,
				},
				[
					h(
						'div',
						{
							class: contentClassName,
							style: contentStyle,
							ref: contentElement,
						},
						slots.default?.()
					),
				]
			);
		};
	},
});
