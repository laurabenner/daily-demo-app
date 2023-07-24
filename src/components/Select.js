/**
 * @param {function} onChange Function to occur when select value changes
 * @param {array} options List of select options 
 * @returns Select element
 */
export function Select({ onChange, options, showSmall }) {

    function handleChange(e) {
        onChange(e.target.value);
    }

    return (
        <select
            className={"appearance-none outline-none border-2 w-44 border-palette-brown focus:border-palette-dark rounded-full px-5 py-2.5 m-2 text-palette " + (showSmall ? "": "hidden sm:inline ")}
            onChange={(e) => handleChange(e)}>
            {
                options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))
            }
        </select>
    );
}