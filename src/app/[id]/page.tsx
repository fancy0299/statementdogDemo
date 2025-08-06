interface Props {
  params: { id: string };
  searchParams: { name?: string };
}
import React from "react";
import { fetchFinMindData } from "@/util/findmindApi";
import ScrollableTable from "@/components/TableContainer";
import { Card } from "@mui/material";
import MyChart from "@/components/MyChart";
function padZero(num: number): string {
  return num < 10 ? "0" + num : String(num);
}

async function Detail({ params, searchParams }: Props) {
  const {id} = await params;
  const { name } = await searchParams;
  const fecthData = async () => {
    try {
      const { data } = await fetchFinMindData("data", {
        dataset: "TaiwanStockMonthRevenue",
        data_id: id,
        start_date: "2020-08-01",
        end_date: "2025-08-01",
      });
      return data;
    } catch (error) {}
  };
  const data = await fecthData();
  const dataMap = new Map<string, number>();

  const dataSoure = {
    columns: [],
    revenue: [],
    growth: [],
  };
  data?.forEach((d) => {
    const key = `${d.revenue_year}/${padZero(d.revenue_month)}`;
    dataSoure.columns.push(key);

    dataSoure.revenue.push(`${(d.revenue / 1000)}`);
    dataMap.set(key, d.revenue);
  });

  // 再次遍历，计算 growth
  data?.forEach((d) => {
    const thisMonthKey = `${d.revenue_year}/${padZero(d.revenue_month)}`;
    const lastYearKey = `${d.revenue_year - 1}/${padZero(d.revenue_month)}`;

    const thisRevenue = dataMap.get(thisMonthKey);
    const lastRevenue = dataMap.get(lastYearKey);

    if (lastRevenue != null && lastRevenue !== 0) {
      const growthRate = ((thisRevenue! - lastRevenue) / lastRevenue) * 100;
      dataSoure.growth.push(Number(growthRate.toFixed(2)));
    } else {
      dataSoure.growth.push("");
    }
  });

  console.log(dataSoure);
  return (
    <div>
      <Card className="py-4 px-6 text-2xl font-semibold">{`${name} (${id})`}</Card>

      <Card  className="py-4 px-6 my-2">
        <MyChart 
          {...dataSoure}
        />
      </Card>
      <Card className="py-4 px-6  ">
        <ScrollableTable {...dataSoure} />
        <div className="text-right mt-4">
          表格單位：千元，數據來自公開資訊觀測站
          網頁圖表歡迎轉貼引用，請註明出處為財報狗
        </div>
      </Card>
    </div>
  );
}

export default Detail;


