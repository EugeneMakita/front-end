"use client"

import * as React from "react"
import { LockSimpleIcon } from "@phosphor-icons/react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TAccountAmountField,
  TAccountDescriptionSelectField,
  TAccountDescriptionTextField,
} from "@/components/t-account-table"

export type TrialBalanceCellKind = "label" | "amount" | "computed"
export type TrialBalanceEditor = "input" | "select"

export type TrialBalanceCell = {
  value: string
  editable: boolean
  inputId?: string
  kind?: TrialBalanceCellKind
  editor?: TrialBalanceEditor
  options?: string[]
}

export type TrialBalanceColumn = {
  id: string
  label: string
  type: "account" | "amount"
  align?: "left" | "right"
  locked?: boolean
  widthClass?: string
  group?: string
}

export type TrialBalanceRow = {
  rowId: string
  kind?: "section" | "line" | "total" | "difference"
  sectionLabel?: string
  cells: Record<string, TrialBalanceCell>
}

export type TrialBalanceVariant = {
  key: string
  label: string
  tableHeading?: string
  showTableHeading?: boolean
  description?: string
  columns: TrialBalanceColumn[]
  rows: TrialBalanceRow[]
  totalsLabel?: string
  totalsFor?: string[]
  showDifference?: {
    leftColId: string
    rightColId: string
    label?: string
  }
  exclusivePairs?: Array<[string, string]>
}

export type TrialBalanceTableProps = {
  variants: TrialBalanceVariant[]
  showTableHeading?: boolean
}

const DEFAULT_TB_HEADING = "Landscaping Business — Trial Balance (Year Ended December 31, 2024)"

function cleanDrCrSuffix(label: string) {
  return label.replace(/\s*\((dr|cr)\)\s*$/i, "")
}

function normalizeHeaderLabel(label: string) {
  const cleaned = cleanDrCrSuffix(label).trim()
  if (/^dr$/i.test(cleaned)) return "Debit"
  if (/^cr$/i.test(cleaned)) return "Credit"
  return cleaned
}

function normalizeTotalsLabel(label: string) {
  const cleaned = label.trim()
  if (/^totals$/i.test(cleaned)) return "Totals"
  return cleaned
}

function parseAmount(value: string) {
  const normalized = value.replace(/[,$\s]/g, "")
  const parsed = Number.parseFloat(normalized)
  return Number.isFinite(parsed) ? parsed : 0
}

