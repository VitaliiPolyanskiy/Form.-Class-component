import React from "react";
import StudentForm from "./components/StudentForm.tsx";

export default class App extends React.Component {
    render() {
        return (
            <div style={{ padding: "20px" }}>
                <h1>Форма студента</h1>

                <StudentForm
                    name="Петро"
                    surname="Шевченко"
                    age={20}
                    rating={11}
                />
            </div>
        );
    }
}
