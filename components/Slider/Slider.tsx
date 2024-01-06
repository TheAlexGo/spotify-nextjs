'use client';

import { FC, JSX } from 'react';
import * as RadixSlider from '@radix-ui/react-slider'

interface ISlider {
    value?: number;
    onChange?: (value: number) => void;
}

export const Slider: FC<ISlider> = ({
    value = 1,
    onChange,
}): JSX.Element => {
    const changeHandler = (newValue: number[]) => {
        onChange?.(newValue[0]);
    };

    return (
        <RadixSlider.Root
            className="
                relative
                flex
                items-center
                select-none
                touch-none
                w-full
                h-10
            "
            defaultValue={[1]}
            value={[value]}
            onValueChange={changeHandler}
            max={1}
            step={0.1}
            aria-label="Volume"
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
                    "
                />
            </RadixSlider.Track>
        </RadixSlider.Root>
    );
};
