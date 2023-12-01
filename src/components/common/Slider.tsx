import React from "react";
import ReactSlider from "react-slider";
import "./_slider.scss";

function Slider(props: any) {
	return (
		<ReactSlider
			className="horizontal-slider"
			thumbClassName="example-thumb"
			trackClassName="example-track"
			{...props}
			// renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
		/>
	);
}

export default Slider;
