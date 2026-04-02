'use client'

import CalcButton from './CalcButton'

type ButtonGridProps = {
  onNumber: (num: string) => void
  onOperator: (op: string) => void
  onEquals: () => void
  onClear: () => void
  onClearEntry: () => void
  onBackspace: () => void
  onToggleSign: () => void
  onPercentage: () => void
  onSquareRoot: () => void
  activeOperator: string | null
  waitingForOperand: boolean
}

export default function ButtonGrid({
  onNumber,
  onOperator,
  onEquals,
  onClear,
  onClearEntry,
  onBackspace,
  onToggleSign,
  onPercentage,
  onSquareRoot,
  activeOperator,
  waitingForOperand,
}: ButtonGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2 p-4">
      {/* Row 1 */}
      <CalcButton label="AC" onClick={onClear} variant="function" />
      <CalcButton label="CE" onClick={onClearEntry} variant="function" />
      <CalcButton label="⌫" onClick={onBackspace} variant="function" />
      <CalcButton
        label="÷"
        onClick={() => onOperator('÷')}
        variant="operator"
        isActive={activeOperator === '÷' && waitingForOperand}
      />

      {/* Row 2 */}
      <CalcButton label="7" onClick={() => onNumber('7')} variant="number" />
      <CalcButton label="8" onClick={() => onNumber('8')} variant="number" />
      <CalcButton label="9" onClick={() => onNumber('9')} variant="number" />
      <CalcButton
        label="×"
        onClick={() => onOperator('×')}
        variant="operator"
        isActive={activeOperator === '×' && waitingForOperand}
      />

      {/* Row 3 */}
      <CalcButton label="4" onClick={() => onNumber('4')} variant="number" />
      <CalcButton label="5" onClick={() => onNumber('5')} variant="number" />
      <CalcButton label="6" onClick={() => onNumber('6')} variant="number" />
      <CalcButton
        label="-"
        onClick={() => onOperator('-')}
        variant="operator"
        isActive={activeOperator === '-' && waitingForOperand}
      />

      {/* Row 4 */}
      <CalcButton label="1" onClick={() => onNumber('1')} variant="number" />
      <CalcButton label="2" onClick={() => onNumber('2')} variant="number" />
      <CalcButton label="3" onClick={() => onNumber('3')} variant="number" />
      <CalcButton
        label="+"
        onClick={() => onOperator('+')}
        variant="operator"
        isActive={activeOperator === '+' && waitingForOperand}
      />

      {/* Row 5 */}
      <CalcButton label="+/-" onClick={onToggleSign} variant="function" />
      <CalcButton label="0" onClick={() => onNumber('0')} variant="number" />
      <CalcButton label="." onClick={() => onNumber('.')} variant="number" />
      <CalcButton label="=" onClick={onEquals} variant="equals" />

      {/* Row 6 - Extra functions */}
      <CalcButton label="%" onClick={onPercentage} variant="function" className="col-span-2" />
      <CalcButton label="√" onClick={onSquareRoot} variant="function" className="col-span-2" />
    </div>
  )
}
