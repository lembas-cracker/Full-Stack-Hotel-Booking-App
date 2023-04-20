import './hotel-list.css'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import { useState, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { useOutside } from '../useOutsideHook'
import SearchItem from '../components/SearchItem'



const HotelList = () => {
    const location = useLocation()
    const [destination, setDestination] = useState(location.state.destination)
    const [date, setDate] = useState(location.state.date)
    const [openDate, setOpenDate] = useState(false)
    const [options, setOptions] = useState(location.state.options)


    const dateRef = useRef()
    useOutside(dateRef, useCallback(() => setOpenDate(false), []))
    const optionsRef = useRef()
    useOutside(optionsRef, useCallback(() => setOptions(false), []))


    return (
        <div>
            <Navbar />
            <Header type='list' />
            <div className="list-container">
                <div className="list-wrapper">
                    <div className="list-search">
                        <h1 className="list-title">Search</h1>
                        <div className="list-item">
                            <label>Destination</label>
                            <input placeholder={destination} type="text" />
                        </div>
                        <div className="list-item" ref={dateRef}>
                            <label htmlFor="">Check-in Date</label>

                            <span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, 'MM/dd/yyyy')} to ${format(date[0].endDate, 'MM/dd/yyyy')}`}</span>
                            {openDate && <DateRange
                                onChange={item => setDate([item.selection])}
                                ranges={date}
                                minDate={new Date()}
                            />}

                        </div>
                        <div className="list-item">
                            <label>Options</label>
                            <div className="list-options">
                                <div className="list-option-item">
                                    <span className="list-option-text">Min price <small>per night</small></span>
                                    <input type="number" className="list-option-input" />
                                </div>
                                <div className="list-option-item">
                                    <span className="list-option-text">Max price <small>per night</small></span>
                                    <input type="number" className="list-option-input" />
                                </div>
                                <div className="list-option-item">
                                    <span className="list-option-text">Adult</span>
                                    <input type="number" className="list-option-input" placeholder={options.adult} min={1} />
                                </div>
                                <div className="list-option-item">
                                    <span className="list-option-text">Children</span>
                                    <input type="number" className="list-option-input" placeholder={options.children} min={0} />
                                </div>
                                <div className="list-option-item">
                                    <span className="list-option-text">Room</span>
                                    <input type="number" className="list-option-input" placeholder={options.room} min={1} />
                                </div>
                            </div>
                        </div>
                        <button>Search</button>
                    </div>
                    <div className="list-result">
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                        <SearchItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelList