import Button from "../../../components/ui/Button"

type CustomerPageFooterType = {
    btn1Text: string,
    btn2Text: string,
    btn1ClickFun: ()=> void,
    btn2ClickFun: ()=> void,
    btn2disabled?: boolean
}


function CustomerPagesFooter({btn1Text, btn2Text, btn2ClickFun, btn1ClickFun, btn2disabled}: CustomerPageFooterType) {
    return (
        <div className="flex gap-4 justify-end sticky bottom-0 bg-white py-4">
            <Button children={btn1Text} onClick={btn1ClickFun} className="px-4 py-2 text-[12px]" />
            <Button children={btn2Text} onClick={btn2ClickFun} disabled={btn2disabled}
                className="px-4 py-2 text-[12px] bg-orange-dark text-white" />
        </div>
    )
}

export default CustomerPagesFooter