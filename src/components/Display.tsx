'use client'

type DisplayProps = {
  currentValue: string
  expression: string
  hasError: boolean
}

export default function Display({ currentValue, expression, hasError }: DisplayProps) {
  const fontSize =
    currentValue.length > 12
      ? 'text-xl'
      : currentValue.length > 9
      ? 'text-2xl'
      : currentValue.length > 6
      ? 'text-3xl'
      : 'text-4xl'

  return (
    <div className="px-5 pt-2 pb-4 text-right min-h-[100px] flex flex-col justify-end">
      {/* Expression line */}
      <div className="text-gray-500 text-sm font-mono min-h-[20px] truncate mb-1">
        {expression}
      </div>

      {/* Main display */}
      <div
        className={`font-light font-mono tracking-tight transition-all duration-100 ${
          hasError ? 'text-red-400 text-2xl' : `text-white ${fontSize}`
        }`}
      >
        {currentValue}
      </div>
    </div>
  )
}
