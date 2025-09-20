'use client';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';

interface FormData {
    name: string;
}

export default function Edit() {
    const { register, handleSubmit, setValue } = useForm<FormData>();
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        if (!id) return;
        fetch(`/api/items/${id}`)
            .then(res => res.json())
            .then(item => {
                setValue('name', item.name);
                // setValue('description', item.description);
            });
    }, [id]);

    const onSubmit = async (data: FormData) => {
        await fetch(`/api/items/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        router.push('/');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name')} placeholder="Name" required />
            <button type="submit">Update</button>
        </form>
    );
}