export function TrialBalanceTable({ variants, showTableHeading = true }: TrialBalanceTableProps) {
  const [amountEdits, setAmountEdits] = React.useState<Record<string, string>>({})
  const [textEdits, setTextEdits] = React.useState<Record<string, string>>({})

  function valueKey(variantKey: string, rowId: string, columnId: string) {
    return `${variantKey}:${rowId}:${columnId}`
  }

  function hoverClass(editable: boolean) {
    return editable
      ? "border border-transparent hover:border-primary/70 focus-within:border-ring focus-within:bg-background"
      : "border border-transparent"
  }

  function updateAmount(
    variant: TrialBalanceVariant,
    row: TrialBalanceRow,
    columnId: string,
    nextRaw: string
  ) {
    const key = valueKey(variant.key, row.rowId, columnId)
    setAmountEdits((prev) => {
      const next = { ...prev, [key]: nextRaw || "0" }
      const pair = variant.exclusivePairs?.find(([left, right]) => left === columnId || right === columnId)
      if (pair && parseAmount(nextRaw || "0") !== 0) {
        const [left, right] = pair
        const opposite = left === columnId ? right : left
        next[valueKey(variant.key, row.rowId, opposite)] = "0"
      }
      return next
    })
  }

  function updateText(variant: TrialBalanceVariant, row: TrialBalanceRow, columnId: string, nextValue: string) {
    setTextEdits((prev) => ({
      ...prev,
      [valueKey(variant.key, row.rowId, columnId)]: nextValue,
    }))
  }

  function getAmountValue(variant: TrialBalanceVariant, row: TrialBalanceRow, columnId: string, fallback: string) {
    return amountEdits[valueKey(variant.key, row.rowId, columnId)] ?? fallback
  }

  function getTextValue(variant: TrialBalanceVariant, row: TrialBalanceRow, columnId: string, fallback: string) {
    return textEdits[valueKey(variant.key, row.rowId, columnId)] ?? fallback
  }

  function computeColumnTotal(variant: TrialBalanceVariant, columnId: string) {
    return variant.rows
      .filter((row) => row.kind !== "section" && row.kind !== "total" && row.kind !== "difference")
      .reduce((sum, row) => {
        const cell = row.cells[columnId]
        if (!cell) return sum
        return sum + parseAmount(getAmountValue(variant, row, columnId, cell.value))
      }, 0)
  }

  return (
    <div className="space-y-8">
      {variants.map((variant) => {
        const firstNonAmountColumnId = variant.columns.find((column) => column.type !== "amount")?.id
        const amountWidth = variant.columns.length >= 5 ? 12 : 16
        const fixedNonAmountWidth = 14
        const accountColumns = variant.columns.filter((column) => column.type === "account")
        const hasCanonicalAccountColumn = accountColumns.some((column) => column.id === "account")
        const flexibleAccountIds = new Set(
          hasCanonicalAccountColumn
            ? accountColumns.filter((column) => column.id === "account").map((column) => column.id)
            : accountColumns.slice(0, 1).map((column) => column.id)
        )
        const fixedPercent = variant.columns.reduce((sum, column) => {
          if (column.type === "amount") return sum + amountWidth
          if (flexibleAccountIds.has(column.id)) return sum
          return sum + fixedNonAmountWidth
        }, 0)
        const flexCount = Math.max(1, flexibleAccountIds.size)
        const flexWidth = Math.max(8, (100 - fixedPercent) / flexCount)
        const widthForColumn = (column: TrialBalanceColumn) => {
          if (column.type === "amount") return amountWidth
          if (flexibleAccountIds.has(column.id)) return flexWidth
          return fixedNonAmountWidth
        }

        const grouped = variant.columns.some((column) => column.group)
        const getAlign = (column: TrialBalanceColumn) => column.align || (column.type === "amount" ? "right" : "left")
        const groups = grouped
          ? variant.columns.reduce<Array<{ name: string; span: number }>>((acc, column) => {
              const name = column.group || ""
              if (!acc.length || acc[acc.length - 1].name !== name) {
                acc.push({ name, span: 1 })
              } else {
                acc[acc.length - 1].span += 1
              }
              return acc
            }, [])
          : []

        const differenceAmount = variant.showDifference
          ? Math.abs(
              computeColumnTotal(variant, variant.showDifference.leftColId) -
                computeColumnTotal(variant, variant.showDifference.rightColId)
            )
          : 0

        return (
          <div key={variant.key} className="space-y-3">
            <div>
              <Table className="w-full table-fixed">
                {(variant.showTableHeading ?? showTableHeading) ? (
                  <caption className="caption-top mb-1 w-full whitespace-normal break-words px-0 text-left text-sm font-bold text-foreground [font-family:inherit]">
                    {variant.tableHeading || variant.label || DEFAULT_TB_HEADING}
                  </caption>
                ) : null}
                <colgroup>
                  {variant.columns.map((column) => (
                    <col
                      key={`${variant.key}-col-${column.id}`}
                      style={{
                        width: `${widthForColumn(column)}%`,
                      }}
                    />
                  ))}
                </colgroup>
                <TableHeader>
                  {grouped ? (
                    <TableRow className="bg-[#e7edf9] hover:bg-[#e7edf9]">
                      {groups.map((group, index) => (
                        <TableHead
                          key={`${variant.key}-group-${index}`}
                          colSpan={group.span}
                          className={`!h-7 px-1 py-0 text-sm font-semibold text-foreground [font-family:inherit] ${
                            group.name.trim().toLowerCase() === "account" ? "text-left" : "text-center"
                          } ${
                            index < groups.length - 1 ? "border-r border-border" : ""
                          }`}
                        >
                          {group.name}
                        </TableHead>
                      ))}
                    </TableRow>
                  ) : null}
                  <TableRow className={grouped ? "bg-transparent hover:bg-transparent" : "bg-[#e7edf9] hover:bg-[#e7edf9]"}>
                    {variant.columns.map((column, index) => (
                      <TableHead
                        key={`${variant.key}-head-${column.id}`}
                        className={`${column.widthClass || ""} !h-7 px-1 py-0 text-sm font-semibold text-foreground [font-family:inherit] ${
                          index < variant.columns.length - 1 ? "border-r border-border" : ""
                        }`}
                      >
                        <div className={`flex items-center gap-1 ${getAlign(column) === "right" ? "justify-end" : "justify-start"}`}>
                          {column.locked && getAlign(column) === "right" ? (
                            <LockSimpleIcon size={12} className="text-foreground" />
                          ) : null}
                          <span>
                            {grouped && (column.group || "").trim().toLowerCase() === "account"
                              ? "\u00A0"
                              : normalizeHeaderLabel(column.label)}
                          </span>
                          {column.locked && getAlign(column) !== "right" ? (
                            <LockSimpleIcon size={12} className="text-foreground" />
                          ) : null}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {variant.rows.map((row) => {
                    if (row.kind === "section") {
                      return (
                        <TableRow key={`${variant.key}-${row.rowId}`} className="bg-muted/10 hover:bg-muted/10">
                          {variant.columns.map((column, index) => (
                            <TableCell
                              key={`${variant.key}-${row.rowId}-section-${column.id}`}
                              className={`py-2 text-sm font-semibold text-foreground [font-family:inherit] ${
                                index < variant.columns.length - 1 ? "border-r border-border" : ""
                              }`}
                            >
                              {index === 0 ? row.sectionLabel : "\u00A0"}
                            </TableCell>
                          ))}
                        </TableRow>
                      )
                    }

                    return (
                      <TableRow key={`${variant.key}-${row.rowId}`}>
                        {variant.columns.map((column, index) => {
                          const cell = row.cells[column.id] ?? { value: "", editable: false }
                          const isAmount = column.type === "amount"
                          const isTotalRow = row.kind === "total"
                          const effectiveTextValue = getTextValue(variant, row, column.id, cell.value)
                          const effectiveAmount = getAmountValue(variant, row, column.id, cell.value)

                          if (isTotalRow && isAmount && variant.totalsFor?.includes(column.id) && !cell.value) {
                            const computed = computeColumnTotal(variant, column.id)
                            return (
                              <TableCell
                                key={`${variant.key}-${row.rowId}-${column.id}`}
                                className={`py-1 text-right ${
                                  index < variant.columns.length - 1 ? "border-r border-border" : ""
                                }`}
                              >
                                <div className="ml-auto w-full max-w-[132px] border-b-4 border-double border-border px-2 py-1 text-[14px] font-semibold text-foreground [font-family:inherit]">
                                  {`$${computed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                </div>
                              </TableCell>
                            )
                          }

                          if (isTotalRow && !isAmount) {
                            return (
                              <TableCell
                                key={`${variant.key}-${row.rowId}-${column.id}`}
                                className={`py-1 text-[14px] font-semibold text-foreground [font-family:inherit] ${
                                  getAlign(column) === "right" ? "text-right" : "text-left"
                                } ${
                                  index < variant.columns.length - 1 ? "border-r border-border" : ""
                                }`}
                              >
                                {column.id === firstNonAmountColumnId
                                  ? normalizeTotalsLabel(cell.value || variant.totalsLabel || "TOTALS")
                                  : "\u00A0"}
                              </TableCell>
                            )
                          }

                          if (isAmount) {
                            return (
                              <TableCell
                                key={`${variant.key}-${row.rowId}-${column.id}`}
                                className={`px-0 py-1 align-top ${getAlign(column) === "right" ? "text-right" : "text-left"} ${
                                  index < variant.columns.length - 1 ? "border-r border-border" : ""
                                }`}
                              >
                                <div className={`${hoverClass(cell.editable)} ${getAlign(column) === "right" ? "ml-auto" : ""} inline-flex w-full max-w-[132px] items-center`}>
                                  <TAccountAmountField
                                    cell={{
                                      value: effectiveAmount,
                                      editable: cell.editable,
                                      inputId: cell.inputId,
                                    }}
                                    onCommit={(nextRaw) => updateAmount(variant, row, column.id, nextRaw)}
                                  />
                                </div>
                              </TableCell>
                            )
                          }

                          const editorMode = cell.editor || "input"
                          return (
                            <TableCell
                              key={`${variant.key}-${row.rowId}-${column.id}`}
                              className={`px-0 py-1 align-top ${
                                index < variant.columns.length - 1 ? "border-r border-border" : ""
                              }`}
                            >
                              <div className={`${hoverClass(cell.editable)} flex w-full items-start`}>
                                {!cell.editable ? (
                                  <span className="inline-flex min-h-7 h-auto w-full items-center whitespace-normal break-words px-2 py-1 text-[14px] leading-5 text-foreground [font-family:inherit]">
                                    {effectiveTextValue || "\u00A0"}
                                  </span>
                                ) : editorMode === "select" ? (
                                  <TAccountDescriptionSelectField
                                    value={effectiveTextValue}
                                    placeholder="Pick account"
                                    options={cell.options || []}
                                    onCommit={(nextValue) => updateText(variant, row, column.id, nextValue)}
                                  />
                                ) : (
                                  <TAccountDescriptionTextField
                                    value={effectiveTextValue}
                                    placeholder="Enter account"
                                    onCommit={(nextValue) => updateText(variant, row, column.id, nextValue)}
                                  />
                                )}
                              </div>
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                  {variant.showDifference ? (
                    <TableRow className="bg-muted/10 hover:bg-muted/10">
                      <TableCell colSpan={variant.columns.length} className="py-2 text-[13px] [font-family:inherit]">
                        <span className={differenceAmount === 0 ? "text-emerald-600" : "text-red-600"}>
                          {(variant.showDifference.label || "Out of balance by") +
                            ` $${differenceAmount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}
                        </span>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </TableBody>
              </Table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
