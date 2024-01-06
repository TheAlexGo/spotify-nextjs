'use client';

import { ChangeEventHandler, FC, JSX, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useDebounce } from '@/hooks/useDebounce';
import { Input } from '@/components/Input/Input';

interface ISearchInput {
}

export const SearchInput: FC<ISearchInput> = ({...props}): JSX.Element => {
    const router = useRouter();
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    const changeHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        setValue(target.value);
    }

    useEffect(() => {
        const query = {
            title: debouncedValue,
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query,
        });

        router.push(url);
    }, [debouncedValue, router]);

    return (
        <Input
            placeholder="What do you want to listen to?"
            value={value}
            onChange={changeHandler}
        />
    );
};
