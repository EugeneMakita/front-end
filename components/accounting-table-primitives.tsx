"use client"

import * as React from "react"
import { CalendarBlankIcon } from "@phosphor-icons/react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type AccountingValueCell = {
  value: string
  editable: boolean
  inputId?: string
}

export const ACCOUNTING_COLUMN_HEADER_ROW_CLASS = "bg-[#e7edf9] hover:bg-[#e7edf9]"

export function accountingCellFrameClass(editable: boolean, readOnlyHover = false) {
  if (editable) {
    return "border border-transparent hover:border-primary/70 focus-within:border-ring focus-within:bg-background"
  }
  return readOnlyHover
    ? "border border-transparent hover:border-muted-foreground/40"
    : "border border-transparent"
}

export function AccountingDoubleUnderlineAmount({
  value,
  maxWidthClass = "max-w-[120px]",
  showCurrency = true,
  className = "",
}: {
  value: string
  maxWidthClass?: string
  showCurrency?: boolean
  className?: string
}) {
  const cleaned = value.replace(/\$/g, "").trim()
  const parsed = Number.parseFloat(cleaned.replace(/,/g, ""))
  const display = Number.isFinite(parsed)
    ? `${showCurrency ? "$" : ""}${parsed.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : value

  return (
    <div
      className={`ml-auto w-full ${maxWidthClass} border-b-4 border-double border-foreground px-2 py-1 text-right text-[14px] leading-5 font-semibold [font-family:inherit] ${className}`}
    >
      {display}
    </div>
  )
}

export function TAccountAmountField({
  cell,
  onCommit,
}: {
  cell: AccountingValueCell
  onCommit?: (value: string) => void
}) {
  const normalizedValue = cell.value.replace(/\$/g, "").trim()
  const [rawValue, setRawValue] = React.useState(normalizedValue)
  const [isEditing, setIsEditing] = React.useState(false)

  function formatCurrencyDisplay(value: string) {
    const parsed = Number.parseFloat(value.replace(/,/g, ""))
    if (!Number.isFinite(parsed)) return ""
    return `$${parsed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  function normalizeAmountInput(input: string) {
    const cleaned = input.replace(/[^0-9.]/g, "")
    if (!cleaned) return ""

    const [integerRaw, ...fractionParts] = cleaned.split(".")
    const integer = integerRaw.replace(/^0+(?=\d)/, "")
    const fraction = fractionParts.join("")

    if (cleaned.includes(".")) {
      return `${integer || "0"}.${fraction}`
    }
    return integer || "0"
  }

  if (cell.editable) {
    return (
      <Input
        id={cell.inputId}
        type="text"
        inputMode="decimal"
        placeholder="0.00"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        enterKeyHint="done"
        value={isEditing ? rawValue : formatCurrencyDisplay(rawValue)}
        onFocus={() => setIsEditing(true)}
        onBlur={() => {
          setIsEditing(false)
          onCommit?.(rawValue || "0")
        }}
        onChange={(event) => {
          const next = normalizeAmountInput(event.target.value)
          setRawValue(next)
          onCommit?.(next || "0")
        }}
        className="h-7 w-full max-w-[120px] rounded-none border-0 bg-transparent px-2 text-right !text-[14px] md:!text-[14px] !leading-5 text-foreground [font-family:inherit] font-normal shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    )
  }

  return (
    <span className="inline-flex h-7 w-full max-w-[120px] items-center justify-end px-2 text-right text-[14px] leading-5 text-foreground [font-family:inherit] font-normal">
      {formatCurrencyDisplay(normalizedValue) || "\u00A0"}
    </span>
  )
}

export function TAccountDateField({ value }: { value: string }) {
  const pickerRef = React.useRef<HTMLInputElement>(null)
  const [dateValue, setDateValue] = React.useState(value)

  function formatDateDisplay(raw: string) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(raw)
    if (!match) return raw
    const [, year, month, day] = match
    return `${day}/${month}/${year}`
  }

  function openPicker() {
    pickerRef.current?.showPicker?.()
  }

  return (
    <div className="group/date relative w-full max-w-full">
      <Input
        type="text"
        value={formatDateDisplay(dateValue)}
        readOnly
        className="h-7 w-full rounded-none border-0 bg-transparent px-2 pr-8 !text-[14px] md:!text-[14px] !leading-5 text-foreground [font-family:inherit] font-normal shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        onClick={openPicker}
        onFocus={openPicker}
      />
      <Input
        ref={pickerRef}
        type="date"
        value={dateValue}
        onChange={(event) => setDateValue(event.target.value)}
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        tabIndex={-1}
        aria-hidden
      />
      <button
        type="button"
        aria-label="Open calendar"
        className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-muted-foreground opacity-0 transition-opacity group-hover/date:opacity-100 group-focus-within/date:opacity-100"
        onMouseDown={(event) => event.preventDefault()}
        onClick={openPicker}
      >
        <CalendarBlankIcon size={14} />
      </button>
    </div>
  )
}

export function TAccountDescriptionSelectField({
  value,
  options,
  placeholder,
  onCommit,
}: {
  value: string
  options: string[]
  placeholder: string
  onCommit: (value: string) => void
}) {
  const [selectedValue, setSelectedValue] = React.useState(value)

  React.useEffect(() => {
    setSelectedValue(value)
  }, [value])

  const normalizedOptions = React.useMemo(() => {
    const base = options.filter(Boolean)
    if (selectedValue && !base.includes(selectedValue)) {
      return [selectedValue, ...base]
    }
    return base
  }, [options, selectedValue])

  const selectValue = selectedValue || undefined

  return (
    <div className="group/select w-full max-w-full">
      <Select
        value={selectValue}
        onValueChange={(nextValue) => {
          setSelectedValue(nextValue)
          onCommit(nextValue)
        }}
      >
        <SelectTrigger
          className="!h-auto min-h-7 w-full max-w-full rounded-none border-0 bg-transparent px-2 py-1 !text-[14px] md:!text-[14px] !leading-5 text-foreground [font-family:inherit] font-normal shadow-none focus:ring-0 focus:ring-offset-0 *:data-[slot=select-value]:line-clamp-none *:data-[slot=select-value]:whitespace-normal *:data-[slot=select-value]:break-words *:data-[slot=select-value]:text-left [&_svg]:opacity-0 group-hover/select:[&_svg]:opacity-100 data-[state=open]:[&_svg]:opacity-100"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-none">
          {normalizedOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function TAccountDescriptionTextField({
  value,
  placeholder,
  onCommit,
}: {
  value: string
  placeholder: string
  onCommit?: (value: string) => void
}) {
  return (
    <Textarea
      defaultValue={value}
      rows={1}
      onBlur={(event) => onCommit?.(event.target.value)}
      className="min-h-7 h-auto w-full max-w-full resize-none overflow-hidden rounded-none border-0 bg-transparent px-2 py-1 !text-[14px] md:!text-[14px] !leading-5 text-foreground [font-family:inherit] font-normal shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      placeholder={placeholder}
    />
  )
}
