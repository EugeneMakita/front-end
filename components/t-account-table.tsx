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

export type TAccountCell = {
  value: string
  editable: boolean
  inputId?: string
}

export type TAccountLine = {
  rowId: string
  debitInfo: TAccountCell
  debitAmount: TAccountCell
  creditInfo: TAccountCell
  creditAmount: TAccountCell
}

export type TAccountData = {
  tableId: string
  title: string
  rows: TAccountLine[]
}

export type TAccountInfoMode = "date_desc" | "date_only" | "desc_only" | "hidden"
export type DescriptionEditorMode = "text" | "select" | "both"

export type TAccountVariant = {
  key: string
  label: string
  accounts: TAccountData[]
  infoMode: TAccountInfoMode
  sideHeaders?: string[]
  dateEditable: boolean
  descriptionEditor: DescriptionEditorMode
  descriptionEditable: boolean
  descriptionOptions?: string[]
}

export type TAccountTableProps = {
  variants: TAccountVariant[]
  showFootnote?: boolean
  footnoteText?: string
}

function splitInfo(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return { date: "", description: "" }
  if (trimmed.includes(" - ")) {
    const [date, ...rest] = trimmed.split(" - ")
    return { date, description: rest.join(" - ") }
  }
  const isDate = /^\d{4}-\d{2}-\d{2}$/.test(trimmed)
  return isDate ? { date: trimmed, description: "" } : { date: "", description: trimmed }
}

