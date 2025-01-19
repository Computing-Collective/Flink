"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AffiliateLink = {
  id: string;
  originalUrl: string;
  customUrl: string;
  summary: string;
  productName: string;
};

export const columns: ColumnDef<AffiliateLink>[] = [
  {
    accessorKey: "originalUrl",
    header: () => <div className="text-right">Original URL</div>,
    cell: ({ row }) => {
      const originalUrl = row.getValue("originalUrl") as string;
      return <div className="text-right font-medium">{originalUrl}</div>;
    },
  },
  {
    accessorKey: "customUrl",
    header: () => <div className="text-right">Custom URL</div>,
    cell: ({ row }) => {
      const customUrl = row.getValue("customUrl") as string;
      return <div className="text-right font-medium">{customUrl}</div>;
    },
  },
  {
    accessorKey: "summary",
    header: () => <div className="text-right">Summary</div>,
    cell: ({ row }) => {
      const summary = row.getValue("summary") as string;
      return <div className="text-right font-medium">{summary}</div>;
    },
  },
  {
    accessorKey: "productName",
    header: () => <div className="text-right">Product Name</div>,
    cell: ({ row }) => {
      const productName = row.getValue("productName") as string;
      return <div className="text-right font-medium">{productName}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 bg-transparent">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
