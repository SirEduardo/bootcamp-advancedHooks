import "./Timer.css"

export const Timer = ({ date }) => {
    return (
        <h1>{date.toLocaleTimeString()}</h1>
    )
}