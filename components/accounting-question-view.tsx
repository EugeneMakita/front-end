"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { TAccountTable, type TAccountData, type TAccountVariant } from "@/components/t-account-table"
import { TrialBalanceTable, type TrialBalanceVariant } from "@/components/trial-balance-table"
import {
  JournalTable,
  type JournalTableData,
  type JournalVariant,
} from "@/components/journal-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {
  questionId: number
}

function AmountInput({ placeholder = "" }: { placeholder?: string }) {
  return (
    <Input
      inputMode="decimal"
      className="h-8 w-28 rounded-none border-border bg-background px-2 text-right text-sm"
      placeholder={placeholder}
    />
  )
}

function SectionTitle({ title }: { title: string }) {
  return <h3 className="text-sm font-semibold tracking-wide text-foreground">{title}</h3>
}

const journalBaseTable: JournalTableData = {
  tableId: "jr:general",
  title: "General Journal",
  entries: [
    {
      entryId: "je1",
      entryLabel: "JE-1",
      lines: [
        {
          rowId: "line:1",
          date: { value: "2024-07-01", editable: false, inputId: "jr.entry:je1.date" },
          account: { value: "Cash", editable: false, inputId: "jr.entry:je1.line:l1.account" },
          description: { value: "", editable: false, inputId: "jr.entry:je1.line:l1.description" },
          debit: { value: "5000.00", editable: false, inputId: "jr.entry:je1.line:l1.debit" },
          credit: { value: "0.00", editable: false, inputId: "jr.entry:je1.line:l1.credit" },
          ref: { value: "1010", editable: false },
          indent: "none",
        },
        {
          rowId: "line:2",
          date: { value: "", editable: false },
          account: {
            value: "Service Revenue",
            editable: false,
            inputId: "jr.entry:je1.line:l2.account",
            options: ["Service Revenue", "Unearned Revenue", "Accounts Receivable"],
          },
          description: { value: "", editable: false },
          debit: { value: "0.00", editable: false, inputId: "jr.entry:je1.line:l2.debit" },
          credit: { value: "5000.00", editable: false, inputId: "jr.entry:je1.line:l2.credit" },
          ref: { value: "4010", editable: false },
          indent: "credit",
        },
        {
          rowId: "line:3",
          date: { value: "", editable: false },
          account: { value: "", editable: false },
          description: {
            value: "(Provided services for cash)",
            editable: false,
            inputId: "jr.entry:je1.explanation",
          },
          debit: { value: "", editable: false },
          credit: { value: "", editable: false },
          isExplanation: true,
        },
      ],
    },
    {
      entryId: "je2",
      entryLabel: "JE-2",
      lines: [
        {
          rowId: "line:1",
          date: { value: "2024-07-03", editable: false, inputId: "jr.entry:je2.date" },
          account: { value: "Supplies", editable: false, inputId: "jr.entry:je2.line:l1.account" },
          description: { value: "", editable: false, inputId: "jr.entry:je2.line:l1.description" },
          debit: { value: "600.00", editable: false, inputId: "jr.entry:je2.line:l1.debit" },
          credit: { value: "0.00", editable: false, inputId: "jr.entry:je2.line:l1.credit" },
          ref: { value: "1180", editable: false },
          indent: "none",
        },
        {
          rowId: "line:2",
          date: { value: "", editable: false },
          account: {
            value: "Cash",
            editable: false,
            inputId: "jr.entry:je2.line:l2.account",
            options: ["Cash", "Accounts Payable", "Bank"],
          },
          description: { value: "", editable: false },
          debit: { value: "0.00", editable: false, inputId: "jr.entry:je2.line:l2.debit" },
          credit: { value: "600.00", editable: false, inputId: "jr.entry:je2.line:l2.credit" },
          ref: { value: "1010", editable: false },
          indent: "credit",
        },
        {
          rowId: "line:3",
          date: { value: "", editable: false },
          account: { value: "", editable: false },
          description: {
            value: "(Purchased supplies for cash)",
            editable: false,
            inputId: "jr.entry:je2.explanation",
          },
          debit: { value: "", editable: false },
          credit: { value: "", editable: false },
          isExplanation: true,
        },
      ],
    },
  ],
}

function mapJournalTable(
  table: JournalTableData,
  mutateLine: (line: JournalTableData["entries"][number]["lines"][number]) => JournalTableData["entries"][number]["lines"][number]
) {
  return {
    ...table,
    entries: table.entries.map((entry) => ({
      ...entry,
      lines: entry.lines.map((line) => mutateLine(line)),
    })),
  }
}

const journalAccountOptions = [
  "Cash",
  "Supplies",
  "Service Revenue",
  "Accounts Receivable",
  "Unearned Revenue",
  "Accounts Payable",
]

const journalDescriptionOptions = [
  "Provided services for cash",
  "Purchased supplies for cash",
  "Received cash on account",
  "Paid utilities expense",
]

