import { ButtonState } from "~/utilities/enums";

export default function Button({ children, state }: { children: string, state: ButtonState }) {
    const ActiveStyles = "text-sky-base shadow-glow-sm shadow-sky-base/20 hover:bg-gray-hover hover:shadow-glow-lg hover:shadow-sky-base/20 active:text-sky-active active:bg-gray-active"
    const InactiveStyles = "cursor-default text-white-low"
    const buttonState = state === ButtonState.Active ? ActiveStyles : InactiveStyles;
    return (
        <button
            className={`bg-gray-base px-6 h-[40px] text-center font-bold w-full rounded-full transition-colors ${buttonState}`}
            type={`${state === ButtonState.Active ? 'submit': 'button'}`}
        >{children}</button>
    );
}