'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface FormData {
    name: string;
}

export default function Create() {
    const { register, handleSubmit } = useForm<FormData>();
    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        await fetch('/api/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        router.push('/');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder="Name" required />
            <button type="submit">Create</button>
        </form>
    );
}
