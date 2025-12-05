import React from "react";
import Swal from "sweetalert2"; // npm install sweetalert2
import "../styles/StudentForm.css";

type Props = {
    name: string;
    surname: string;
    age: number;
    rating: number;
};

type State = {
    name: string;
    surname: string;
    age: number;
    rating: number;
    nameValid: boolean;
    surnameValid: boolean;
    ageValid: boolean;
    ratingValid: boolean;
};

export default class StudentForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const { name, surname, age, rating } = props;

        this.state = {
            name,
            surname,
            age,
            rating,
            nameValid: this.validateName(name),
            surnameValid: this.validateSurname(surname),
            ageValid: this.validateAge(age),
            ratingValid: this.validateRating(rating),
        };
    }

    validateName(name: string) {
        return name.trim().length > 2;
    }
    validateSurname(surname: string) {
        return surname.trim().length > 2;
    }
    validateAge(age: number) {
        return age > 0;
    }
    validateRating(rating: number) {
        return rating >= 1 && rating <= 12;
    }

    onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        this.setState({ name: v, nameValid: this.validateName(v) });
    };
    onSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        this.setState({ surname: v, surnameValid: this.validateSurname(v) });
    };
    onAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number(e.target.value);
        this.setState({ age: v, ageValid: this.validateAge(v) });
    };
    onRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number(e.target.value);
        this.setState({ rating: v, ratingValid: this.validateRating(v) });
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { nameValid, surnameValid, ageValid, ratingValid } = this.state;

        if (nameValid && surnameValid && ageValid && ratingValid) {
            const { name, surname, age, rating } = this.state;

            Swal.fire({
                title: "Информация о студенте",
                html: `
                    <div style="text-align: left; font-size: 16px;">
                        <b>Имя:</b> ${name}<br>
                        <b>Фамилия:</b> ${surname}<br>
                        <b>Возраст:</b> ${age}<br>
                        <b>Рейтинг:</b> ${rating}
                    </div>
                `,
                icon: "success",
                confirmButtonText: "ОК",
                confirmButtonColor: "#3a57e8",
            });
        } else {
            Swal.fire({
                title: "Ошибка",
                text: "Проверьте правильность заполнения формы.",
                icon: "error",
                confirmButtonText: "Понятно",
            });
        }
    };

    render() {
        const {
            name, surname, age, rating,
            nameValid, surnameValid, ageValid, ratingValid
        } = this.state;

        return (
            <form className="student-form" onSubmit={this.handleSubmit}>
                <label>
                    Имя:
                    <input
                        type="text"
                        value={name}
                        onChange={this.onNameChange}
                        className={nameValid ? "valid" : "invalid"}
                    />
                </label>

                <label>
                    Фамилия:
                    <input
                        type="text"
                        value={surname}
                        onChange={this.onSurnameChange}
                        className={surnameValid ? "valid" : "invalid"}
                    />
                </label>

                <label>
                    Возраст:
                    <input
                        type="number"
                        value={age}
                        onChange={this.onAgeChange}
                        className={ageValid ? "valid" : "invalid"}
                    />
                </label>

                <label>
                    Рейтинг:
                    <input
                        type="number"
                        value={rating}
                        onChange={this.onRatingChange}
                        className={ratingValid ? "valid" : "invalid"}
                    />
                </label>

                <button type="submit">Отправить</button>
            </form>
        );
    }
}
