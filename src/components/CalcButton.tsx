'use client'

type ButtonVariant = 'number' | 'operator' | 'equals' | 'function'

type CalcButtonProps = {
  label: string
  onClick: () => void
  variant: ButtonVariant
  isActive?: boolean
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  number:
    'bg-gray-700 hover:bg-gray-600 text-white active:bg-gray-500',
  operator:
    'bg-purple-600 hover:bg-purple-500 text-white active:bg-purple-400',
  equals:
    'bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white active:from-purple-600 active:to-pink-600',
  function:
    'bg-gray-600 hover:bg-gray-500 text-gray-200 active:bg-gray-400',
}

export default function CalcButton({
  label,
  onClick,
  variant,
  isActive = false,
  className = '',
}: CalcButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${variantStyles[variant]}
        ${isActive ? 'ring-2 ring-white ring-opacity-60' : ''}
        ${className}
        h-14 rounded-2xl text-lg font-medium
        transition-all duration-100 ease-in-out
        shadow-md hover:shadow-lg
        select-none cursor-pointer
        flex items-center justify-center
        focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
      `}
    >
      {label}
    </button>
  )
}