const journalVariants: JournalVariant[] = [
  {
    key: "journal_display_locked",
    label: "Standard journal (all locked)",
    description: "Display-only canonical journal with indented credits and explanation lines.",
    tables: [journalBaseTable],
    layout: {
      groupByEntry: true,
      indentCredits: true,
      dateMode: "entry_first_line",
      descriptionMode: "per_entry",
      showRef: true,
    },
    dateEditable: false,
    accountEditor: "text",
    accountEditable: false,
    descriptionEditable: false,
    amountEditable: false,
    rules: {
      drCrExclusivePerLine: true,
      allowNegativeAmounts: false,
      enforceEntryBalanced: "warn",
      allowExplanationLine: true,
    },
    show: {
      entryTotals: true,
      lockIcons: true,
    },
  },
  {
    key: "journal_fill_amounts",
    label: "Fill amounts practice",
    description: "Dates and accounts are locked; students fill debit and credit amounts.",
    tables: [
      mapJournalTable(journalBaseTable, (line) =>
        line.isExplanation
          ? line
          : {
              ...line,
              debit: { ...line.debit, editable: true, value: "" },
              credit: { ...line.credit, editable: true, value: "" },
            }
      ),
    ],
    layout: {
      groupByEntry: true,
      indentCredits: true,
      dateMode: "entry_first_line",
      descriptionMode: "per_entry",
      showRef: true,
    },
    dateEditable: false,
    accountEditor: "text",
    accountEditable: false,
    descriptionEditable: false,
    amountEditable: true,
    rules: {
      drCrExclusivePerLine: true,
      allowNegativeAmounts: false,
      enforceEntryBalanced: "warn",
      allowExplanationLine: true,
    },
    show: {
      entryTotals: true,
      lockIcons: true,
    },
  },
  {
    key: "journal_choose_accounts",
    label: "Choose account names",
    description: "Amounts are given; account titles are selected from dropdown choices.",
    tables: [
      mapJournalTable(journalBaseTable, (line) =>
        line.isExplanation
          ? line
          : {
              ...line,
              account: { ...line.account, editable: true, value: "" },
            }
      ),
    ],
    layout: {
      groupByEntry: true,
      indentCredits: true,
      dateMode: "entry_first_line",
      descriptionMode: "per_entry",
      showRef: false,
    },
    dateEditable: false,
    accountEditor: "select",
    accountEditable: true,
    descriptionEditable: false,
    amountEditable: false,
    accountOptions: journalAccountOptions,
    rules: {
      drCrExclusivePerLine: true,
      allowNegativeAmounts: false,
      enforceEntryBalanced: "none",
      allowExplanationLine: true,
    },
    show: {
      entryTotals: false,
      lockIcons: true,
    },
  },
  {
    key: "journal_mixed_blanks",
    label: "Mixed blanks (targeted)",
    description: "Only specific cells are editable to target weak areas.",
    tables: [
      mapJournalTable(journalBaseTable, (line) => {
        if (line.rowId === "line:1" && line.account.value === "Cash") {
          return { ...line, debit: { ...line.debit, editable: true, value: "" } }
        }
        if (line.rowId === "line:2" && line.account.value === "Service Revenue") {
          return { ...line, credit: { ...line.credit, editable: true, value: "" } }
        }
        if (line.rowId === "line:2" && line.account.value === "Cash") {
          return { ...line, account: { ...line.account, editable: true, value: "" } }
        }
        return line
      }),
    ],
    layout: {
      groupByEntry: true,
      indentCredits: true,
      dateMode: "entry_first_line",
      descriptionMode: "per_entry",
      showRef: true,
    },
    dateEditable: false,
    accountEditor: "select",
    accountEditable: true,
    descriptionEditable: false,
    amountEditable: true,
    accountOptions: journalAccountOptions,
    rules: {
      drCrExclusivePerLine: true,
      allowNegativeAmounts: false,
      enforceEntryBalanced: "warn",
      allowExplanationLine: true,
    },
    show: {
      entryTotals: true,
      lockIcons: true,
    },
  },
  {
    key: "journal_per_line_description",
    label: "Per-line description mode",
    description: "Date, account, description, and amounts editable per line.",
    tables: [
      mapJournalTable(journalBaseTable, (line) =>
        line.isExplanation
          ? line
          : {
              ...line,
              date: { ...line.date, editable: true },
              account: { ...line.account, editable: true, value: "" },
              description: {
                ...(line.description || { value: "", editable: true }),
                editable: true,
                value: line.description?.value || "",
              },
              debit: { ...line.debit, editable: true, value: "" },
              credit: { ...line.credit, editable: true, value: "" },
            }
      ),
    ],
    layout: {
      groupByEntry: true,
      indentCredits: false,
      dateMode: "every_line",
      descriptionMode: "per_line",
      showRef: false,
    },
    dateEditable: true,
    accountEditor: "both",
    accountEditable: true,
    descriptionEditable: true,
    amountEditable: true,
    accountOptions: journalAccountOptions,
    descriptionOptions: journalDescriptionOptions,
    rules: {
      drCrExclusivePerLine: true,
      allowNegativeAmounts: false,
      enforceEntryBalanced: "warn",
      allowExplanationLine: false,
    },
    show: {
      entryTotals: true,
      lockIcons: false,
    },
  },
  {
    key: "journal_full_authoring",
    label: "Full journal authoring",
    description: "All key fields editable with balance checks per entry.",
    tables: [
      mapJournalTable(journalBaseTable, (line) => ({
        ...line,
        date: { ...line.date, editable: !line.isExplanation },
        account: { ...line.account, editable: !line.isExplanation, value: line.isExplanation ? "" : line.account.value },
        description: {
          ...(line.description || { value: "", editable: false }),
          editable: true,
        },
        debit: { ...line.debit, editable: !line.isExplanation },
        credit: { ...line.credit, editable: !line.isExplanation },
      })),
    ],
    layout: {
      groupByEntry: true,
      indentCredits: true,
      dateMode: "entry_first_line",
      descriptionMode: "per_entry",
      showRef: false,
    },
    dateEditable: true,
    accountEditor: "both",
    accountEditable: true,
    descriptionEditable: true,
    amountEditable: true,
    accountOptions: journalAccountOptions,
    descriptionOptions: journalDescriptionOptions,
    rules: {
      drCrExclusivePerLine: true,
      allowNegativeAmounts: false,
      enforceEntryBalanced: "block_submit",
      allowExplanationLine: true,
    },
    show: {
      entryTotals: true,
      lockIcons: false,
    },
  },
]

