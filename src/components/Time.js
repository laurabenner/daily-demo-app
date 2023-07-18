export function Time({ time }) {
    return (
        <div className="col-start-1 col-span-3 pr-8 sm:pr-1 sm:col-span-2 row-span-2 text-lg text-palette">
            <p>{time}</p>
        </div>
    );
}