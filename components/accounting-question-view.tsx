"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { TAccountTable, type TAccountData, type TAccountVariant } from "@/components/t-account-table"
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

function JournalTable() {
  return (
    <div className="space-y-3">
      <SectionTitle title="GENERAL JOURNAL" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[110px]">Date</TableHead>
            <TableHead>Account Titles and Explanation</TableHead>
            <TableHead className="w-[140px] text-right">Debit</TableHead>
            <TableHead className="w-[140px] text-right">Credit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Jan 01</TableCell>
            <TableCell>Cash</TableCell>
            <TableCell className="text-right">5,000</TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell className="pl-8">Service Revenue</TableCell>
            <TableCell />
            <TableCell className="text-right">5,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell className="text-xs text-muted-foreground" colSpan={3}>
              (Provided services for cash)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jan 03</TableCell>
            <TableCell>Supplies</TableCell>
            <TableCell className="text-right">600</TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell className="pl-8">Cash</TableCell>
            <TableCell />
            <TableCell className="text-right">600</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
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

function TrialBalanceTable() {
  return (
    <div className="space-y-3">
      <SectionTitle title="TRIAL BALANCE" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account Title</TableHead>
            <TableHead className="w-[160px] text-right">Debit (Dr)</TableHead>
            <TableHead className="w-[160px] text-right">Credit (Cr)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cash</TableCell>
            <TableCell className="align-middle">
              <div className="flex justify-end">
                <AmountInput placeholder="______" />
              </div>
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>Supplies</TableCell>
            <TableCell className="text-right">600</TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>Service Revenue</TableCell>
            <TableCell />
            <TableCell className="align-middle">
              <div className="flex justify-end">
                <AmountInput placeholder="______" />
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold">TOTALS</TableCell>
            <TableCell className="text-right font-semibold">5,000</TableCell>
            <TableCell className="text-right font-semibold">5,000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
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
    view: <JournalTable />,
  },
  202: {
    title: "General Ledger",
    description: "Account running balances with editable debit/credit and ending-balance cells.",
    view: <LedgerTable />,
  },
  203: {
    title: "Trial Balance",
    description: "Trial balance with locked totals and selected input blanks.",
    view: <TrialBalanceTable />,
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

  if (questionId === 206) {
    return <div>{entry.view}</div>
  }

  return (
    <Card className="rounded-none">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">{entry.title}</CardTitle>
          <Badge variant="secondary" className="rounded-none">
            Accounting
          </Badge>
        </div>
        <CardDescription>{entry.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto">{entry.view}</div>
      </CardContent>
    </Card>
  )
}
