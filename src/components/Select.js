export function Select({ onChange, options }) {

    function handleChange(e) {
        onChange(e.target.value);
    }

    return (
        <select
            className="appearance-none outline-none border-2 w-44 focus:border-asia-trail rounded-full px-5 py-2.5 m-2 text-asia-trail"
            onChange={(e) => handleChange(e)}>
            {
                options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))
            }
        </select>
    );
}