export function TAccountTable({
  variants,
  showFootnote = true,
  footnoteText = "All variants above are fully viewable; editable amount cells can be entered on both debit and credit sides.",
}: TAccountTableProps) {
  const [descriptionEdits, setDescriptionEdits] = React.useState<Record<string, string>>({})

  function commitDescription(cellKey: string, value: string) {
    setDescriptionEdits((prev) => ({ ...prev, [cellKey]: value }))
  }

  function renderDateCell(value: string, editable: boolean) {
    if (!editable) {
      return (
        <span className="inline-flex h-7 w-full max-w-full items-center px-2 text-[14px] leading-5 text-foreground [font-family:inherit] font-normal">
          {value || "\u00A0"}
        </span>
      )
    }
    return <TAccountDateField value={value} />
  }

  function renderDescriptionCell(
    value: string,
    mode: DescriptionEditorMode,
    options: string[] | undefined,
    editable: boolean,
    cellKey: string,
    side: "debit" | "credit"
  ) {
    if (!editable) {
      return (
        <span className="inline-flex min-h-7 h-auto w-full max-w-full items-center whitespace-normal break-words px-2 py-1 text-[14px] leading-5 text-foreground [font-family:inherit] font-normal">
          {value || "\u00A0"}
        </span>
      )
    }

    const normalizedOptions = (options || []).filter(Boolean)
    const effectiveMode: Exclude<DescriptionEditorMode, "both"> =
      mode === "both" ? (side === "debit" ? "text" : "select") : mode

    if (effectiveMode === "select") {
      return (
        <TAccountDescriptionSelectField
          value={value}
          options={normalizedOptions}
          placeholder="Pick description"
          onCommit={(nextValue) => commitDescription(cellKey, nextValue)}
        />
      )
    }

    return <TAccountDescriptionTextField value={value} placeholder="Enter description" />
  }

  function renderVariantAccount(
    variantKey: string,
    account: TAccountData,
    infoMode: TAccountInfoMode,
    sideHeaders: string[] | undefined,
    dateEditable: boolean,
    descriptionEditor: DescriptionEditorMode,
    descriptionEditable: boolean,
    descriptionOptions?: string[]
  ) {
    const amountsEditableInAccount = account.rows.some(
      (row) => row.debitAmount.editable || row.creditAmount.editable
    )
    const debitAmountEditable = account.rows.some((row) => row.debitAmount.editable)
    const creditAmountEditable = account.rows.some((row) => row.creditAmount.editable)

    const rowCount = Math.max(account.rows.length, 4)
    const paddedRows = [
      ...account.rows,
      ...Array.from({ length: Math.max(0, rowCount - account.rows.length) }).map((_, index) => ({
        rowId: `blank-${index}`,
        debitInfo: { value: "", editable: false },
        debitAmount: { value: "", editable: amountsEditableInAccount },
        creditInfo: { value: "", editable: false },
        creditAmount: { value: "", editable: amountsEditableInAccount },
      })),
    ]

    const defaultSideInfoHeaders =
      infoMode === "date_desc"
        ? ["Date", "Description"]
        : infoMode === "date_only"
          ? ["Date"]
          : infoMode === "desc_only"
            ? ["Description"]
            : []
    const sideInfoHeaders = sideHeaders && sideHeaders.length > 0 ? sideHeaders : defaultSideInfoHeaders
    const sideColSpan = sideInfoHeaders.length + 1
    const hasDescriptionColumn = sideInfoHeaders.some((header) => header.toLowerCase() === "description")

    function infoColumnClass(header: string) {
      if (header.toLowerCase() === "date") {
        return "w-[132px] min-w-[132px] max-w-[132px] whitespace-nowrap"
      }
      if (header.toLowerCase() === "description") {
        return "w-auto"
      }
      return "w-[132px] min-w-[132px] max-w-[132px]"
    }

    function isDescriptionColumn(header: string) {
      return header.toLowerCase() === "description"
    }

    function infoHeaderLocked(header: string) {
      const normalized = header.toLowerCase()
      if (normalized === "date") return !dateEditable
      if (normalized === "description") return !descriptionEditable
      return false
    }

    const parseAmount = (value: string) => {
      const cleaned = value.replace(/[^0-9.-]/g, "")
      const parsed = Number.parseFloat(cleaned)
      return Number.isFinite(parsed) ? parsed : 0
    }
    const debitTotal = account.rows.reduce((sum, row) => sum + parseAmount(row.debitAmount.value), 0)
    const creditTotal = account.rows.reduce((sum, row) => sum + parseAmount(row.creditAmount.value), 0)

    function formatTotal(value: number) {
      return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    function buildInfoValues(value: string) {
      const split = splitInfo(value)
      const baseValues =
        infoMode === "date_desc"
          ? [split.date, split.description]
          : infoMode === "date_only"
            ? [split.date]
            : infoMode === "desc_only"
              ? [split.description]
              : []
      if (sideInfoHeaders.length <= baseValues.length) {
        return baseValues.slice(0, sideInfoHeaders.length)
      }
      return [...baseValues, ...Array.from({ length: sideInfoHeaders.length - baseValues.length }).map(() => "")]
    }

    return (
      <div className="text-[14px] leading-5 text-foreground [font-family:inherit]">
        <div className="overflow-x-hidden">
          <Table className="w-full table-fixed border-collapse">
            <colgroup>
              {sideInfoHeaders.map((header, index) => {
                const normalized = header.toLowerCase()
                const hasDate = sideInfoHeaders.some((h) => h.toLowerCase() === "date")
                const hasDescription = sideInfoHeaders.some((h) => h.toLowerCase() === "description")
                const amountWidthPx = 120
                const dateWidthPx = 132

                if (normalized === "date" && hasDescription) {
                  return <col key={`dr-col-${index}`} style={{ width: `${dateWidthPx}px` }} />
                }

                if (normalized === "description") {
                  const sideFixedPx = hasDate ? dateWidthPx + amountWidthPx : amountWidthPx
                  return <col key={`dr-col-${index}`} style={{ width: `calc(50% - ${sideFixedPx}px)` }} />
                }

                if (normalized === "date" && !hasDescription) {
                  return <col key={`dr-col-${index}`} style={{ width: `calc(50% - ${amountWidthPx}px)` }} />
                }

                return <col key={`dr-col-${index}`} />
              })}
              <col style={{ width: "120px" }} />
              {sideInfoHeaders.map((header, index) => {
                const normalized = header.toLowerCase()
                const hasDate = sideInfoHeaders.some((h) => h.toLowerCase() === "date")
                const hasDescription = sideInfoHeaders.some((h) => h.toLowerCase() === "description")
                const amountWidthPx = 120
                const dateWidthPx = 132

                if (normalized === "date" && hasDescription) {
                  return <col key={`cr-col-${index}`} style={{ width: `${dateWidthPx}px` }} />
                }

                if (normalized === "description") {
                  const sideFixedPx = hasDate ? dateWidthPx + amountWidthPx : amountWidthPx
                  return <col key={`cr-col-${index}`} style={{ width: `calc(50% - ${sideFixedPx}px)` }} />
                }

                if (normalized === "date" && !hasDescription) {
                  return <col key={`cr-col-${index}`} style={{ width: `calc(50% - ${amountWidthPx}px)` }} />
                }

                return <col key={`cr-col-${index}`} />
              })}
              <col style={{ width: "120px" }} />
            </colgroup>
            <TableHeader>
              <TableRow className="!bg-transparent hover:!bg-transparent data-[state=selected]:!bg-transparent">
                <TableHead colSpan={sideColSpan * 2} className="px-0 py-1">
                  <div className="relative text-xs font-medium text-foreground">
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 text-left">
                      Debit (Dr)
                    </span>
                    <span className="block text-center text-sm font-semibold">{account.title}</span>
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-right">
                      Credit (Cr)
                    </span>
                  </div>
                </TableHead>
              </TableRow>
              <TableRow className={ACCOUNTING_COLUMN_HEADER_ROW_CLASS}>
                {sideInfoHeaders.map((header) => (
                  <TableHead
                    key={`dr-${account.tableId}-${header}`}
                    className={`!h-7 px-1 py-0 text-left text-sm font-semibold text-foreground ${infoColumnClass(header)}`}
                  >
                    <span className="inline-flex items-center gap-1">
                      <span>{header}</span>
                      {infoHeaderLocked(header) ? <LockSimpleIcon size={12} className="text-current" /> : null}
                    </span>
                  </TableHead>
                ))}
                <TableHead className="w-[120px] !h-7 px-1 py-0 text-right text-sm font-semibold text-foreground border-r">
                  <span className="inline-flex w-full items-center justify-end gap-1">
                    {!debitAmountEditable ? <LockSimpleIcon size={12} className="text-current" /> : null}
                    <span>Amount</span>
                  </span>
                </TableHead>
                {sideInfoHeaders.map((header) => (
                  <TableHead
                    key={`cr-${account.tableId}-${header}`}
                    className={`!h-7 px-1 py-0 text-left text-sm font-semibold text-foreground ${infoColumnClass(header)}`}
                  >
                    <span className="inline-flex items-center gap-1">
                      <span>{header}</span>
                      {infoHeaderLocked(header) ? <LockSimpleIcon size={12} className="text-current" /> : null}
                    </span>
                  </TableHead>
                ))}
                <TableHead className="w-[120px] !h-7 px-1 py-0 text-right text-sm font-semibold text-foreground">
                  <span className="inline-flex w-full items-center justify-end gap-1">
                    {!creditAmountEditable ? <LockSimpleIcon size={12} className="text-current" /> : null}
                    <span>Amount</span>
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paddedRows.map((row) => {
                const debitInfoValues = buildInfoValues(row.debitInfo.value)
                const creditInfoValues = buildInfoValues(row.creditInfo.value)

                return (
                  <TableRow key={row.rowId}>
                    {debitInfoValues.map((value, index) => (
                      <TableCell
                        key={`dr-${row.rowId}-${index}`}
                        className={`px-0 py-1 ${infoColumnClass(sideInfoHeaders[index] ?? "")} ${
                          isDescriptionColumn(sideInfoHeaders[index] ?? "")
                            ? "!whitespace-normal break-words align-top"
                            : "align-top"
                        }`}
                      >
                        <div
                          className={`${accountingCellFrameClass(
                            (infoMode === "date_desc" || infoMode === "date_only")
                              ? index === 0 && dateEditable
                              : descriptionEditable,
                            true
                          )} flex w-full items-center`}
                        >
                          {(infoMode === "date_desc" || infoMode === "date_only") && index === 0
                            ? renderDateCell(value, dateEditable)
                            : renderDescriptionCell(
                                descriptionEdits[`${variantKey}-${account.tableId}-dr-desc-${row.rowId}`] ?? value,
                                descriptionEditor,
                                descriptionOptions,
                                descriptionEditable,
                                `${variantKey}-${account.tableId}-dr-desc-${row.rowId}`,
                                "debit"
                              )}
                        </div>
                      </TableCell>
                    ))}
                    <TableCell className="border-r px-0 py-1 text-right align-top">
                      <div className={`${accountingCellFrameClass(row.debitAmount.editable, true)} ml-auto inline-flex w-full max-w-[120px] items-center`}>
                        <TAccountAmountField cell={row.debitAmount} />
                      </div>
                    </TableCell>
                    {creditInfoValues.map((value, index) => (
                      <TableCell
                        key={`cr-${row.rowId}-${index}`}
                        className={`px-0 py-1 ${infoColumnClass(sideInfoHeaders[index] ?? "")} ${
                          isDescriptionColumn(sideInfoHeaders[index] ?? "")
                            ? "!whitespace-normal break-words align-top"
                            : "align-top"
                        }`}
                      >
                        <div
                          className={`${accountingCellFrameClass(
                            (infoMode === "date_desc" || infoMode === "date_only")
                              ? index === 0 && dateEditable
                              : descriptionEditable,
                            true
                          )} flex w-full items-center`}
                        >
                          {(infoMode === "date_desc" || infoMode === "date_only") && index === 0
                            ? renderDateCell(value, dateEditable)
                            : renderDescriptionCell(
                                descriptionEdits[`${variantKey}-${account.tableId}-cr-desc-${row.rowId}`] ?? value,
                                descriptionEditor,
                                descriptionOptions,
                                descriptionEditable,
                                `${variantKey}-${account.tableId}-cr-desc-${row.rowId}`,
                                "credit"
                              )}
                        </div>
                      </TableCell>
                    ))}
                    <TableCell className="px-0 py-1 text-right align-top">
                      <div className={`${accountingCellFrameClass(row.creditAmount.editable, true)} ml-auto inline-flex w-full max-w-[120px] items-center`}>
                        <TAccountAmountField cell={row.creditAmount} />
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
              <TableRow>
                {sideInfoHeaders.map((_, index) => (
                  <TableCell key={`dr-balance-label-${account.tableId}-${index}`} className="px-0 py-1">
                    {hasDescriptionColumn && index === sideInfoHeaders.length - 1 ? (
                      <span className="block px-2 text-[14px] leading-5 font-medium text-foreground [font-family:inherit]">
                        Balance
                      </span>
                    ) : null}
                  </TableCell>
                ))}
                <TableCell className="border-r border-border px-0 py-1 align-middle">
                  <AccountingDoubleUnderlineAmount value={formatTotal(debitTotal)} />
                </TableCell>
                {sideInfoHeaders.map((_, index) => (
                  <TableCell key={`cr-balance-label-${account.tableId}-${index}`} className="px-0 py-1">
                    {hasDescriptionColumn && index === sideInfoHeaders.length - 1 ? (
                      <span className="block px-2 text-[14px] leading-5 font-medium text-foreground [font-family:inherit]">
                        Balance
                      </span>
                    ) : null}
                  </TableCell>
                ))}
                <TableCell className="px-0 py-1 align-middle">
                  <AccountingDoubleUnderlineAmount value={formatTotal(creditTotal)} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {variants.map((variant) => (
        <div key={variant.key} className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">{variant.label}</h3>
          <div className="grid grid-cols-1 gap-6">
            {variant.accounts.map((account) => (
              <div key={`${variant.key}-${account.tableId}`}>
                {renderVariantAccount(
                  variant.key,
                  account,
                  variant.infoMode,
                  variant.sideHeaders,
                  variant.dateEditable,
                  variant.descriptionEditor,
                  variant.descriptionEditable,
                  variant.descriptionOptions
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {showFootnote ? <div className="text-xs text-muted-foreground">{footnoteText}</div> : null}
    </div>
  )
}
