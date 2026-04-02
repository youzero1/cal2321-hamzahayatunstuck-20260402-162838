'use client'

import { useState, useCallback, useEffect } from 'react'
import Display from './Display'
import ButtonGrid from './ButtonGrid'

export type CalculatorState = {
  currentValue: string
  previousValue: string
  operator: string | null
  waitingForOperand: boolean
  expression: string
  hasError: boolean
}

const initialState: CalculatorState = {
  currentValue: '0',
  previousValue: '',
  operator: null,
  waitingForOperand: false,
  expression: '',
  hasError: false,
}

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>(initialState)
  const [history, setHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const handleNumber = useCallback((num: string) => {
    setState((prev) => {
      if (prev.hasError) return { ...initialState, currentValue: num }
      if (prev.waitingForOperand) {
        return {
          ...prev,
          currentValue: num,
          waitingForOperand: false,
        }
      }
      if (prev.currentValue === '0' && num !== '.') {
        return { ...prev, currentValue: num }
      }
      if (num === '.' && prev.currentValue.includes('.')) {
        return prev
      }
      return {
        ...prev,
        currentValue: prev.currentValue + num,
      }
    })
  }, [])

  const handleOperator = useCallback((op: string) => {
    setState((prev) => {
      if (prev.hasError) return prev
      const current = parseFloat(prev.currentValue)

      if (prev.operator && !prev.waitingForOperand) {
        const previous = parseFloat(prev.previousValue)
        let result: number

        switch (prev.operator) {
          case '+':
            result = previous + current
            break
          case '-':
            result = previous - current
            break
          case '×':
            result = previous * current
            break
          case '÷':
            if (current === 0) {
              return {
                ...prev,
                currentValue: 'Error',
                hasError: true,
                expression: 'Cannot divide by zero',
              }
            }
            result = previous / current
            break
          default:
            result = current
        }

        const resultStr = formatResult(result)
        return {
          ...prev,
          currentValue: resultStr,
          previousValue: resultStr,
          operator: op,
          waitingForOperand: true,
          expression: `${resultStr} ${op}`,
        }
      }

      return {
        ...prev,
        previousValue: prev.currentValue,
        operator: op,
        waitingForOperand: true,
        expression: `${prev.currentValue} ${op}`,
      }
    })
  }, [])

  const handleEquals = useCallback(() => {
    setState((prev) => {
      if (prev.hasError || !prev.operator || prev.waitingForOperand) return prev

      const current = parseFloat(prev.currentValue)
      const previous = parseFloat(prev.previousValue)
      let result: number

      switch (prev.operator) {
        case '+':
          result = previous + current
          break
        case '-':
          result = previous - current
          break
        case '×':
          result = previous * current
          break
        case '÷':
          if (current === 0) {
            return {
              ...prev,
              currentValue: 'Error',
              hasError: true,
              expression: 'Cannot divide by zero',
            }
          }
          result = previous / current
          break
        default:
          return prev
      }

      const resultStr = formatResult(result)
      const expressionStr = `${prev.previousValue} ${prev.operator} ${prev.currentValue} = ${resultStr}`

      setHistory((h) => [expressionStr, ...h.slice(0, 9)])

      return {
        ...prev,
        currentValue: resultStr,
        previousValue: '',
        operator: null,
        waitingForOperand: true,
        expression: expressionStr,
      }
    })
  }, [])

  const handleClear = useCallback(() => {
    setState(initialState)
  }, [])

  const handleClearEntry = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentValue: '0',
      hasError: false,
    }))
  }, [])

  const handleBackspace = useCallback(() => {
    setState((prev) => {
      if (prev.hasError || prev.waitingForOperand) return prev
      if (prev.currentValue.length === 1) {
        return { ...prev, currentValue: '0' }
      }
      return {
        ...prev,
        currentValue: prev.currentValue.slice(0, -1),
      }
    })
  }, [])

  const handleToggleSign = useCallback(() => {
    setState((prev) => {
      if (prev.hasError) return prev
      const val = parseFloat(prev.currentValue)
      return {
        ...prev,
        currentValue: formatResult(-val),
      }
    })
  }, [])

  const handlePercentage = useCallback(() => {
    setState((prev) => {
      if (prev.hasError) return prev
      const val = parseFloat(prev.currentValue)
      return {
        ...prev,
        currentValue: formatResult(val / 100),
      }
    })
  }, [])

  const handleSquareRoot = useCallback(() => {
    setState((prev) => {
      if (prev.hasError) return prev
      const val = parseFloat(prev.currentValue)
      if (val < 0) {
        return {
          ...prev,
          currentValue: 'Error',
          hasError: true,
          expression: 'Invalid input',
        }
      }
      return {
        ...prev,
        currentValue: formatResult(Math.sqrt(val)),
        waitingForOperand: true,
      }
    })
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleNumber(e.key)
      else if (e.key === '.') handleNumber('.')
      else if (e.key === '+') handleOperator('+')
      else if (e.key === '-') handleOperator('-')
      else if (e.key === '*') handleOperator('×')
      else if (e.key === '/') {
        e.preventDefault()
        handleOperator('÷')
      } else if (e.key === 'Enter' || e.key === '=') handleEquals()
      else if (e.key === 'Backspace') handleBackspace()
      else if (e.key === 'Escape') handleClear()
      else if (e.key === '%') handlePercentage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNumber, handleOperator, handleEquals, handleBackspace, handleClear, handlePercentage])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-80 bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <h1 className="text-white text-sm font-semibold tracking-widest uppercase opacity-60">
            Calculator
          </h1>
          <button
            onClick={() => setShowHistory((s) => !s)}
            className="text-purple-400 text-xs font-medium hover:text-purple-300 transition-colors"
          >
            {showHistory ? 'Hide History' : 'History'}
          </button>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="mx-4 mb-2 bg-gray-800 rounded-xl p-3 max-h-36 overflow-y-auto">
            {history.length === 0 ? (
              <p className="text-gray-500 text-xs text-center">No history yet</p>
            ) : (
              <ul className="space-y-1">
                {history.map((item, idx) => (
                  <li key={idx} className="text-gray-300 text-xs text-right font-mono">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Display */}
        <Display
          currentValue={state.currentValue}
          expression={state.expression}
          hasError={state.hasError}
        />

        {/* Button Grid */}
        <ButtonGrid
          onNumber={handleNumber}
          onOperator={handleOperator}
          onEquals={handleEquals}
          onClear={handleClear}
          onClearEntry={handleClearEntry}
          onBackspace={handleBackspace}
          onToggleSign={handleToggleSign}
          onPercentage={handlePercentage}
          onSquareRoot={handleSquareRoot}
          activeOperator={state.operator}
          waitingForOperand={state.waitingForOperand}
        />
      </div>

      <p className="text-gray-500 text-xs">Supports keyboard input</p>
    </div>
  )
}

function formatResult(num: number): string {
  if (!isFinite(num)) return 'Error'
  if (Number.isInteger(num)) return num.toString()
  const str = num.toPrecision(12)
  return parseFloat(str).toString()
}
