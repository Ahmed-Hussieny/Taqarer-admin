export default function MoreButton({ title, func }: { title: string, func?: () => void }) {
    return (
        <div className="flex m-auto justify-center items-center bg-main_color text-white px-6 py-2 border-2 border-main_color rounded-lg cursor-pointer 
                        sm:px-3 sm:py-1 lg:px-5 lg:py-2 max-w-max font-bold" onClick={func}>
            <p className="inline mx-2 text-sm">{title}</p>
        </div>
    )
}