function JournalVariantsTable() {
  return <JournalTable variants={journalVariants} />
}

function LedgerTable() {
  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <SectionTitle title="GENERAL LEDGER — Cash" />
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="w-[110px]">Date</TableHead>
              <TableHead className="w-[80px]">Ref</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[120px] text-right">Debit</TableHead>
              <TableHead className="w-[120px] text-right">Credit</TableHead>
              <TableHead className="w-[120px] text-right">Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="!bg-transparent hover:!bg-transparent">
              <TableCell>Jan 01</TableCell>
              <TableCell>J1</TableCell>
              <TableCell>Service revenue</TableCell>
              <TableCell className="text-right">5,000</TableCell>
              <TableCell />
              <TableCell className="text-right">5,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jan 03</TableCell>
              <TableCell>J2</TableCell>
              <TableCell>Supplies purchase</TableCell>
              <TableCell className="text-right">0</TableCell>
              <TableCell className="text-right">600</TableCell>
              <TableCell className="text-right">4,400</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} className="font-medium">
                Ending balance
              </TableCell>
              <TableCell className="align-middle">
                <div className="flex justify-end">
                  <AmountInput placeholder="______" />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const tbColumnsBase = [
  { id: "account", label: "Account", type: "account" as const, widthClass: "min-w-[280px]" },
  { id: "debit", label: "Debit (Dr)", type: "amount" as const, widthClass: "w-[180px]" },
  { id: "credit", label: "Credit (Cr)", type: "amount" as const, widthClass: "w-[180px]" },
]

const tbRowsStandard = [
  {
    rowId: "cash",
    cells: {
      account: { value: "Cash", editable: false },
      debit: { value: "4400.00", editable: false, inputId: "tb.acct:cash.dr" },
      credit: { value: "0.00", editable: false, inputId: "tb.acct:cash.cr" },
    },
  },
  {
    rowId: "supplies",
    cells: {
      account: { value: "Supplies", editable: false },
      debit: { value: "600.00", editable: false, inputId: "tb.acct:supplies.dr" },
      credit: { value: "0.00", editable: false, inputId: "tb.acct:supplies.cr" },
    },
  },
  {
    rowId: "service_revenue",
    cells: {
      account: { value: "Service Revenue", editable: false },
      debit: { value: "0.00", editable: false, inputId: "tb.acct:service_revenue.dr" },
      credit: { value: "5000.00", editable: false, inputId: "tb.acct:service_revenue.cr" },
    },
  },
  {
    rowId: "totals",
    kind: "total" as const,
    cells: {
      account: { value: "TOTALS", editable: false },
      debit: { value: "", editable: false },
      credit: { value: "", editable: false },
    },
  },
]

function mapTBRows(
  rows: typeof tbRowsStandard,
  mutate: (row: (typeof tbRowsStandard)[number]) => (typeof tbRowsStandard)[number]
) {
  return rows.map((row) => mutate(row))
}

