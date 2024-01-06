'use client';

import { FC, JSX } from 'react';
import * as RadixSlider from '@radix-ui/react-slider'
import { SliderProps } from '@radix-ui/react-slider';
import { twMerge } from 'tailwind-merge';

interface ISlider extends Omit<SliderProps, 'value' | 'defaultValue' | 'onChange'> {
    className?: string;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
}

export const Slider: FC<ISlider> = ({
    className,
    value = 1,
    defaultValue = 1,
    step = 0.1,
    onChange,
    ...props
}): JSX.Element => {
    const changeHandler = (newValue: number[]) => {
        onChange?.(newValue[0]);
    };

    return (
        <RadixSlider.Root
            {...props}
            className={twMerge(`
                relative
                flex
                items-center
                select-none
                touch-none
                w-full
                group
            `,
                className,
            )}
            defaultValue={[defaultValue]}
            value={[value]}
            onValueChange={changeHandler}
            step={step}
        >
            <RadixSlider.Track
                className="
                    bg-neutral-600
                    relative
                    grow
                    rounded-full
                    h-[3px]
                "
            >
                <RadixSlider.Range
                    className="
                        absolute
                        bg-white
                        rounded-full
                        h-full
                        group-hover:bg-green-500
                    "
                />
            </RadixSlider.Track>
            <RadixSlider.Thumb
                className="
                    opacity-0
                    flex
                    w-3
                    h-3
                    rounded-full
                    bg-white
                    group-hover:opacity-100
                    transition
                "
            />
        </RadixSlider.Root>
    );
};
