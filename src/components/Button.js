export function Button({ onClick, type, sort }) {
    return (
        <button
            className={"appearance-none hidden sm:inline border-2 rounded-full px-5 py-2.5 m-2 "
                + (type === sort ? "border-asia-trail bg-asia-trail text-white" : "text-asia-trail")}
            onClick={onClick}>{"Sort By " + type}
        </button>
    );
}