const trialBalanceVariants: TrialBalanceVariant[] = [
  {
    key: "tb_standard_locked",
    label: "Standard TB (all locked)",
    description: "Display-only canonical trial balance with computed totals.",
    columns: tbColumnsBase.map((column) => ({ ...column, locked: true })),
    rows: tbRowsStandard,
    totalsFor: ["debit", "credit"],
    totalsLabel: "TOTALS",
  },
  {
    key: "tb_ending_balances_editable",
    label: "Ending balances only practice",
    description: "Account names locked; debit and credit balances editable.",
    columns: tbColumnsBase,
    rows: mapTBRows(tbRowsStandard, (row) =>
      row.kind === "total"
        ? row
        : {
            ...row,
            cells: {
              ...row.cells,
              debit: { ...row.cells.debit, editable: true, value: "" },
              credit: { ...row.cells.credit, editable: true, value: "" },
            },
          }
    ),
    totalsFor: ["debit", "credit"],
    exclusivePairs: [["debit", "credit"]],
  },
  {
    key: "tb_partial_blanks",
    label: "Partial blanks (targeted)",
    description: "Only selected cells are editable for remediation.",
    columns: tbColumnsBase,
    rows: mapTBRows(tbRowsStandard, (row) => {
      if (row.rowId === "cash") {
        return { ...row, cells: { ...row.cells, debit: { ...row.cells.debit, editable: true, value: "" } } }
      }
      if (row.rowId === "service_revenue") {
        return { ...row, cells: { ...row.cells, credit: { ...row.cells.credit, editable: true, value: "" } } }
      }
      return row
    }),
    totalsFor: ["debit", "credit"],
    exclusivePairs: [["debit", "credit"]],
  },
  {
    key: "tb_full_blank",
    label: "Full blank TB",
    description: "Complete reconstruction: all amount cells editable.",
    columns: tbColumnsBase,
    rows: mapTBRows(tbRowsStandard, (row) =>
      row.kind === "total"
        ? row
        : {
            ...row,
            cells: {
              ...row.cells,
              debit: { ...row.cells.debit, editable: true, value: "" },
              credit: { ...row.cells.credit, editable: true, value: "" },
            },
          }
    ),
    totalsFor: ["debit", "credit"],
    exclusivePairs: [["debit", "credit"]],
  },
  {
    key: "tb_totals_only_practice",
    label: "Totals-only practice",
    description: "Rows locked; compute and fill only totals.",
    columns: tbColumnsBase,
    rows: mapTBRows(tbRowsStandard, (row) =>
      row.kind === "total"
        ? {
            ...row,
            cells: {
              ...row.cells,
              debit: { ...row.cells.debit, editable: true, value: "" },
              credit: { ...row.cells.credit, editable: true, value: "" },
            },
          }
        : row
    ),
    totalsFor: [],
    exclusivePairs: [["debit", "credit"]],
  },
  {
    key: "tb_error_finding",
    label: "Error-finding (unbalanced)",
    description: "Correct wrong balances and bring TB back in balance.",
    columns: tbColumnsBase,
    rows: mapTBRows(tbRowsStandard, (row) => {
      if (row.rowId === "supplies") {
        return {
          ...row,
          cells: {
            ...row.cells,
            debit: { ...row.cells.debit, value: "650.00", editable: true },
          },
        }
      }
      return row
    }),
    totalsFor: ["debit", "credit"],
    showDifference: { leftColId: "debit", rightColId: "credit", label: "Out of balance by" },
    exclusivePairs: [["debit", "credit"]],
  },
  {
    key: "tb_phase_adjusted",
    label: "Adjusted TB phase",
    description: "Adjusted phase with reference column and editable amount blanks.",
    columns: [
      { id: "account_number", label: "Account Number", type: "account", widthClass: "w-[140px]", locked: true },
      { id: "account", label: "Account", type: "account", widthClass: "min-w-[260px]" },
      { id: "debit", label: "Debit (Dr)", type: "amount", widthClass: "w-[170px]" },
      { id: "credit", label: "Credit (Cr)", type: "amount", widthClass: "w-[170px]" },
    ],
    rows: [
      {
        rowId: "cash",
        cells: {
          account_number: { value: "1010", editable: false },
          account: { value: "Cash", editable: false },
          debit: { value: "4400.00", editable: true, inputId: "tb.adjusted.cash.dr" },
          credit: { value: "0.00", editable: true, inputId: "tb.adjusted.cash.cr" },
        },
      },
      {
        rowId: "supplies_expense",
        cells: {
          account_number: { value: "5120", editable: false },
          account: { value: "Supplies Expense", editable: false },
          debit: { value: "", editable: true, inputId: "tb.adjusted.supplies_expense.dr" },
          credit: { value: "0.00", editable: true, inputId: "tb.adjusted.supplies_expense.cr" },
        },
      },
      {
        rowId: "totals",
        kind: "total",
        cells: {
          account_number: { value: "", editable: false },
          account: { value: "TOTALS", editable: false },
          debit: { value: "", editable: false },
          credit: { value: "", editable: false },
        },
      },
    ],
    totalsFor: ["debit", "credit"],
    exclusivePairs: [["debit", "credit"]],
  },
  {
    key: "tb_comparative_multi_column",
    label: "Comparative TB (period 1 vs period 2)",
    description: "Four amount columns to compare two periods.",
    columns: [
      { id: "account", label: "Account", type: "account", widthClass: "min-w-[220px]", group: "Account" },
      { id: "p1dr", label: "Dr", type: "amount", widthClass: "w-[130px]", group: "Period 1" },
      { id: "p1cr", label: "Cr", type: "amount", widthClass: "w-[130px]", group: "Period 1" },
      { id: "p2dr", label: "Dr", type: "amount", widthClass: "w-[130px]", group: "Period 2" },
      { id: "p2cr", label: "Cr", type: "amount", widthClass: "w-[130px]", group: "Period 2" },
    ],
    rows: [
      {
        rowId: "cash",
        cells: {
          account: { value: "Cash", editable: false },
          p1dr: { value: "4400.00", editable: false },
          p1cr: { value: "0.00", editable: false },
          p2dr: { value: "5200.00", editable: false },
          p2cr: { value: "0.00", editable: false },
        },
      },
      {
        rowId: "service_revenue",
        cells: {
          account: { value: "Service Revenue", editable: false },
          p1dr: { value: "0.00", editable: false },
          p1cr: { value: "5000.00", editable: false },
          p2dr: { value: "0.00", editable: false },
          p2cr: { value: "6100.00", editable: false },
        },
      },
      {
        rowId: "totals",
        kind: "total",
        cells: {
          account: { value: "TOTALS", editable: false },
          p1dr: { value: "", editable: false },
          p1cr: { value: "", editable: false },
          p2dr: { value: "", editable: false },
          p2cr: { value: "", editable: false },
        },
      },
    ],
    totalsFor: ["p1dr", "p1cr", "p2dr", "p2cr"],
  },
  {
    key: "tb_grouped_sections",
    label: "Grouped accounts",
    description: "Section headers for asset, revenue, and expense groups.",
    columns: tbColumnsBase,
    rows: [
      { rowId: "sec-assets", kind: "section", sectionLabel: "Assets", cells: {} },
      {
        rowId: "cash",
        cells: {
          account: { value: "Cash", editable: false },
          debit: { value: "4400.00", editable: false },
          credit: { value: "0.00", editable: false },
        },
      },
      {
        rowId: "supplies",
        cells: {
          account: { value: "Supplies", editable: false },
          debit: { value: "600.00", editable: false },
          credit: { value: "0.00", editable: false },
        },
      },
      { rowId: "sec-revenues", kind: "section", sectionLabel: "Revenues", cells: {} },
      {
        rowId: "service_revenue",
        cells: {
          account: { value: "Service Revenue", editable: false },
          debit: { value: "0.00", editable: false },
          credit: { value: "5000.00", editable: false },
        },
      },
      {
        rowId: "totals",
        kind: "total",
        cells: {
          account: { value: "TOTALS", editable: false },
          debit: { value: "", editable: false },
          credit: { value: "", editable: false },
        },
      },
    ],
    totalsFor: ["debit", "credit"],
  },
  {
    key: "tb_account_dropdown_and_input",
    label: "Account label practice (input + dropdown)",
    description: "Account labels can be entered or selected with searchable options.",
    columns: tbColumnsBase,
    rows: [
      {
        rowId: "r1",
        cells: {
          account: {
            value: "Cash",
            editable: true,
            editor: "input",
            inputId: "tb.labels.cash",
          },
          debit: { value: "4400.00", editable: true },
          credit: { value: "0.00", editable: true },
        },
      },
      {
        rowId: "r2",
        cells: {
          account: {
            value: "",
            editable: true,
            editor: "select",
            options: ["Supplies", "Accounts Receivable", "Service Revenue", "Rent Expense", "Owner Capital"],
          },
          debit: { value: "600.00", editable: true },
          credit: { value: "0.00", editable: true },
        },
      },
      {
        rowId: "r3",
        cells: {
          account: {
            value: "",
            editable: true,
            editor: "select",
            options: ["Service Revenue", "Supplies Expense", "Owner Drawings", "Unearned Revenue"],
          },
          debit: { value: "0.00", editable: true },
          credit: { value: "5000.00", editable: true },
        },
      },
      {
        rowId: "totals",
        kind: "total",
        cells: {
          account: { value: "TOTALS", editable: false },
          debit: { value: "", editable: false },
          credit: { value: "", editable: false },
        },
      },
    ],
    totalsFor: ["debit", "credit"],
    exclusivePairs: [["debit", "credit"]],
  },
]

