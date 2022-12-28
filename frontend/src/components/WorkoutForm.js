import { useState } from "react"

const WorkoutForm = () => {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const workout = {title, load, reps};

        const response = await fetch("/api/workouts", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(workout)
        });
        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
        }
        if(response.ok) {
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            console.log("New Workout Added", json);
        }
    }

    return (
        <form className="create" onSubmit={ handleSubmit }>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input
                type="text"
                onChange={ (event) => setTitle(event.target.value) }
                value={ title }
            />

            <label>Load (in lbs):</label>
            <input
                type="number"
                onChange={(event) => setLoad(event.target.value)}
                value={ load }
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(event) => setReps(event.target.value)}
                value={ reps }
            />

            <button>Add Workout</button>
            { error && <div className="error">{ error }</div> }
        </form>
    );
}
 
export default WorkoutForm;