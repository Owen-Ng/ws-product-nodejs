import React from 'react'
import { Radar } from 'react-chartjs-2';
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
const colorData = { 'events': 'blue', 'impressions': 'red', 'clicks': 'yellow', 'revenue': 'blue' } as const;
export const RadarChart: React.FC<Props> = (props) => {
    const [xaxis, Setxaxis] = React.useState<string[]>([]);
    const [yaxis, Setyaxis] = React.useState<Iyaxis>();
    const olddate = React.useRef<string>();
    React.useEffect(() => {
        if (!(xaxis === [] || yaxis === undefined)) {
            Setxaxis([]);
            Setyaxis(undefined);
        }
        props.data?.forEach(res => {
            Setxaxis(prev => {
                if (res.hour === undefined) {
                    return [...prev, DateExcessRemoval(res.date)];
                } else {
                    return [...prev, DateExcessRemoval(res.date) + ", " + res.hour + " Hours after"]
                };
            }
            )
            SetYaxis.forEach(i => {
                if (i in res) {
                    Setyaxis((prev) => {

                        let old = (prev ? prev[i] : undefined);
                        if (old === undefined) {
                            old = []
                        }
                        old.push(res[i]);
                        return { ...prev, [i]: old }
                    })
                }
            })

        })



    }, [props.data])

    const generatedataset = () => {
        const dataset: any[] = []
        if (yaxis !== undefined) {
            SetYaxis.forEach(i => {
                if (i in yaxis) {
                    const data = {
                        label: i,
                        data: yaxis[i],
                        backgroundColor: colorData[i]
                    }
                    dataset.push(data)
                }
            })

        }
        return dataset;

    }
    function DateExcessRemoval(date: string): string {
        return date.split('T')[0];
    }
    const generatexAxes = () => {
        const out = []
        const hourly = props.data ? props.data[0].hour : false;
        console.log(hourly);
        if (xaxis !== undefined) {
            const xaxis1 = {
                id: 'xAxis1',
                type: "category",
                scaleLabel: {},
                ticks: {
                    callback: function (label: string) {
                        var date = label.split(";")[0];
                        var hour = label.split(";")[1];
                        if (hour == 'undefined') {
                            return DateExcessRemoval(date);
                        } else {
                            return hour;
                        }
                    }

                }
            }

            const xaxis2 = {
                id: 'xAxis2',
                type: "category",
                gridLines: {
                    drawOnChartArea: false,
                },
                scaleLabel: {},
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
                                return DateExcessRemoval(date);
                            }
                            else {
                                return "";
                            }

                        }
                    }
                }

            }
            if (hourly || hourly == 0) {
                xaxis1['scaleLabel'] = {
                    display: true,
                    labelString: 'Hour'
                }
                xaxis2['scaleLabel'] = {
                    display: true,
                    labelString: 'Date'
                }
            } else {
                xaxis1['scaleLabel'] = {
                    display: true,
                    labelString: 'Date'
                }
                xaxis2['scaleLabel'] = {
                    display: false,
                    labelString: 'Hour'
                }

            }
            out.push(xaxis1);
            out.push(xaxis2);

        }
        return out;
    }

    return (<div>
        {yaxis && xaxis ? <Radar
            type='bar'
            data={{
                labels: xaxis,
                datasets: generatedataset()
            }}
            height={400}
            width={600}
            options={{
                maintainAspectRatio: false,
                tooltips: {
                    enabled: true,
                    callbacks: {
                        label: function (tooltipItem: any, data: any) {
                            return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        }
                    }
                }
                // scales: {
                //     // xAxes: generatexAxes(),
                //     yAxes: [
                //         {
                //             ticks: {
                //                 beginAtZero: true
                //             }
                //         }
                //     ]
                // },
                // tooltips: {
                //     callbacks: {
                //         title: function (t: any[], d: any) {
                //             console.log(t);
                //             const label = d.labels[t[0].index];
                //             var date = label.split(";")[0];
                //             var hour = label.split(";")[1];
                //             if (hour === 'undefined') {
                //                 return DateExcessRemoval(date)
                //             } else {
                //                 return DateExcessRemoval(date) + ", " + hour + " hours after";


                //             }
                //         }
                //     }
                // }
            }}

        /> : ""}
    </div>);
}