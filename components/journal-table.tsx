"use client"

import * as React from "react"
import { LockSimpleIcon } from "@phosphor-icons/react"

import {
  ACCOUNTING_COLUMN_HEADER_ROW_CLASS,
  AccountingDoubleUnderlineAmount,
  TAccountAmountField,
  TAccountDateField,
  TAccountDescriptionSelectField,
  TAccountDescriptionTextField,
  accountingCellFrameClass,
} from "@/components/accounting-table-primitives"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type JournalCell = {
  value: string
  editable: boolean
  inputId?: string
  options?: string[]
}

export type JournalLine = {
  rowId: string
  date: JournalCell
  account: JournalCell
  description?: JournalCell
  debit: JournalCell
  credit: JournalCell
  ref?: JournalCell
  indent?: "none" | "credit" | "custom"
  customIndentClass?: string
  isExplanation?: boolean
}

export type JournalEntryData = {
  entryId: string
  entryLabel?: string
  lines: JournalLine[]
}

export type JournalTableData = {
  tableId: string
  title: string
  entries: JournalEntryData[]
}

export type JournalAccountEditorMode = "text" | "select" | "both"
export type JournalDescriptionMode = "per_entry" | "per_line" | "hidden"
export type JournalDateMode = "entry_first_line" | "every_line" | "hidden"

export type JournalVariant = {
  key: string
  label: string
  description?: string
  tables: JournalTableData[]
  layout: {
    groupByEntry: boolean
    indentCredits: boolean
    dateMode: JournalDateMode
    descriptionMode: JournalDescriptionMode
    showRef?: boolean
  }
  dateEditable: boolean
  accountEditor: JournalAccountEditorMode
  accountEditable: boolean
  descriptionEditable: boolean
  amountEditable: boolean
  accountOptions?: string[]
  descriptionOptions?: string[]
  rules: {
    drCrExclusivePerLine: boolean
    allowNegativeAmounts: boolean
    enforceEntryBalanced: "none" | "warn" | "block_submit"
    allowExplanationLine: boolean
  }
  show?: {
    entryTotals?: boolean
    lockIcons?: boolean
  }
}

export type JournalTableProps = {
  variants: JournalVariant[]
  showFootnote?: boolean
  footnoteText?: string
}

const AMOUNT_COL_WIDTH = "120px"
const DATE_COL_WIDTH = "132px"
const REF_COL_WIDTH = "110px"

function parseAmount(value: string) {
  const cleaned = value.replace(/[,$\s]/g, "")
  const parsed = Number.parseFloat(cleaned)
  return Number.isFinite(parsed) ? parsed : 0
}

