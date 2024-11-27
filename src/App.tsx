import { useRef, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

export default function App() {

    const valueRef = useRef(null);
    const [outputArray, setOutputArray] = useState<string[]>([]);

    const handleChange = () => {

        const content = valueRef.current.value; // Get the value of the textarea
        if (!content) return; // Prevent errors if the textarea is empty

        const contentArray = content.split(";");
        const newOutputArray: string[] = [];

        contentArray.forEach((item: string) => {
            const itemArray = item.split(": ");
            const itemLang: string = itemArray[0];
            const itemKey: string = itemArray[1];
            const itemUrl: string = itemArray[2];
            const keyArr = itemKey?.split("-");

            if (itemLang === "en" && itemUrl === "No URL") {
                newOutputArray.push(
                    `https://www.go-ferry.com/reservations/default.aspx?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&WFF_selOneWayFrom=${keyArr[0]}&WFF_selOneWayTo=${keyArr[1]}&link_id=eng${itemKey}`
                );
            } else if (itemLang === "de" && itemUrl === "No URL") {
                newOutputArray.push(
                    `https://www.goferry.de/reservations/default.aspx?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&WFF_selOneWayFrom=${keyArr[0]}&WFF_selOneWayTo=${keyArr[1]}&link_id=eng${itemKey}`
                );
            } else if (itemLang === "fr" && itemUrl === "No URL") {
                newOutputArray.push(
                    `https://www.go-ferry.fr/reservations/default.aspx?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&WFF_selOneWayFrom=${keyArr[0]}&WFF_selOneWayTo=${keyArr[1]}&link_id=eng${itemKey}`
                );
            } else {
                newOutputArray.push(
                    `${itemUrl}?coupon={{COUPON_ID}}&utm_source={{UTM_SOURCE}}&utm_medium={{UTM_MEDIUM}}&utm_campaign={{UTM_CAMPAIGN}}&link_id=cms${itemKey}`
                );
            }
        });

        setOutputArray(newOutputArray); // Update the state with the new array
    };

    return (
        <div className="h-screen p-4">
            <ResizablePanelGroup direction="horizontal" className="border rounded-xl shadow-lg h-full">
                <ResizablePanel>
                    <textarea ref={valueRef} className="h-full w-full resize-none outline-0 p-8" onInput={handleChange} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                    <ul className="h-full space-y-1 p-8">
                        {outputArray.map((item, index) => (
                            <li key={index} className="hover:bg-slate-100 rounded-lg cursor-pointer px-2 py-2 text-sm">{item}</li>
                        ))}
                    </ul>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
