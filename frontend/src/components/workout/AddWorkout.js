import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";

export default function CreateWorkout() {
    const navigate = useNavigate();

    const [ workout, setWorkout ] = useState({
        name: "",
        sets: "",
        reps: "",
        time: "",
        type: "",
        createdBy: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();
        await fetch("/workouts/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(workout)
        });
        // console.log(workout)
    setWorkout({workout})
    navigate("/");
    };

    return (
        <div className="content">
            <h1>Create Exercise</h1>
                <Card>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={workout.name}
                                onChange={e => setWorkout({ ...workout, name: e.target.value })}
                                id="name"
                                name="name"
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label htmlFor="type">Type of workout</Form.Label>
                            <Form.Select
                                type="text"
                                min={0}
                                value={workout.type}
                                onChange={e => setWorkout({ ...workout, type: e.target.value })}
                                id="type"
                                name="type"
                            >
                                <option></option>
                                <option value="Upper body">Upper Body</option>
                                <option value="Lower body">Lower Body</option>
                                <option value="Full body">Full Body</option>
                            </Form.Select>
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label htmlFor="sets">Number of sets</Form.Label>
                            <Form.Control
                            type="number"
                            min={0}
                            value={workout.sets}
                            onChange={e => setWorkout({ ...workout, sets: e.target.value })}
                            id="sets"
                            name="sets"
                            />
                        </Form.Group>
                        <br></br>             
                        <Form.Group>
                            <Form.Label htmlFor="reps">Number of reps</Form.Label>
                            <Form.Control
                            type="number"
                            min={0}
                            value={workout.reps}
                            onChange={e => setWorkout({ ...workout, reps: e.target.value })}
                            id="reps"
                            name="reps"
                            />
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Label htmlFor="time">Time (in minutes)</Form.Label>
                            <Form.Control
                            type="number"
                            min={0}
                            value={workout.time}
                            onChange={e => setWorkout({ ...workout, time: e.target.value })}
                            id="time"
                            name="time"
                            />
                        </Form.Group>
                        <br></br>          
                        <Button variant="dark" type="submit">Submit</Button>
                        <Button variant="dark" onClick={() => navigate("/")}>Back</Button>
                    </Form>
                </Card>
        </div>
    );
};