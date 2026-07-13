import {

PieChart,
Pie,
Cell,
Tooltip,
Legend,
ResponsiveContainer

} from "recharts";

import "../styles/dashboard.css";

const COLORS = [

"#3B82F6",
"#10B981",
"#F59E0B",
"#EF4444",
"#8B5CF6",
"#EC4899"

];

function ExpensePieChart({data}){

return(

<div className="chart-card">

<h2>Expense Distribution</h2>

<ResponsiveContainer
width="100%"
height={350}
>

<PieChart>

<Pie

data={data}

dataKey="total"

nameKey="_id"

outerRadius={120}

label

>

{

data.map((entry,index)=>(

<Cell

key={index}

fill={COLORS[index%COLORS.length]}

/>

))

}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

)

}

export default ExpensePieChart;