function TrialBalanceVariantsTable() {
  return <TrialBalanceTable variants={trialBalanceVariants} />
}

function IncomeStatementTable() {
  return (
    <div className="space-y-3">
      <SectionTitle title="INCOME STATEMENT" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="w-[180px] text-right">Amount</TableHead>
            <TableHead className="w-[170px] text-right">% of Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Service Revenue</TableCell>
            <TableCell className="text-right">5,000</TableCell>
            <TableCell className="text-right">100%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Supplies Expense</TableCell>
            <TableCell className="text-right">(600)</TableCell>
            <TableCell className="text-right">12%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold">NET INCOME</TableCell>
            <TableCell className="align-middle">
              <div className="flex justify-end">
                <AmountInput placeholder="______" />
              </div>
            </TableCell>
            <TableCell className="text-right font-semibold">88%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

function BalanceSheetTable() {
  return (
    <div className="space-y-3">
      <SectionTitle title="BALANCE SHEET" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actual</TableHead>
            <TableHead className="text-right">Budget</TableHead>
            <TableHead className="text-right">Variance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cash</TableCell>
            <TableCell className="text-right">4,400</TableCell>
            <TableCell className="text-right">4,000</TableCell>
            <TableCell className="text-right">400</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Supplies</TableCell>
            <TableCell className="text-right">600</TableCell>
            <TableCell className="text-right">800</TableCell>
            <TableCell className="text-right">(200)</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold">Total Assets</TableCell>
            <TableCell className="text-right font-semibold">5,000</TableCell>
            <TableCell className="text-right font-semibold">4,800</TableCell>
            <TableCell className="text-right font-semibold">200</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}


const cashAdjustedDateDesc: TAccountData = {
  tableId: "tacct:cash",
  title: "Cash",
  rows: [
    {
      rowId: "row:0",
      debitInfo: { value: "2024-07-01 - Owner investment", editable: false },
      debitAmount: { value: "$5000.00", editable: true, inputId: "tacct.acct:cash.dr.r0.amount" },
      creditInfo: { value: "2024-07-08 - Paid rent", editable: false },
      creditAmount: { value: "$700.00", editable: true, inputId: "tacct.acct:cash.cr.r0.amount" },
    },
    {
      rowId: "row:1",
      debitInfo: { value: "2024-07-03 - Services for cash", editable: false },
      debitAmount: { value: "$1200.00", editable: true, inputId: "tacct.acct:cash.dr.r1.amount" },
      creditInfo: { value: "", editable: false },
      creditAmount: { value: "$0.00", editable: true, inputId: "tacct.acct:cash.cr.r1.amount" },
    },
    {
      rowId: "row:2",
      debitInfo: { value: "", editable: false },
      debitAmount: { value: "$0.00", editable: true, inputId: "tacct.acct:cash.dr.r2.amount" },
      creditInfo: { value: "", editable: false },
      creditAmount: { value: "$0.00", editable: true, inputId: "tacct.acct:cash.cr.r2.amount" },
    },
  ],
}

const suppliesAdjustedDateDesc: TAccountData = {
  tableId: "tacct:supplies",
  title: "Supplies",
  rows: [
    {
      rowId: "row:0",
      debitInfo: { value: "2024-07-03 - Purchased supplies", editable: false },
      debitAmount: { value: "$600.00", editable: true, inputId: "tacct.acct:supplies.dr.r0.amount" },
      creditInfo: { value: "", editable: false },
      creditAmount: { value: "$0.00", editable: true, inputId: "tacct.acct:supplies.cr.r0.amount" },
    },
    {
      rowId: "row:1",
      debitInfo: { value: "", editable: false },
      debitAmount: { value: "$0.00", editable: true, inputId: "tacct.acct:supplies.dr.r1.amount" },
      creditInfo: { value: "2024-07-31 - Supplies expense adj.", editable: false },
      creditAmount: { value: "$150.00", editable: true, inputId: "tacct.acct:supplies.cr.r1.amount" },
    },
  ],
}

function mapInfo(
  account: TAccountData,
  mapper: (value: string) => string
): TAccountData {
  return {
    ...account,
    rows: account.rows.map((row) => ({
      ...row,
      debitInfo: { ...row.debitInfo, value: mapper(row.debitInfo.value) },
      creditInfo: { ...row.creditInfo, value: mapper(row.creditInfo.value) },
    })),
  }
}

function mapDescriptionValue(account: TAccountData, from: string, to: string): TAccountData {
  return {
    ...account,
    rows: account.rows.map((row) => ({
      ...row,
      debitInfo: row.debitInfo.value === from ? { ...row.debitInfo, value: to } : row.debitInfo,
      creditInfo: row.creditInfo.value === from ? { ...row.creditInfo, value: to } : row.creditInfo,
    })),
  }
}

function mapAmountsEditable(
  account: TAccountData,
  editable: boolean,
  clearValues = false
): TAccountData {
  return {
    ...account,
    rows: account.rows.map((row) => ({
      ...row,
      debitAmount: {
        ...row.debitAmount,
        editable,
        value: clearValues ? "" : row.debitAmount.value,
      },
      creditAmount: {
        ...row.creditAmount,
        editable,
        value: clearValues ? "" : row.creditAmount.value,
      },
    })),
  }
}

function dateOnly(value: string) {
  if (!value.includes(" - ")) return value
  return value.split(" - ")[0]
}

function descOnly(value: string) {
  if (!value.includes(" - ")) return value
  return value.split(" - ").slice(1).join(" - ")
}

const ownerCapitalAccount: TAccountData = {
  tableId: "tacct:owner_capital",
  title: "Owner Capital",
  rows: [
    {
      rowId: "row:0",
      debitInfo: { value: "", editable: false },
      debitAmount: { value: "$0.00", editable: true, inputId: "tacct.acct:owner_capital.dr.r0.amount" },
      creditInfo: { value: "Opening capital", editable: false },
      creditAmount: { value: "$5000.00", editable: true, inputId: "tacct.acct:owner_capital.cr.r0.amount" },
    },
  ],
}

const serviceRevenueAccount: TAccountData = {
  tableId: "tacct:service_revenue",
  title: "Service Revenue",
  rows: [
    {
      rowId: "row:0",
      debitInfo: { value: "", editable: false },
      debitAmount: { value: "$0.00", editable: true, inputId: "tacct.acct:service_revenue.dr.r0.amount" },
      creditInfo: { value: "Services for cash", editable: false },
      creditAmount: { value: "$1200.00", editable: true, inputId: "tacct.acct:service_revenue.cr.r0.amount" },
    },
  ],
}

const rentExpenseAccount: TAccountData = {
  tableId: "tacct:rent_expense",
  title: "Rent Expense",
  rows: [
    {
      rowId: "row:0",
      debitInfo: { value: "Paid rent", editable: false },
      debitAmount: { value: "$700.00", editable: true, inputId: "tacct.acct:rent_expense.dr.r0.amount" },
      creditInfo: { value: "", editable: false },
      creditAmount: { value: "$0.00", editable: true, inputId: "tacct.acct:rent_expense.cr.r0.amount" },
    },
  ],
}

const tAccountVariants: TAccountVariant[] = [
  {
    key: "t_accounts_adjusted_date_desc",
    label: "Adjusted (date + description)",
    accounts: [cashAdjustedDateDesc, suppliesAdjustedDateDesc],
    infoMode: "date_desc",
    sideHeaders: ["Date", "Description"],
    dateEditable: true,
    descriptionEditor: "both",
    descriptionEditable: true,
  },
  {
    key: "t_accounts_unadjusted_date_desc",
    label: "Unadjusted (date + description)",
    accounts: [cashAdjustedDateDesc, suppliesAdjustedDateDesc],
    infoMode: "date_desc",
    sideHeaders: ["Date", "Description"],
    dateEditable: false,
    descriptionEditor: "both",
    descriptionEditable: false,
  },
  {
    key: "t_accounts_post_closing_date_desc",
    label: "Post-closing (date + description)",
    accounts: [cashAdjustedDateDesc, suppliesAdjustedDateDesc],
    infoMode: "date_desc",
    sideHeaders: ["Date", "Description"],
    dateEditable: false,
    descriptionEditor: "both",
    descriptionEditable: false,
  },
  {
    key: "t_accounts_adjusted_date_only",
    label: "Adjusted (date only)",
    accounts: [
      mapInfo(cashAdjustedDateDesc, dateOnly),
      mapInfo(suppliesAdjustedDateDesc, dateOnly),
    ],
    infoMode: "date_only",
    sideHeaders: ["Date"],
    dateEditable: true,
    descriptionEditor: "text",
    descriptionEditable: false,
  },
  {
    key: "t_accounts_adjusted_desc_only",
    label: "Adjusted (description only)",
    accounts: [
      mapInfo(cashAdjustedDateDesc, descOnly),
      mapInfo(suppliesAdjustedDateDesc, descOnly),
    ],
    infoMode: "desc_only",
    sideHeaders: ["Description"],
    dateEditable: false,
    descriptionEditor: "both",
    descriptionEditable: true,
  },
  {
    key: "t_accounts_adjusted_desc_dropdown_only",
    label: "Adjusted (description dropdown only)",
    accounts: [
      mapDescriptionValue(
        mapInfo(cashAdjustedDateDesc, descOnly),
        "Owner investment",
        "Owner investment from long-term capital contribution with supporting documentation"
      ),
      mapInfo(suppliesAdjustedDateDesc, descOnly),
    ],
    infoMode: "desc_only",
    sideHeaders: ["Description"],
    dateEditable: false,
    descriptionEditor: "select",
    descriptionEditable: true,
    descriptionOptions: [
      "Owner investment",
      "Owner investment from long-term capital contribution with supporting documentation",
      "Services for cash",
      "Paid rent",
      "Purchased supplies",
      "Supplies expense adj.",
      "Owner drawings",
      "Adjustment entry",
    ],
  },
  {
    key: "t_accounts_adjusted_info_hidden",
    label: "Adjusted (info hidden)",
    accounts: [
      mapInfo(cashAdjustedDateDesc, () => ""),
      mapInfo(suppliesAdjustedDateDesc, () => ""),
    ],
    infoMode: "hidden",
    sideHeaders: [],
    dateEditable: false,
    descriptionEditor: "text",
    descriptionEditable: false,
  },
  {
    key: "t_accounts_adjusted_editable_all_amounts",
    label: "Adjusted (all amount cells editable)",
    accounts: [
      mapAmountsEditable(cashAdjustedDateDesc, true, true),
      mapAmountsEditable(suppliesAdjustedDateDesc, true, true),
    ],
    infoMode: "date_desc",
    sideHeaders: ["Date", "Description"],
    dateEditable: true,
    descriptionEditor: "both",
    descriptionEditable: true,
    descriptionOptions: [
      "Owner investment",
      "Services for cash",
      "Paid rent",
      "Purchased supplies",
      "Supplies expense adj.",
    ],
  },
  {
    key: "t_accounts_nonzero_ending_only_summary",
    label: "Non-zero ending only summary",
    accounts: [
      ownerCapitalAccount,
      serviceRevenueAccount,
      rentExpenseAccount,
      cashAdjustedDateDesc,
    ],
    infoMode: "desc_only",
    sideHeaders: ["Description"],
    dateEditable: false,
    descriptionEditor: "both",
    descriptionEditable: true,
    descriptionOptions: [
      "Owner Capital",
      "Service Revenue",
      "Rent Expense",
      "Cash",
      "Supplies",
    ],
  },
]

function TAccountsTable() {
  return <TAccountTable variants={tAccountVariants} />
}

function PipelineTable() {
  return (
    <div className="space-y-3">
      <SectionTitle title="ACCOUNTING PIPELINE EXERCISE" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-14 text-center">Step</TableHead>
            <TableHead>Worksheet/Table</TableHead>
            <TableHead className="w-[220px]">Dependency</TableHead>
            <TableHead className="w-[180px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">1</TableCell>
            <TableCell>Journal</TableCell>
            <TableCell>Source entries</TableCell>
            <TableCell>Ready</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">2</TableCell>
            <TableCell>General Ledger</TableCell>
            <TableCell>From Journal</TableCell>
            <TableCell>Ready</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">3</TableCell>
            <TableCell>Trial Balance</TableCell>
            <TableCell>From Ledger</TableCell>
            <TableCell>Ready</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">4</TableCell>
            <TableCell>Income Statement</TableCell>
            <TableCell>From Adjusted TB</TableCell>
            <TableCell>Pending input</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-center">5</TableCell>
            <TableCell>Balance Sheet</TableCell>
            <TableCell>From Net Income + TB</TableCell>
            <TableCell>Pending input</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

function WorksheetTable() {
  return (
    <div className="space-y-3">
      <SectionTitle title="WORKSHEET (10-COLUMN)" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead rowSpan={2} className="align-bottom">Account Title</TableHead>
            <TableHead colSpan={2} className="text-center">Unadjusted TB</TableHead>
            <TableHead colSpan={2} className="text-center">Adjustments</TableHead>
            <TableHead colSpan={2} className="text-center">Adjusted TB</TableHead>
            <TableHead colSpan={2} className="text-center">Income Statement</TableHead>
            <TableHead colSpan={2} className="text-center">Balance Sheet</TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="text-right">Dr</TableHead>
            <TableHead className="text-right">Cr</TableHead>
            <TableHead className="text-right">Dr</TableHead>
            <TableHead className="text-right">Cr</TableHead>
            <TableHead className="text-right">Dr</TableHead>
            <TableHead className="text-right">Cr</TableHead>
            <TableHead className="text-right">Dr</TableHead>
            <TableHead className="text-right">Cr</TableHead>
            <TableHead className="text-right">Dr</TableHead>
            <TableHead className="text-right">Cr</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cash</TableCell>
            <TableCell className="text-right">4,400</TableCell>
            <TableCell />
            <TableCell className="align-middle"><AmountInput placeholder="___" /></TableCell>
            <TableCell className="align-middle"><AmountInput placeholder="___" /></TableCell>
            <TableCell className="text-right">4,400</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell className="text-right">4,400</TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>Supplies</TableCell>
            <TableCell className="text-right">600</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell className="text-right">600</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell className="text-right">600</TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>Service Revenue</TableCell>
            <TableCell />
            <TableCell className="text-right">5,000</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
            <TableCell className="text-right">5,000</TableCell>
            <TableCell />
            <TableCell className="text-right">5,000</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

const tableMap: Record<number, { title: string; description: string; view: JSX.Element }> = {
  201: {
    title: "Journal (given / locked)",
    description: "General journal format with indented credits and entry explanations.",
    view: <JournalVariantsTable />,
  },
  202: {
    title: "General Ledger",
    description: "Account running balances with editable debit/credit and ending-balance cells.",
    view: <LedgerTable />,
  },
  203: {
    title: "Trial Balance",
    description: "Full variant-driven trial balance schemas with locks, blanks, totals, and practice modes.",
    view: <TrialBalanceVariantsTable />,
  },
  204: {
    title: "Income Statement",
    description: "Income statement with % of revenue and net-income input.",
    view: <IncomeStatementTable />,
  },
  205: {
    title: "Balance Sheet",
    description: "Actual vs budget with variance and liabilities/equity check inputs.",
    view: <BalanceSheetTable />,
  },
  206: {
    title: "T-Accounts",
    description: "True T-account layout with centered account titles and editable debit/credit amounts.",
    view: <TAccountsTable />,
  },
  207: {
    title: "Pipeline Exercise Flow",
    description: "Ordered accounting workflow from journal through final balance sheet.",
    view: <PipelineTable />,
  },
  208: {
    title: "10-Column Worksheet",
    description: "Worksheet with grouped columns for adjustments, adjusted TB, IS, and BS.",
    view: <WorksheetTable />,
  },
}

export function AccountingQuestionView({ questionId }: Props) {
  const entry = tableMap[questionId]

  if (!entry) {
    return null
  }

  return <div className="overflow-x-auto">{entry.view}</div>
}
