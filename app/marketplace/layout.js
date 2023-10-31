import FilterDB from "@/components/FilterDB";

export default function MarketplaceLayout({ children })
{
    return (
        <div>
            <FilterDB />
            {children}
        </div>
    );
}