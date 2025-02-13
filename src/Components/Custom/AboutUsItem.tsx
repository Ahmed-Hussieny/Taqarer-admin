export default function AboutUsItem({
    title,
    description,
    icon,
    link
}: { title: string, description: string, icon: string, link?: string }) {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-4 items-center border-2 p-5 rounded-lg bg-white shadow-md">
            {/* Icon Section */}
            <figure className="h-16 w-16 flex justify-center items-center">
                <img src={icon} alt={title} className="object-contain w-full h-full" />
            </figure>

            {/* Text Content */}
            <div className="text-start">
                <h3 className="font-bold text-black">{title}</h3>
                <p className="text-gray-700">{description}</p>

                {/* Optional Link */}
                {link && (
                    <div className="mt-3 flex justify-start">
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            <img src={link} alt={`${title} link`} className="h-6 w-6 object-contain" />
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
