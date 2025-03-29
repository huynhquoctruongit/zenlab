"use client"

import { Bar, BarChart, XAxis } from "recharts"
import { useEffect, useState } from "react"
import axios from "axios"
import { enumTypeTitle, NEXT_PUBLIC_CMS } from "@/services/helpers"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import AxiosClient from "@/lib/api/axios-client"

const chartConfig = {
  reading: {
    label: "Reading",
    color: "#4A8BFF",
  },
  listening: {
    label: "Listening", 
    color: "#75C3FF",
  },
  writing: {
    label: "Writing",
    color: "#B4C5FA",
  },
  speaking: {
    label: "Speaking",
    color: "#E0BBF5",
  }
} satisfies ChartConfig

const Chart = () => {
  const [chartData, setChartData] = useState<any[]>([])
  const [total, setTotal] : any = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy ngày thứ 2 và chủ nhật của tuần hiện tại
        const curr = new Date()
        const monday = new Date(curr)
        monday.setDate(curr.getDate() - (curr.getDay() || 7) + 2) // Thứ 2
        monday.setHours(0, 0, 0, 0)
        
        const sunday = new Date(curr)
        sunday.setDate(curr.getDate() - (curr.getDay() || 7) + 8) // Chủ nhật
        sunday.setHours(23, 59, 59, 999)

        const response = await AxiosClient.get(`/items/answer`, {
          params: {
            filter: {
              _and: [
                {
                  date_created: {
                    _between: [monday.toISOString(), sunday.toISOString()]
                  }
                },
                {
                  user_created: {
                    _eq: '$CURRENT_USER'
                  }
                }
              ]
            }
          }
        })

        // Tạo mảng các ngày từ thứ 2 đến chủ nhật
        const dates = []
        for(let d = new Date(monday); d <= sunday; d.setDate(d.getDate() + 1)) {
          dates.push(new Date(d).toISOString().split('T')[0])
        }
        // Khởi tạo dữ liệu mặc định cho tất cả các ngày
        const defaultData = dates.reduce((acc: any, date) => {
          acc[date] = {
            date,
            reading: 0,
            listening: 0,
            writing: 0,
            speaking: 0
          }
          return acc
        }, {})

        // Gộp dữ liệu từ response
        const groupedData = response.data.data.reduce((acc: any, item: any) => {
          const date = new Date(item.date_created).toISOString().split('T')[0]
          acc[date][enumTypeTitle[item.data_type]?.toLowerCase()] += 1 || 0
          return acc
        }, defaultData)

        // Chuyển đổi thành mảng để hiển thị
        const formattedData = Object.values(groupedData)
        setChartData(formattedData)
        setTotal(response.data.data)

      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Biểu đồ làm bài tập theo <span className="text-primary1">Tuần</span> hiện tại</CardTitle>
        <CardDescription>
          <div className="text-black">
          <p className="text-xs mt-2 font-light">Mỗi tuần sẽ có:</p>
            <div className="text-xs font-bold">
            <span> 2 bài Reading</span>,
            <span> 2 bài Listening</span>,
            <span> 1 bài Speaking</span>,
            <span> 1 bài Writing</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {total.length === 0 ? <div className="w-full py-20 h-full flex items-center justify-center"> 
        <div className="flex flex-col items-center justify-center">
        <img src="/images/communication.png" alt="empty" className="w-40 h-40" />
        <p className="text-sm text-gray-400 font-extralight mt-10">Chúng tôi chưa nhận được kết quả từ bạn trong tuần này.</p>
        </div>
        </div> :
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const days = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"]
                const dayIndex = new Date(value).getDay()
                return days[dayIndex === 0 ? 6 : dayIndex - 1]
              }}
            />
            <Bar
              dataKey="reading"
              stackId="a"
              fill={chartConfig.reading.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="listening"
              stackId="a" 
              fill={chartConfig.listening.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="writing"
              stackId="a"
              fill={chartConfig.writing.color}
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="speaking"
              stackId="a"
              fill={chartConfig.speaking.color}
              radius={[4, 4, 0, 0]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="w-[180px]"
                  formatter={(value, name, item, index) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                        style={{
                          backgroundColor: chartConfig[name as keyof typeof chartConfig]?.color
                        }}
                      />
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {value}
                        <span className="font-normal text-muted-foreground">
                          lần nộp
                        </span>
                      </div>
                      {index === 3 && (
                        <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                          Tổng lần nộp
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {item.payload.reading + item.payload.listening + item.payload.writing + item.payload.speaking}
                            <span className="font-normal text-muted-foreground">
                              điểm
                            </span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                />
              }
              cursor={false}
              defaultIndex={0}
            />
            
          </BarChart>
        </ChartContainer>
        }
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {Object.entries(chartConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: config.color }}
              />
              <span className="text-sm text-gray-600">{config.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default Chart;
