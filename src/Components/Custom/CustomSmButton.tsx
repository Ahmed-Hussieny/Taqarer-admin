export default function CustomSmButton({ title, func }: { title: string, func?: () => void }) {
    return (
        <div>
            <div className="bg-transparent flex justify-center items-center hover:bg-main_color hover:text-white text-main_color px-6 py-2 border-2 border-main_color rounded-lg cursor-pointer 
                        sm:px-3 sm:py-1 lg:px-5 lg:py-2 max-w-max font-bold" onClick={func}>
                <p className="inline mx-2 text-sm sm:text-xs lg:text-base">{title}</p>
            </div>
        </div>
    )
}
