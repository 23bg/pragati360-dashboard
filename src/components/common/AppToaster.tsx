'use client'

import { toast } from 'sonner'

type ToastType = 'default' | 'success' | 'warning' | 'error'

interface ToastOptions {
    message?: string
    description?: string
    postion?: 'bottom-right'
}

const getStyles = (type: ToastType): React.CSSProperties => {
    const solidStyles: Record<ToastType, React.CSSProperties> = {
        default: {
            '--normal-bg': 'var(--color-blue-600)',
            '--normal-text': 'var(--color-gray-50)',
        },

        success: {
            '--normal-bg': 'var(--color-green-500)',
            '--normal-text': 'var(--color-gray-50)',
        },

        warning: {
            '--normal-bg': 'var(--color-amber-500)',
            '--normal-text': 'var(--color-gray-50)',
        },

        error: {
            '--normal-bg': 'var(--color-re-500)',
            '--normal-text': 'var(--color-gray-50)',
        }
    }
    return solidStyles[type]
}

export const appToast = {
    success: (message: string, options?: ToastOptions) =>
        toast.success(message, { ...options, style: getStyles('success') }),

    info: (message: string, options?: ToastOptions) =>
        toast.info(message, { ...options, style: getStyles('default') }),

    warning: (message: string, options?: ToastOptions) =>
        toast.warning(message, { ...options, style: getStyles('warning') }),

    error: (message: string, options?: ToastOptions) =>
        toast.error(message, { ...options, style: getStyles('error') }),

    message: (message: string, options?: ToastOptions) =>
        toast(message, { ...options, style: getStyles('default') }),

    loading: (message: string, options?: ToastOptions) =>
        toast.loading(message, { ...options, style: getStyles('default') }),

    promise: (promise: Promise<any>, options: any) =>
        toast.promise(promise, {
            ...options,
            loading: { ...options?.loading, style: getStyles('default') },
            success: { ...options?.success, style: getStyles('success') },
            error: { ...options?.error, style: getStyles('error') }
        }),

    dismiss: (id?: string | number) => toast.dismiss(id),

    custom: (jsx: any, options?: ToastOptions) =>
        toast.custom(jsx, { ...options, style: getStyles('default') })
}
