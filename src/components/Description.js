export function Description({ description }) {
    return (
        <div className="description col-start-4 sm:col-start-3 col-end-12 row-span-1">
            <p>
                {description}
            </p>
        </div>
    );
}