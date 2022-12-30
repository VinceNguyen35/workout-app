import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext();
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

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
            setEmptyFields(json.emptyFields);
        }
        if(response.ok) {
            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            setEmptyFields([]);
            console.log("New Workout Added", json);
            dispatch({type: "CREATE_WORKOUT", payload: json});
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
                className={ emptyFields.includes("title") ? "error" : "" }
            />

            <label>Load (in lbs):</label>
            <input
                type="number"
                onChange={(event) => setLoad(event.target.value)}
                value={ load }
                className={emptyFields.includes("load") ? "error" : ""}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(event) => setReps(event.target.value)}
                value={ reps }
                className={emptyFields.includes("reps") ? "error" : ""}
            />

            <button>Add Workout</button>
            { error && <div className="error">{ error }</div> }
        </form>
    );
}
 
export default WorkoutForm;