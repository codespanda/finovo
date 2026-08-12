import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const AXIS_STYLE = { fontSize: 11 }

export function MiniAreaChart({
  data,
  dataKey = "value",
  color = "var(--color-chart-1)",
}: {
  data: Record<string, number | string>[]
  dataKey?: string
  color?: string
}) {
  return (
    <ResponsiveContainer width="100%" height={56}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#grad-${dataKey})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function TrendAreaChart({
  data,
  xKey,
  series,
  height = 260,
}: {
  data: Record<string, number | string>[]
  xKey: string
  series: { key: string; color: string; label: string }[]
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ left: -18, right: 8, top: 8 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`area-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} stroke="var(--color-border)" />
        <XAxis dataKey={xKey} tick={AXIS_STYLE} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" />
        <YAxis tick={AXIS_STYLE} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" />
        <Tooltip
          contentStyle={{
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        {series.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={2}
            fill={`url(#area-${s.key})`}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function TrendLineChart({
  data,
  xKey,
  series,
  height = 260,
}: {
  data: Record<string, number | string>[]
  xKey: string
  series: { key: string; color: string; label: string }[]
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ left: -18, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} stroke="var(--color-border)" />
        <XAxis dataKey={xKey} tick={AXIS_STYLE} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" />
        <YAxis tick={AXIS_STYLE} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" />
        <Tooltip
          contentStyle={{
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stroke={s.color}
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 0, fill: s.color }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

export function ComparisonBarChart({
  data,
  xKey,
  series,
  height = 260,
}: {
  data: Record<string, number | string>[]
  xKey: string
  series: { key: string; color: string; label: string }[]
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ left: -18, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} stroke="var(--color-border)" />
        <XAxis dataKey={xKey} tick={AXIS_STYLE} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" />
        <YAxis tick={AXIS_STYLE} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" />
        <Tooltip
          contentStyle={{
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12,
          }}
          cursor={{ fill: "var(--color-muted)" }}
        />
        {series.map((s) => (
          <Bar key={s.key} dataKey={s.key} name={s.label} fill={s.color} radius={[4, 4, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export function BarLineChart({
  data,
  xKey,
  bar,
  line,
  height = 280,
}: {
  data: Record<string, number | string>[]
  xKey: string
  bar: { key: string; color: string; label: string }
  line: { key: string; color: string; label: string }
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ left: -12, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} stroke="var(--color-border)" />
        <XAxis dataKey={xKey} tick={AXIS_STYLE} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" />
        <YAxis
          yAxisId="left"
          tick={AXIS_STYLE}
          tickLine={false}
          axisLine={false}
          stroke="var(--color-muted-foreground)"
          tickFormatter={(v: number) => (v >= 100000 ? `${v / 100000}L` : String(v))}
        />
        <YAxis yAxisId="right" orientation="right" tick={AXIS_STYLE} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" />
        <Tooltip
          contentStyle={{
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12,
          }}
          cursor={{ fill: "var(--color-muted)" }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" iconSize={8} />
        <Bar yAxisId="left" dataKey={bar.key} name={bar.label} fill={bar.color} radius={[4, 4, 0, 0]} barSize={22} />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={line.key}
          name={line.label}
          stroke={line.color}
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 0, fill: line.color }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export function MultiBarLineChart({
  data,
  xKey,
  bars,
  line,
  height = 300,
}: {
  data: Record<string, number | string>[]
  xKey: string
  bars: { key: string; color: string; label: string }[]
  line: { key: string; color: string; label: string }
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ left: -12, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} stroke="var(--color-border)" />
        <XAxis dataKey={xKey} tick={AXIS_STYLE} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" />
        <YAxis
          yAxisId="left"
          tick={AXIS_STYLE}
          tickLine={false}
          axisLine={false}
          stroke="var(--color-muted-foreground)"
          tickFormatter={(v: number) => (v >= 100000 ? `${v / 100000}L` : String(v))}
        />
        <YAxis yAxisId="right" orientation="right" tick={AXIS_STYLE} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" />
        <Tooltip
          contentStyle={{
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12,
          }}
          cursor={{ fill: "var(--color-muted)" }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} iconType="circle" iconSize={8} />
        {bars.map((b) => (
          <Bar key={b.key} yAxisId="left" dataKey={b.key} name={b.label} fill={b.color} radius={[4, 4, 0, 0]} barSize={16} />
        ))}
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={line.key}
          name={line.label}
          stroke={line.color}
          strokeWidth={2}
          dot={{ r: 3, strokeWidth: 0, fill: line.color }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}

export interface DonutDatum {
  name: string
  value: number
  color: string
}

export function DonutChart({
  data,
  total,
  totalLabel,
  size = 160,
}: {
  data: DonutDatum[]
  total: string
  totalLabel?: string
  size?: number
}) {
  const outerRadius = size / 2
  const innerRadius = outerRadius * 0.72
  const holeDiameter = innerRadius * 2
  // Shrink the total figure to fit the donut hole on one line instead of wrapping into the ring.
  const totalFontSize = Math.max(11, Math.min(18, Math.floor((holeDiameter * 1.55) / Math.max(total.length, 1))))

  return (
    <div className="relative mx-auto shrink-0" style={{ width: size, height: size }}>
      <PieChart width={size} height={size} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx={outerRadius}
          cy={outerRadius}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={90}
          endAngle={-270}
          paddingAngle={2}
          stroke="none"
          isAnimationActive={false}
        >
          {data.map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "var(--color-popover)",
            border: "1px solid var(--color-border)",
            borderRadius: 8,
            fontSize: 12,
          }}
        />
      </PieChart>
      <div
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
        style={{ width: holeDiameter, height: holeDiameter, margin: "auto" }}
      >
        <span className="leading-tight font-bold whitespace-nowrap text-foreground" style={{ fontSize: totalFontSize }}>
          {total}
        </span>
        {totalLabel && <span className="text-muted-foreground text-xs leading-tight">{totalLabel}</span>}
      </div>
    </div>
  )
}

export function DonutLegend({ data }: { data: DonutDatum[] }) {
  return (
    <ul className="flex flex-col gap-2 text-sm">
      {data.map((d) => (
        <li key={d.name} className="flex items-center gap-2">
          <span className="size-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
          <span className="text-muted-foreground min-w-0 flex-1 truncate">{d.name}</span>
          <span className="font-medium text-foreground">{d.value}%</span>
        </li>
      ))}
    </ul>
  )
}
