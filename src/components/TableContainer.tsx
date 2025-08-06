"use client";
import React, { useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Props {
  columns: string[];
  revenue: string[];
  growth: string[];
}
export default function ScrollableTable(props: Props) {
  const { columns, revenue, growth } = props;
  const containerRef = useRef<HTMLDivElement>(null);

  // 页面加载后滚动到最右侧
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ overflowX: "auto", maxWidth: "100%" }}
      ref={containerRef}
    >
      <Table
        sx={{
          minWidth: 700,
          "& tbody tr:nth-of-type(even)": {
            backgroundColor: "#f9f9f9",
          },
        }}
        stickyHeader
      >
        <TableHead 

        >
          <TableRow
                 
          >
            <TableCell
              sx={{
                position: "sticky",
                left: 0,
                backgroundColor : "#f9f9f9",
                zIndex: 2,
                minWidth: 160, // 👈 设置更大的宽度
                maxWidth: 200,
                whiteSpace: "nowrap", // 不换行
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              年月
            </TableCell>
            {columns.map((col) => (
              <TableCell key={col} align="right" sx={{ backgroundColor : "#f9f9f9",}}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>每月营收</TableCell>
            {revenue.map((val, idx) => (
              <TableCell key={idx} align="right">
                {val.toLocaleString()}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>单月营收年增率 (%)</TableCell>
            {growth.map((val, idx) => (
              <TableCell key={idx} align="right">
                {val}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