function formatAmount(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function JournalTable({
  variants,
  showFootnote = true,
  footnoteText = "Journal variants support display, selective blanks, and full-entry practice.",
}: JournalTableProps) {
  const [amountEdits, setAmountEdits] = React.useState<Record<string, string>>({})
  const [textEdits, setTextEdits] = React.useState<Record<string, string>>({})

  function cellKey(variantKey: string, tableId: string, entryId: string, rowId: string, col: string) {
    return `${variantKey}:${tableId}:${entryId}:${rowId}:${col}`
  }

  function getTextValue(
    variantKey: string,
    tableId: string,
    entryId: string,
    rowId: string,
    col: string,
    fallback: string
  ) {
    return textEdits[cellKey(variantKey, tableId, entryId, rowId, col)] ?? fallback
  }

  function getAmountValue(
    variantKey: string,
    tableId: string,
    entryId: string,
    rowId: string,
    col: "debit" | "credit",
    fallback: string
  ) {
    return amountEdits[cellKey(variantKey, tableId, entryId, rowId, col)] ?? fallback
  }

  function setTextValue(
    variantKey: string,
    tableId: string,
    entryId: string,
    rowId: string,
    col: string,
    value: string
  ) {
    setTextEdits((prev) => ({
      ...prev,
      [cellKey(variantKey, tableId, entryId, rowId, col)]: value,
    }))
  }

  function setAmountValue(
    variant: JournalVariant,
    tableId: string,
    entryId: string,
    rowId: string,
    col: "debit" | "credit",
    value: string
  ) {
    setAmountEdits((prev) => {
      const next = {
        ...prev,
        [cellKey(variant.key, tableId, entryId, rowId, col)]: value || "0",
      }
      if (variant.rules.drCrExclusivePerLine && parseAmount(value || "0") !== 0) {
        const opposite = col === "debit" ? "credit" : "debit"
        next[cellKey(variant.key, tableId, entryId, rowId, opposite)] = "0"
      }
      return next
    })
  }

  function renderAccountCell(
    variant: JournalVariant,
    tableId: string,
    entryId: string,
    line: JournalLine,
    sideLabel: string
  ) {
    const current = getTextValue(variant.key, tableId, entryId, line.rowId, sideLabel, line.account.value)
    const editable = variant.accountEditable && line.account.editable
    if (!editable) {
      return (
        <span className="inline-flex min-h-7 h-auto w-full items-center whitespace-normal break-words px-2 py-1 text-[14px] leading-5 text-foreground [font-family:inherit]">
          {current || "\u00A0"}
        </span>
      )
    }

    const options = line.account.options || variant.accountOptions || []
    const mode: Exclude<JournalAccountEditorMode, "both"> =
      variant.accountEditor === "both"
        ? options.length > 0
          ? "select"
          : "text"
        : variant.accountEditor

    if (mode === "select") {
      return (
        <TAccountDescriptionSelectField
          value={current}
          options={options}
          placeholder="Pick account"
          onCommit={(next) => setTextValue(variant.key, tableId, entryId, line.rowId, sideLabel, next)}
        />
      )
    }

    return (
      <TAccountDescriptionTextField
        value={current}
        placeholder="Enter account"
        onCommit={(next) => setTextValue(variant.key, tableId, entryId, line.rowId, sideLabel, next)}
      />
    )
  }

  function renderDescriptionCell(
    variant: JournalVariant,
    tableId: string,
    entryId: string,
    line: JournalLine,
    sideLabel: string
  ) {
    const fallback = line.description?.value || ""
    const current = getTextValue(variant.key, tableId, entryId, line.rowId, sideLabel, fallback)
    const editable = variant.descriptionEditable && !!line.description?.editable

    if (!editable) {
      return (
        <span className="inline-flex min-h-7 h-auto w-full items-center whitespace-normal break-words px-2 py-1 text-[14px] leading-5 text-foreground [font-family:inherit]">
          {current || "\u00A0"}
        </span>
      )
    }

    const options = line.description?.options || variant.descriptionOptions || []
    if (options.length > 0) {
      return (
        <TAccountDescriptionSelectField
          value={current}
          options={options}
          placeholder="Pick description"
          onCommit={(next) => setTextValue(variant.key, tableId, entryId, line.rowId, sideLabel, next)}
        />
      )
    }

    return (
      <TAccountDescriptionTextField
        value={current}
        placeholder="Enter description"
        onCommit={(next) => setTextValue(variant.key, tableId, entryId, line.rowId, sideLabel, next)}
      />
    )
  }

  function renderDateCell(variant: JournalVariant, line: JournalLine) {
    const showDate = variant.layout.dateMode !== "hidden"
    if (!showDate) return "\u00A0"

    const editable = variant.dateEditable && line.date.editable
    if (!editable) {
      return (
        <span className="inline-flex h-7 w-full max-w-full items-center px-2 text-[14px] leading-5 text-foreground [font-family:inherit]">
          {line.date.value || "\u00A0"}
        </span>
      )
    }
    return <TAccountDateField value={line.date.value} />
  }

  function entryTotals(variant: JournalVariant, tableId: string, entry: JournalEntryData) {
    return entry.lines.reduce(
      (sum, line) => {
        if (line.isExplanation) return sum
        const debit = getAmountValue(variant.key, tableId, entry.entryId, line.rowId, "debit", line.debit.value)
        const credit = getAmountValue(variant.key, tableId, entry.entryId, line.rowId, "credit", line.credit.value)
        return {
          debit: sum.debit + parseAmount(debit),
          credit: sum.credit + parseAmount(credit),
        }
      },
      { debit: 0, credit: 0 }
    )
  }

  return (
    <div className="space-y-8">
      {variants.map((variant) => {
        const showDate = variant.layout.dateMode !== "hidden"
        const showRef = !!variant.layout.showRef
        const showDescription = variant.layout.descriptionMode === "per_line"
        const accountColSpan = showDescription ? 1 : 1

        return (
          <div key={variant.key} className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">{variant.label}</h3>
            {variant.description ? <p className="text-xs text-muted-foreground">{variant.description}</p> : null}
            {variant.tables.map((table) => (
              <div key={`${variant.key}-${table.tableId}`}>
                <Table className="w-full table-fixed">
                  <caption className="caption-top mb-1 w-full whitespace-normal break-words px-0 text-left text-sm font-bold text-foreground [font-family:inherit]">
                    {table.title}
                  </caption>
                  <colgroup>
                    {showDate ? <col style={{ width: DATE_COL_WIDTH }} /> : null}
                    {showRef ? <col style={{ width: REF_COL_WIDTH }} /> : null}
                    <col />
                    {showDescription ? <col /> : null}
                    <col style={{ width: AMOUNT_COL_WIDTH }} />
                    <col style={{ width: AMOUNT_COL_WIDTH }} />
                  </colgroup>
                  <TableHeader>
                    <TableRow className={ACCOUNTING_COLUMN_HEADER_ROW_CLASS}>
                      {showDate ? (
                        <TableHead className="!h-7 px-1 py-0 text-left text-sm font-semibold text-foreground">
                          <span className="inline-flex items-center gap-1">
                            <span>Date</span>
                            {variant.show?.lockIcons && !variant.dateEditable ? <LockSimpleIcon size={12} className="text-current" /> : null}
                          </span>
                        </TableHead>
                      ) : null}
                      {showRef ? (
                        <TableHead className="!h-7 px-1 py-0 text-left text-sm font-semibold text-foreground">
                          <span className="inline-flex items-center gap-1">
                            <span>Account Number</span>
                            {variant.show?.lockIcons ? <LockSimpleIcon size={12} className="text-current" /> : null}
                          </span>
                        </TableHead>
                      ) : null}
                      <TableHead className="!h-7 px-1 py-0 text-left text-sm font-semibold text-foreground">
                        <span className="inline-flex items-center gap-1">
                          <span>Account</span>
                          {variant.show?.lockIcons && !variant.accountEditable ? <LockSimpleIcon size={12} className="text-current" /> : null}
                        </span>
                      </TableHead>
                      {showDescription ? (
                        <TableHead className="!h-7 px-1 py-0 text-left text-sm font-semibold text-foreground">
                          <span className="inline-flex items-center gap-1">
                            <span>Description</span>
                            {variant.show?.lockIcons && !variant.descriptionEditable ? <LockSimpleIcon size={12} className="text-current" /> : null}
                          </span>
                        </TableHead>
                      ) : null}
                      <TableHead className="!h-7 px-1 py-0 text-right text-sm font-semibold text-foreground">
                        <span className="inline-flex w-full items-center justify-end gap-1">
                          {variant.show?.lockIcons && !variant.amountEditable ? <LockSimpleIcon size={12} className="text-current" /> : null}
                          <span>Debit</span>
                        </span>
                      </TableHead>
                      <TableHead className="!h-7 px-1 py-0 text-right text-sm font-semibold text-foreground">
                        <span className="inline-flex w-full items-center justify-end gap-1">
                          {variant.show?.lockIcons && !variant.amountEditable ? <LockSimpleIcon size={12} className="text-current" /> : null}
                          <span>Credit</span>
                        </span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {table.entries.map((entry) => {
                      const totals = entryTotals(variant, table.tableId, entry)
                      const isBalanced = Math.abs(totals.debit - totals.credit) < 0.005

                      return (
                        <React.Fragment key={`${table.tableId}-${entry.entryId}`}>
                          {entry.lines.map((line, index) => {
                            const isExplanationRow = !!line.isExplanation && variant.rules.allowExplanationLine

                            if (isExplanationRow) {
                              return (
                                <TableRow key={`${table.tableId}-${entry.entryId}-${line.rowId}`}>
                                  {showDate ? <TableCell className="px-1 py-1 align-top" /> : null}
                                  {showRef ? <TableCell className="px-1 py-1 align-top" /> : null}
                                  <TableCell
                                    colSpan={(showDescription ? 2 : 1) * accountColSpan}
                                    className="px-0 py-1 align-top"
                                  >
                                    <div className={`${accountingCellFrameClass(variant.descriptionEditable && !!line.description?.editable, true)} flex w-full items-start`}>
                                      {renderDescriptionCell(
                                        variant,
                                        table.tableId,
                                        entry.entryId,
                                        line,
                                        "entry_description"
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell className="px-1 py-1 align-top" />
                                  <TableCell className="px-1 py-1 align-top" />
                                </TableRow>
                              )
                            }

                            const showDateForLine =
                              variant.layout.dateMode === "every_line" ||
                              (variant.layout.dateMode === "entry_first_line" && index === 0)

                            const debitValue = getAmountValue(
                              variant.key,
                              table.tableId,
                              entry.entryId,
                              line.rowId,
                              "debit",
                              line.debit.value
                            )
                            const creditValue = getAmountValue(
                              variant.key,
                              table.tableId,
                              entry.entryId,
                              line.rowId,
                              "credit",
                              line.credit.value
                            )
                            const debitEditable = variant.amountEditable && line.debit.editable
                            const creditEditable = variant.amountEditable && line.credit.editable
                            const indentClass =
                              variant.layout.indentCredits && line.indent === "credit"
                                ? "pl-8"
                                : line.customIndentClass || ""

                            return (
                              <TableRow key={`${table.tableId}-${entry.entryId}-${line.rowId}`}>
                                {showDate ? (
                                  <TableCell className="px-0 py-1 align-top">
                                    <div className={`${accountingCellFrameClass(variant.dateEditable && line.date.editable, true)} flex w-full items-center`}>
                                      {showDateForLine ? renderDateCell(variant, line) : <span className="inline-flex h-7 w-full px-2" />}
                                    </div>
                                  </TableCell>
                                ) : null}
                                {showRef ? (
                                  <TableCell className="px-0 py-1 align-top">
                                    <div className={`${accountingCellFrameClass(false, true)} flex w-full items-center`}>
                                      <span className="inline-flex h-7 w-full items-center px-2 text-[14px] leading-5 text-foreground [font-family:inherit]">
                                        {line.ref?.value || "\u00A0"}
                                      </span>
                                    </div>
                                  </TableCell>
                                ) : null}
                                <TableCell className="px-0 py-1 align-top">
                                  <div className={`${accountingCellFrameClass(variant.accountEditable && line.account.editable, true)} ${indentClass} flex w-full items-start`}>
                                    {renderAccountCell(variant, table.tableId, entry.entryId, line, "account")}
                                  </div>
                                </TableCell>
                                {showDescription ? (
                                  <TableCell className="px-0 py-1 align-top">
                                    <div className={`${accountingCellFrameClass(variant.descriptionEditable && !!line.description?.editable, true)} flex w-full items-start`}>
                                      {renderDescriptionCell(variant, table.tableId, entry.entryId, line, "description")}
                                    </div>
                                  </TableCell>
                                ) : null}
                                <TableCell className="px-0 py-1 text-right align-top">
                                  <div className={`${accountingCellFrameClass(debitEditable, true)} ml-auto inline-flex w-full max-w-[120px] items-center`}>
                                    <TAccountAmountField
                                      cell={{
                                        value: debitValue,
                                        editable: debitEditable,
                                        inputId: line.debit.inputId,
                                      }}
                                      onCommit={(nextRaw) =>
                                        setAmountValue(variant, table.tableId, entry.entryId, line.rowId, "debit", nextRaw)
                                      }
                                    />
                                  </div>
                                </TableCell>
                                <TableCell className="px-0 py-1 text-right align-top">
                                  <div className={`${accountingCellFrameClass(creditEditable, true)} ml-auto inline-flex w-full max-w-[120px] items-center`}>
                                    <TAccountAmountField
                                      cell={{
                                        value: creditValue,
                                        editable: creditEditable,
                                        inputId: line.credit.inputId,
                                      }}
                                      onCommit={(nextRaw) =>
                                        setAmountValue(variant, table.tableId, entry.entryId, line.rowId, "credit", nextRaw)
                                      }
                                    />
                                  </div>
                                </TableCell>
                              </TableRow>
                            )
                          })}
                          {variant.show?.entryTotals ? (
                            <TableRow>
                              {showDate ? <TableCell className="px-1 py-1 align-top" /> : null}
                              {showRef ? <TableCell className="px-1 py-1 align-top" /> : null}
                              <TableCell colSpan={showDescription ? 2 : 1} className="px-0 py-1 align-middle">
                                <span className="block px-2 text-[14px] leading-5 font-medium text-foreground [font-family:inherit]">
                                  Entry total
                                  {variant.rules.enforceEntryBalanced !== "none" ? (
                                    <span className={`ml-2 text-xs ${isBalanced ? "text-emerald-600" : "text-red-600"}`}>
                                      {isBalanced
                                        ? "Balanced"
                                        : `Out by $${formatAmount(Math.abs(totals.debit - totals.credit))}`}
                                    </span>
                                  ) : null}
                                </span>
                              </TableCell>
                              <TableCell className="px-0 py-1 align-middle">
                                <AccountingDoubleUnderlineAmount value={totals.debit.toFixed(2)} showCurrency={false} />
                              </TableCell>
                              <TableCell className="px-0 py-1 align-middle">
                                <AccountingDoubleUnderlineAmount value={totals.credit.toFixed(2)} showCurrency={false} />
                              </TableCell>
                            </TableRow>
                          ) : null}
                        </React.Fragment>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        )
      })}
      {showFootnote ? <p className="text-xs text-muted-foreground">{footnoteText}</p> : null}
    </div>
  )
}
