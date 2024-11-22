import LoadingIcon from "../../assets/fade-stagger-circles.svg";

export default function Loading() {
    return (
        <div className="fixed flex w-full h-full items-center justify-center">
            <div className="flex-col">
                <img src={LoadingIcon} alt='LoadingIcon' />
            </div>
        </div >
    )
}
