import React from 'react'
import { Bar } from 'react-chartjs-2';
interface Props {
    data: any[] | undefined,
}

interface Ixaxis {
    axes: string[]
}
interface Iyaxis {
    events?: number[],
    impressions?: number[],
    clicks?: number[],
    revenue?: number[],
}
const SetYaxis = ['events', 'impressions', 'clicks', 'revenue'] as const;
const SetXaxis = ['hour', 'date'] as const;
export const BarChart: React.FC<Props> = (props) => {
    const [xaxis, Setxaxis] = React.useState<string[]>([]);
    const [yaxis, Setyaxis] = React.useState<Iyaxis>();
    const [oldDate, SetoldDate] = React.useState<string[]>([]);
    const olddate = React.useRef<string>();
    React.useEffect(() => {
        props.data?.forEach(res => {
            Setxaxis(prev => [...prev, res.date + ";" + res.hour]);
            // Setxaxis(prev => {
            //     const old = prev
            //     old.push(res.date + ';' + res.hour)
            //     return [old]

            //     // }else{
            //     //     oldaxes.push(res.date + ';' + res.hour)
            //     //     return {...prev,  axes:oldaxes}
            //     // }

            // })
            SetYaxis.forEach(i => {
                if (i in res) {
                    Setyaxis((prev) => {

                        let old = (prev ? prev[i] : undefined);
                        if (old === undefined) {
                            old = []
                        }
                        old.push(res[i]);
                        return { ...prev, events: old }
                    })
                }
            })
            // if ('events' in res) {
            //     Setyaxis((prev) => {
            //         let events = prev?.events;
            //         if (events === undefined) {
            //             events = []
            //         }
            //         events.push(res.events);
            //         return { ...prev, events: events }
            //     })
            // }
            // if ('impressions' in res) {
            //     Setyaxis((prev) => {
            //         return { ...prev, impressions: [...res.impressions] }
            //     })
            // }
            // if ('clicks' in res) {
            //     Setyaxis((prev) => {
            //         return { ...prev, clicks: [...res.clicks] }
            //     })
            // }

            // if ('revenue' in res) {
            //     Setyaxis((prev) => {
            //         return { ...prev, revenue: [...res.revenue] }
            //     })

            // }
        })



    }, [props.data])

    const generatedataset = () => {
        const dataset: any[] = []
        if (yaxis !== undefined) {
            SetYaxis.forEach(i => {
                if (i in yaxis) {
                    const data = {
                        label: i,
                        data: yaxis[i]
                    }
                    dataset.push(data)
                }
            })

        }
        return dataset;

    }
    const generatexAxes = () => {
        const out = []
        if (xaxis !== undefined) {
            out.push({
                id: 'xAxis1',
                type: "category",
                ticks: {
                    callback: function (label: string) {
                        var date = label.split(";")[0];
                        var hour = label.split(";")[1];
                        if (hour == 'undefined') {
                            return date
                        } else {
                            return hour
                        }
                    }
                }
            })
            out.push({
                id: 'xAxis2',
                type: "category",
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
                ticks: {
                    callback: function (label: string) {
                        var date = label.split(";")[0];
                        var hour = label.split(";")[1];
                        console.log(hour)
                        if (hour === 'undefined') {
                            return "";
                        }
                        // else {
                        //     if (oldDate !== date) {
                        //         SetoldDate(date);
                        //         return date;
                        //     } else {
                        //         return "";
                        //     }

                        // }
                    }
                }
            })


        }
        return out;
    }
    console.log(xaxis);
    return (<div>
        {yaxis && xaxis ? <Bar
            type='bar'
            data={{
                labels: xaxis,
                datasets: generatedataset()
            }}
            height={400}
            width={600}
            options={{
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        id: 'xAxis1',
                        type: "category",
                        scaleLabel: {
                            display: true,
                            labelString: 'hour'
                        },
                        ticks: {
                            callback: function (label: string) {
                                var date = label.split(";")[0];
                                var hour = label.split(";")[1];
                                if (hour == 'undefined') {
                                    return date
                                } else {
                                    return hour
                                }
                            }
                        }
                    }, {
                        id: 'xAxis2',
                        type: "category",
                        gridLines: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'date'
                        },
                        ticks: {
                            autoSkip: false,
                            callback: function (label: string) {
                                var date = label.split(";")[0];
                                var hour = label.split(";")[1];
                                if (hour === 'undefined') {
                                    return "";
                                }
                                else {
                                    if (date !== olddate.current) {
                                        olddate.current = date
                                        return date
                                    }
                                    else {
                                        return "";
                                    }

                                }
                            }
                        }
                    }],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }}

        /> : ""}
    </div>);
}