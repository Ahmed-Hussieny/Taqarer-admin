import { Breadcrumb } from "flowbite-react";
import arrowIcon from '../../assets/Icons/smarrow.png';
import { useNavigate } from "react-router-dom";

type BreadcrumbItemProps = {
    name: string;
    route: string;
};

type BreadcrumbComponentProps = {
    items: BreadcrumbItemProps[];
};

export function BreadcrumbComponent({ items }: BreadcrumbComponentProps) {
    const navigate = useNavigate();
    return (
        <Breadcrumb aria-label="Breadcrumb" className="flex items-center">
            {items?.map((item, index) => (
                <div key={index} className="flex items-center">
                    <p
                        onClick={index < items.length - 1 ? () => navigate(item.route) : undefined}
                        className={index === items.length - 1 ? "text-black font-bold" : "text-gray-800 cursor-pointer"}
                    >
                        {item.name}
                    </p>
                    {index < items.length - 1 && (
                        <img src={arrowIcon} alt="arrowIcon" />
                    )}
                </div>
            ))}
        </Breadcrumb>
    );
}
