import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ALPHABET, MONTH_NAMES } from "./constants/constants";

function App() {
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get(
                "https://yalantis-react-school-api.yalantis.com/api/task0/users"
            );
            setData(response.data);
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const parsedId = JSON.parse(localStorage.getItem("selectedId") || []);
        setSelectedId(parsedId);
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedId", JSON.stringify(selectedId));
    }, [selectedId]);

    const getCheckId = (checked, id) => {
        setSelectedId(
            checked ? [...selectedId, id] : selectedId.filter((elem) => elem !== id)
        );
    };

    const checkedUsers = data.filter(({ id }) => selectedId.includes(id));

    const groupedUsersByMonth = MONTH_NAMES.map((elem, index) =>
        checkedUsers.filter(({ dob }) => index === new Date(dob).getMonth())
    );

    return (
        <div className="usersListCover">
            <div>
                <h2>Employees</h2>
                <div className="usersList">
                    {ALPHABET.map((letter, index) => {
                        const users = data
                            ? data.filter(({ lastName }) => lastName[0] === letter)
                            : [];
                        return (
                            <div className="alphabet" key={index}>
                                <h3>{letter}</h3>
                                {users.length > 0 ? (
                                    users.map(({ lastName, firstName, id }) => (
                                        <div className="usersName" key={id}>
                                            <p>{`${lastName} ${firstName}`} </p>
                                            <input
                                                type="checkbox"
                                                checked={selectedId.includes(id)}
                                                onChange={(value) => {
                                                    getCheckId(value.target.checked, id);
                                                }}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p>----</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="birthdayListCover">
                <h2 className="titleOfBirthdayList"> Employees birthday</h2>
                {selectedId.length > 0 ? (
                    groupedUsersByMonth.map((elem, monthByIndex) => {
                        const monthName = MONTH_NAMES.find(
                            (elem, index) => index === monthByIndex
                        );
                        return (
                            <div key={monthByIndex}>
                                {elem.length > 0 && <p>{monthName}</p>}
                                {elem.map(({ lastName, firstName, dob, id }) => {
                                    const birthday = new Date(dob);
                                    return (
                                        <div key={id}>
                                            <ul>
                                                <li>
                                                    {`${lastName} ${firstName} - ${birthday.getDate()} ${monthName} ${birthday.getFullYear()} year`}
                                                </li>
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })
                ) : (
                    <p>No selected employees</p>
                )}
            </div>
        </div>
    );
}

export default App;