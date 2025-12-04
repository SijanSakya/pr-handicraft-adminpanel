'use client';
import Checkbox from '@/components/shared-components/form/input/Checkbox';
import InputField from '@/components/shared-components/form/input/InputField';
import Button from '@/components/shared-components/ui/button/Button';
import { getSupabaseClient } from '@/lib/supabase/supabaseClient';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(3, { message: 'Password must be at least 3 characters' }),
});

export default function SignInForm() {
  const supabase = getSupabaseClient();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  type Inputs = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: Inputs) => {
    setAuthError(null);

    startTransition(async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setAuthError(error.message);
        return;
      }

      router.push('/');
    });
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Enter your email and password to sign in!</p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        name="email"
                        type="email"
                        label="Email Address"
                        defaultValue={field.value}
                        onChange={field.onChange}
                        errorMessage={errors?.email?.message}
                        placeholder="abc@example.com"
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <InputField
                        name="password"
                        type="password"
                        label="Password"
                        defaultValue={field.value}
                        onChange={field.onChange}
                        errorMessage={errors?.password?.message}
                        placeholder="Enter Password"
                        hint=""
                      />
                    )}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit" disabled={isPending}>
                    Sign in
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {''}
                <Link href="/signup" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
