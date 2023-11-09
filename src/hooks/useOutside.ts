import  {Dispatch, useEffect, useRef, useState} from 'react';
interface TypeOut {
    ref: any;
    isShow: boolean
    setIsShow: Dispatch<boolean>
}
export const useOutside = (initialVisible: boolean):TypeOut => {
    const [isShow, setIsShow] = useState(initialVisible)
    const ref = useRef<HTMLElement>(null)

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsShow(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    });
    return{ref, setIsShow, isShow}
};