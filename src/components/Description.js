export function Description({ description }) {
    return (
        <div className="col-start-4 sm:col-start-3 col-end-12 row-span-1 text-lg text-palette">
            <p>
                {description}
            </p>
        </div>
    );
}