import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
	const elRef = useRef(null); // ref is a container to give yourself back the same thing every single time

	if (!elRef.current) {
		elRef.current = document.createElement('div');
	}

	useEffect(() => {
		const modalRoot = document.getElementById('modal');
		modalRoot.appendChild(elRef.current); // if using a class component you'd use componentWillUnMount to cleanup

		return () => modalRoot.removeChild(elRef.current); // do this when need to do componentWillUnMount (used to remove event listeners, a timer (set timeout, set interval), remove something from the page)
	}, [])// only want this to happen once

	return createPortal(<div>{children}</div>, elRef.current)
 };

 export default Modal;