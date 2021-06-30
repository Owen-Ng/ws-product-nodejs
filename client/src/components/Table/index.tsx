import React from 'react'

import { Itable_data } from '../../interfaces';
import './index.css';
interface Props {
    data: Itable_data[] | undefined
}

function useOutsideAlerter(ref: React.RefObject<HTMLButtonElement>, callback: React.Dispatch<React.SetStateAction<String[] | undefined>>) {
    React.useEffect(() => {

        function handleClickOutside(event: any) {
            if (ref && ref.current && !ref.current.contains(event.target)) {
                callback(undefined);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
export const Table: React.FC<Props> = (props) => {
    const [filteredData, SetfilteredDate] = React.useState<Itable_data[] | undefined>();
    const [suggestion, SetSuggestion] = React.useState<String[]>();
    const [SearchInput, SetSearchInput] = React.useState<string>("");
    const wrapperRef = React.useRef(null);
    useOutsideAlerter(wrapperRef, SetSuggestion);
    React.useEffect(() => {
        SetfilteredDate(props.data?.slice(0, 9));
    }, [props.data]);
    function SearchHandler(events: React.ChangeEvent<HTMLInputElement>) {
        const val = events.target.value;
        const result: String[] = [];
        if (props.data) {
            for (let res of props.data) {
                const d = new Date(res.date);
                if (d.toDateString().toLowerCase().includes(val) && !result.includes(d.toDateString().toLowerCase())) {
                    result.push(d.toDateString());
                }
                else if (res.name.toLowerCase().includes(val) && !result.includes(res.name)) {
                    result.push(res.name);
                }
                if (result.length >= 5) {
                    break;
                }
            }
        }
        SetSuggestion(result);
        SetSearchInput(val);
    }

    function ClickHandler() {
        const result: Itable_data[] = []
        const val = SearchInput;

        if (props.data) {
            for (let res of props.data) {
                const d = new Date(res.date);
                if (d.toDateString().includes(val) || res.name.includes(val)) {
                    result.push(res)
                }
                if (result.length >= 10) {
                    break;
                }
            }
        }


        SetfilteredDate(result)
    }

    function SuggestionHandler(val: String) {
        const s: string = val as string;
        SetSearchInput(s);

    }

    return (
        <div className="table-box" ref={wrapperRef} >
            <h1>Table</h1>

            <div className="wrapper">
                <div className="search-input">
                    <a href="" target="_blank" hidden></a>
                    <input type="text" placeholder="Type to search.." value={SearchInput} onChange={SearchHandler} />
                    <div className="autocom-box">
                        {suggestion?.slice(0, 4).map(res => { return <li onClick={() => SuggestionHandler(res)} >{res}</li> })}
                    </div>
                    <div className="icon" onClick={ClickHandler}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg></div>
                </div>
            </div>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Events</th>
                    <th>Impressions</th>
                    <th>Revenue</th>
                    <th>Clicks</th>
                </tr>
                {filteredData?.map(res => {
                    const d = new Date(res.date);
                    return (
                        <tr>
                            <td>{res.poi_id}</td>
                            <td>{d.toDateString()}</td>
                            <td>{res.name}</td>
                            <td>{res.events}</td>
                            <td>{res.impressions}</td>
                            <td>{res.revenue}</td>
                            <td>{res.clicks}</td>
                        </tr>
                    )
                })}
            </table>
        </div>);
}