"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchFinMindData } from "@/util/findmindApi";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

interface DataType {
  key: string;
  label: string;
  value: string;
  name :string
}
export default function CountrySelect() {
  const [dataList, setDataList] = useState<DataType[]>([]);
  const [loading,setLoading] = useState<Boolean>(false)
  const router = useRouter()
  const fecthList = async () => {
    try {
      setLoading(true)
      const { data } = await fetchFinMindData("data", {
        dataset: "TaiwanStockInfo",
      });
      const set = new Set();
      const arr: DataType[] = [];
      data?.forEach((d) => {
        if (!set.has(d.stock_id)) {
          set.add(d.stock_id);
          arr.push({
            value: d.stock_id,
            key: d.stock_id,
            label: `${d.stock_id} ${d.stock_name}`,
            name : d.stock_name
          });
        }
      });
      setDataList(arr);
      // setDataList(data.map(d=>({
      //   value : d.stock_id,
      //   label : d.stock_name,
      //   key : d.stock_id
      // })))
    } catch (error) {}
     finally{
      setLoading(false)
     }
  };
  useEffect(() => {
    fecthList();
  }, []);

  return (
    <Autocomplete<DataType>
      loading={loading}
      id="country-select-demo"
      sx={{ width: 400 }}
      options={dataList}
      autoHighlight
     
      onChange={(e, target) => {
        router.push(`/${target?.value}?name=${encodeURIComponent(target?.name)}`)
      }}
      
      getOptionLabel={(option) => option?.label}
      popupIcon={null}
      clearIcon={null}

      renderInput={(params) => (
        <TextField
          placeholder="輸入台／美股代號，查看公司價值"
          {...params}
          size="small"
          InputProps={{
            ...params.InputProps,
            endAdornment: <SearchIcon sx={{ color: "gray", mr: 1 }} className="absolute right-[-0px]" />,
          }}
        />
      )}
    />
  );
}
